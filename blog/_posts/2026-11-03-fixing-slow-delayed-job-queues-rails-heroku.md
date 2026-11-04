---
layout: post
title: "Fixing slow Delayed Job queues in a Rails app on Heroku"
headline: "Fixing slow Delayed Job queues in a Rails app on Heroku"
date: 2026-11-03 09:00:00 +0100
description: "A Delayed Job alert that fired 144 times a day led us to an idle Heroku dyno, a misleading wait metric, and a CSV parser using 225 MB per import."
tags: [rails, background-jobs, delayed-job, heroku, monitoring, performance]
comments: true
share: true
toc: true
featured_post: false
tested_with: "Rails 6.1, Delayed Job, PostgreSQL, and Heroku"
image: slow-delayed-job-queues.svg
image_svg: slow-delayed-job-queues.svg
author:
    name: Samuel Ebeagu
---

*"Some jobs are waiting in the queue for too long."*

For a while, that line showed up in our error tracker more than anything else. We run a set of Rails apps that integrate with an e-commerce platform. They sync stock, export orders and keep product filters up to date, and almost all of that work happens in Delayed Job background jobs on Heroku. So when the alert started firing more often, my first guess was simple: one app was misbehaving.

I was wrong. There were five separate problems behind that one sentence, and one of them was our own monitoring.

## How we watch our queues

Every 10 minutes, a scheduled task takes a snapshot of the `delayed_jobs` table. It groups jobs by queue, app and status (waiting or running) and saves them to a `delayed_job_stats` table. A second step raises an error if any row has waited or run longer than 60 minutes.

That table turned out to be the most useful thing we had. Unlike a live dashboard, it still shows what the queues looked like yesterday at 11:30, after the jobs involved are long gone. Almost everything below came from querying it.

## Check what your metric actually measures

The first thing I did was look at the jobs behind the alert. Two of them had been waiting since October 2024.

They sat in a queue that only one worker process could run, and that process had been scaled to zero dynos long ago. Nothing would ever pick them up. With a snapshot every 10 minutes, those two jobs alone fired the alert about 144 times a day and buried every real signal.

Deleting them stopped the noise. It also made me look at how we measured "waiting":

```sql
-- Before: really the job's age
NOW() - MIN(created_at) AS wait_in_queue

-- After: time spent eligible to run, until a worker picked it up
MAX(COALESCE(locked_at, NOW()) - run_at) AS wait_in_queue
```

The old version had two flaws:

- **It kept counting while a job was running.** A job that waited 35 minutes and then ran for 30 was reported as waiting 65.
- **It counted from `created_at`.** A job scheduled weeks ahead with `run_at` looked like it had waited weeks on the day it became due.

The new version starts the clock when the job is allowed to run (`run_at`) and stops it when a worker locks it (`locked_at`).

While we were there, we also made the alert say *what* broke. It now lists the queue, job type, app, count and duration of the worst offenders, plus the snapshot time, so anyone can query the exact rows later.

**Lesson:** before you trust an alert, check what the number underneath it means. And a queue with no running worker isn't a queue. It's a trap.

## An 8-unit dyno doing the work of one

With the noise gone, a real incident stood out. One morning, order exports for several stores waited about 85 minutes.

Our main worker dyno handles about 43 queues: everything that doesn't have its own pool. Its Heroku metrics looked healthy, at around 20% memory and CPU close to idle. So why the backlog?

The snapshots answered it. Each running job records `locked_by`, which looks like `host:<dyno id> pid:49`. Across the whole incident, the main worker only ever showed **one** pid. Our dedicated pools always showed four (49, 52, 55 and 58) running at once.

We use [delayed_job_worker_pool](https://github.com/salsify/delayed_job_worker_pool), which starts a master process inside the dyno and forks worker processes from it. Each worker runs one job at a time. The main pool's config looks like this:

```ruby
# config/delayed_job_worker_pool.rb
workers Integer(ENV.fetch('NUM_WORKERS', 1))
```

`NUM_WORKERS` was never set. We were paying for a large dyno and running one job at a time on it.

Dyno size is how much CPU and memory you have. Worker count is how many jobs run at once. They're separate settings, and it's easy to tune one and forget the other.

There was a second trap. [Delayed Job](https://github.com/collectiveidea/delayed_job) runs **lower** priority numbers first, and any queue that isn't listed in `queue_attributes` gets 0, the most urgent value there is. So a burst of webhooks from one store, on a queue nobody had ranked, jumped ahead of the order exports we'd deliberately ranked at 29.

Two small changes:

```ruby
# config/initializers/delayed_job.rb
Delayed::Worker.default_priority = 100
```

```text
# Procfile
worker: NUM_WORKERS=3 EXCEPT_JOBS=... bundle exec delayed_job_worker_pool ./config/delayed_job_worker_pool.rb
```

Delayed Job applies priorities when a job is queued, so the default only affects new jobs. Unranked queues now sit alongside `default` at 100 instead of jumping ahead of everything we had ranked.

## The safety rule that spread the delay

Something still didn't add up. During the same incident, jobs in a completely separate pool, the one that syncs products to a marketplace, also waited over an hour. The snapshots showed that pool running only two or three of its four workers.

The answer was a rule we'd written ourselves. To stay under the platform's API rate limits, we override Delayed Job's `for_queues` scope so workers only see jobs listed in a Postgres view:

```ruby
Delayed::Job.scope(:for_queues, lambda { |queues = Delayed::Worker.queues|
  # ...queue filtering...
  where("id IN (SELECT id FROM ready_delayed_jobs) OR app_id IS NULL")
})
```

Simplified, the view looks like this:

```sql
WITH data AS (
  SELECT dj.id,
         rank() OVER (PARTITION BY dj.app_id, dj.app_type ORDER BY dj.created_at) AS rank
  FROM delayed_jobs dj
  LEFT JOIN delayed_jobs running
    ON running.app_id = dj.app_id AND running.app_type = dj.app_type
   AND running.locked_at > now() - interval '10 minutes'
  WHERE dj.run_at < now() AND dj.locked_at IS NULL AND dj.failed_at IS NULL
    AND running.id IS NULL
)
SELECT id FROM data WHERE rank = 1;
```

In plain words: **one job per app at a time, and always that app's oldest job first, across every queue.**

On its own, that's sensible. But the ranking happens across *all* queues before each worker filters by its own. An app's jobs move only as fast as its slowest queue:

```text
App A's oldest job ──► main worker (backed up)  ──► waits
App A's export job ──► marketplace pool (idle)  ──► hidden until the job above runs
```

That's exactly what happened. The two waiting export jobs belonged to apps whose oldest job was a webhook stuck on the main worker.

It has a quieter side effect too. Priorities only decide which **app** goes next. Within one app, the oldest job always wins, whatever its priority.

**Lesson:** any rule about which job runs next connects your worker pools. Plan capacity for the pool that every app passes through.

## 225 MB to 48 MB with streaming CSV in Ruby

One pool had a different problem. Our stock-import worker (4 workers on a 2.5 GB dyno) ran at 105–122% of its memory quota all week, with about 22,000 [R14 "memory quota exceeded"](https://devcenter.heroku.com/articles/error-codes#r14-memory-quota-exceeded) errors. Once a dyno starts swapping, everything slows down, so the import queue stayed backed up most of the week.

Each import downloads a supplier's stock feed and compares it with what we last sent. For every source, it held several copies of the feed in memory:

```ruby
# Before
parsed = CSV.parse(csv.gsub(/\R+/, "\n"), headers: true)
```

That one line keeps the raw file, a second copy with normalised line endings, and a `CSV::Table` containing every row as Ruby objects, often many times the file's size. We replaced it with a single pass that builds the quantity and price hashes as it goes, using [`CSV.new`](https://ruby.github.io/csv/CSV.html):

```ruby
# After
csv.gsub!(/\R+/, "\n") # normalise in place, no second copy
parser = CSV.new(csv, headers: true)
parser.each { |row| ... }
```

Changing the string in place is a trade-off: the caller's string is modified. Every caller passes a freshly built string, and the method copies frozen ones first.
Peak memory per import dropped from **225 MB to 48 MB**, and the import got faster (4.1 seconds down to 2.9). In production, the R14 errors stopped.

## When a long wait is fine

A few days later the alert fired again, for one store and one queue. The merchant had bulk-edited about 1,800 products, and the platform sent a webhook for each one. Because of the one-job-per-app rule, they ran one after another at about 12 seconds each, roughly five a minute. The backlog took over six hours to clear. Nothing was broken: the snapshots showed the count going down steadily the whole time.

We could have asked for batched webhooks, but webhooks should be real-time, and batching would slow down every normal update to smooth out a rare bulk one. So we did two things instead.

First, we made each job cheaper. It made four API calls per product, two of them redundant: product options that were already embedded in the payload, and a second fetch of filter groups. We cut them, roughly halving the calls per job.

Second, we told the alert that this queue is allowed to be slow:

```ruby
WAIT_THRESHOLDS_BY_QUEUE = {
  "filter_variation_sync_process_webhook" => 6.hours
}.freeze

def wait_threshold(stat)
  WAIT_THRESHOLDS_BY_QUEUE.fetch(stat.queue, time_threshold)
end
```

A backlog that's draining normally no longer alerts. A genuinely stuck one still does.

## What I'd check first next time

1. **What does the metric measure?** Is "wait" really wait, or just age?
2. **Does every queue have a running worker?** One without fails silently.
3. **Worker count vs dyno size.** A big, idle dyno usually means too few workers. Check `locked_by` pids to see how many are actually running.
4. **Explicit priorities.** Delayed Job's default of 0 means "most urgent".
5. **Global job-picking rules.** If you limit jobs per app or tenant, remember it connects your pools.
6. **Memory per job.** One `CSV.parse` can be the difference between healthy and swapping.

None of these were dramatic bugs. Each was a reasonable decision that stopped being reasonable as the apps grew, which is usually where the interesting problems hide.

## Background jobs are part of taking ownership

Background jobs are easy to overlook when you take over a Rails application, because they fail quietly. A queue with no worker, an unset environment variable or a job-picking rule written years ago keeps running until a customer notices that their exports are late. For application owners, that means delayed orders, stale stock and alerts nobody trusts. For the team, it means investigations that depend on whoever remembers how the queues were set up.

Part of taking technical ownership is knowing which process runs each queue, what each alert actually measures, and whether worker counts match what the dynos can handle. For another example of monitoring noise hiding real problems, see [how bot scans used up a Rollbar quota and triggered New Relic alerts](https://widefix.com/blog/bot-scans-rollbar-quota-new-relic-alerts/).
