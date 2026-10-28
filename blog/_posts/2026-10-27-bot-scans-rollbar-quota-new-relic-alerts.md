---
layout: post
title: "How bot scans used up my Rollbar quota and triggered New Relic alerts"
headline: "How bot scans used up my Rollbar quota and triggered New Relic alerts"
modified: 2026-10-27 12:00:00 +0100
description: "Automated scans for exposed secrets filled my Rails error feed. Here is how I filtered routing errors in Rollbar, and why monitoring noise matters."
tags: [rails, rails-development, monitoring, security]
featured_post: false
toc: true
image: bot-scans-monitoring.svg
image_svg: bot-scans-monitoring.svg
comments: true
share: true
---

My Rails application started reporting exceptions for URLs that had nothing to do with its features:

```text
/private-key
/.env.live
/.env.stage
/static/.env
/panel/.env
```

Rollbar was using up my monitoring quota, and the situation triggered a critical New Relic alert about a deviation in request processing time. It became a false-positive distraction: I had to stop what I was doing and investigate what looked like an urgent application problem.

The application was rejecting these requests. But rejecting unwanted traffic still had a cost.

## What were these requests?

![Rollbar events showing GET requests for private-key and environment files]({{ site.baseurl }}/images/bot-scans-rollbar.png)

*Multiple requests for secret-related paths arrived within the same second and generated routing errors.*

These looked like automated scans searching for exposed secrets. Environment files often contain database credentials, API tokens, and other sensitive configuration. Scanners try common paths across public websites, hoping to find a deployment that accidentally serves them.

### AI bot names appeared in the scan traffic

What caught my attention was that these requests also carried names associated with AI bots. Rollbar's **browser** column shows parsed client labels rather than complete raw `User-Agent` headers. Counting only the 13 visible rows, the most frequent readable labels were:

| Client label displayed by Rollbar | Visible requests |
| --- | ---: |
| `crawler` | 3 |
| `PerplexityBot 1.0` | 3 |
| `OAI-AdsBot 1.0` | 2 |
| `MoonshotBot 1.0` | 1 |

The remaining four rows show two unknown labels and two icon-only entries. I cannot recover their exact user-agent strings from this screenshot. These counts describe this small screenshot, not the most popular bots across all application traffic.

**AI-associated bot names are present in this scan traffic, but the names do not verify the sender.** `PerplexityBot` is a [documented AI search crawler name](https://docs.perplexity.ai/docs/resources/perplexity-crawlers); the screenshot also displays `MoonshotBot` and `OAI-AdsBot`. I would not attribute those requests to their apparent operators without verifying their source. A scanner can put any name in its `User-Agent` header, including a familiar AI bot name.

For a team investigating this, the next step is to inspect the raw user agents and client IPs in request logs, then compare those IPs with the operator's published verification guidance where available. The `server.host` column in this screenshot identifies my application server, not the scanner's source IP. A recognizable bot label should not make a request for secrets less suspicious.

The more useful evidence was the pattern: requests for secret-related filenames across many directories, arriving in rapid succession.

Rails reported that no routes matched. These exceptions were not evidence that the scanner had retrieved any secrets.

## How ordinary 404s filled Rollbar

When a request does not match a Rails route, Rails raises:

```ruby
ActionController::RoutingError
```

In production, exception handling turns that into a 404 response. But Rollbar was also capturing the exception.

Each attempt to fetch a nonexistent secret file could therefore consume another monitoring event.

That made unsolicited traffic compete with real application failures for my Rollbar quota. It also made the error feed harder to read: a customer-facing bug could end up buried among requests for files that never existed.

An exception inside a framework is not always an application failure that needs someone's attention. A customer being unable to complete an action deserves investigation. A scanner asking for `/private-key` usually does not deserve a separate error report.

## What New Relic showed

![New Relic web transaction time chart showing a temporary response-time spike to roughly 160 milliseconds]({{ site.baseurl }}/images/bot-scans-newrelic.png)

*Response time rose temporarily, with most of the increase in Web external and a smaller middleware contribution, before returning close to baseline.*

New Relic's web transaction chart showed a temporary rise in response time, reaching roughly 160 ms before returning close to its earlier baseline. Most of the increase appeared in the **Web external** category, with middleware also contributing.

The situation triggered a **critical alert in New Relic**, pulling my attention away from planned work. For me, this was a false positive for an urgent application incident: scanner traffic and monitoring noise demanded attention as though there were a customer-facing failure. The response-time deviation was real; the distraction came from treating it as an emergency that needed my immediate intervention.

The chart shows a performance change, but it does not identify its cause. It covers a different time window from the Rollbar events, so these two screenshots alone do not establish a connection between that particular scan burst and the slowdown.

One possibility worth investigating is the work involved in reporting exceptions to an external service. Confirming that would require examining transaction traces and external calls during the spike. The aggregate chart does not identify Rollbar as the source of the external time.

The practical problem was already clear: unwanted requests were consuming error-reporting capacity, while performance alerts created additional investigation work.

## The fix: filter routing errors in Rollbar

I added an exception filter to the existing Rollbar initializer:

```ruby
# config/initializers/rollbar.rb

Rollbar.configure do |config|
  # Existing configuration...

  config.exception_level_filters.merge!(
    'ActionController::RoutingError' => 'ignore'
  )
end
```

This uses [Rollbar's documented exception filtering](https://docs.rollbar.com/docs/ruby). Using `merge!` preserves the other configured exception filters.

Once deployed, unknown URLs still receive a 404 response. Other application exceptions continue to reach Rollbar. Uncaught routing errors stop consuming Rollbar events.

There is a tradeoff: this also hides routing errors caused by legitimate broken links. Access logs and 404 metrics remain useful for finding those. If routing errors are especially valuable in your application, a narrower filter for known scan paths may be a better choice.

The documented filtering applies to uncaught exceptions. Explicit calls such as `Rollbar.error(exception)` need the `use_exception_level_filters: true` option if you want them to respect these filters too.

## Filtering reports does not block scanners

This change addresses Rollbar noise. It does not block the requests or eliminate the work Rails does to handle them.

If scan traffic becomes expensive enough to affect customers, rate limiting or filtering requests before they reach Rails is a separate step. Performance alerts also need their own investigation. Suppressing an exception report does not prove that a response-time issue is resolved.

For my immediate problem, filtering routing errors was a small change with a clear purpose: preserve error-reporting capacity for failures worth investigating.

## Another solution: reject scans earlier with Rack::Attack

I also added [Rack::Attack](https://github.com/rack/rack-attack) to the application. For known scan paths, it is more efficient than filtering Rollbar reports alone: it returns a response before routing raises an exception and before the downstream exception-reporting middleware runs. That avoids routing and exception-handling work for those requests, while preserving monitoring capacity and reducing triage noise for the team. It still uses application-server resources; I have not measured a speedup or confirmed that it eliminates the New Relic alert.

```ruby
# Gemfile (then run bundle install)
gem 'rack-attack', '~> 6.8'

# config/application.rb, inside the Application class
# Resolve the client IP before rejecting requests.
config.middleware.move_after ActionDispatch::RemoteIp, Rack::Attack
```

The configuration matches paths rather than spoofable bot names. Here is a shortened version of the rules I added: secret-file probes receive 403, and dynamic traffic is limited to 300 requests per client IP per minute, returning 429 above that limit. GET and HEAD health checks are excluded, and static files are served earlier in this application's middleware stack.

```ruby
# config/initializers/rack_attack.rb
Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new(size: 16.megabytes)

Rack::Attack.blocklist('secret-file probes') do |request|
  path = Rack::Utils.unescape_path(request.path).downcase
  path.match?(%r{/(?:\.env(?:[._-][^/]*)?|\.git|\.ssh|private[-_]key)(?:/|\z)})
end

Rack::Attack.throttle('dynamic requests/ip', limit: 300, period: 60) do |request|
  next if %w[GET HEAD].include?(request.request_method) && request.path == '/health'

  ActionDispatch::Request.new(request.env).remote_ip
end
```

The in-memory counters suit my current single-process Puma deployment; they reset on restart and need a shared Redis or Memcached store before scaling across processes or servers. Proxy forwarding must preserve the real client IP, and the limit should be tuned to legitimate traffic, including users sharing an IP. Rack::Attack complements the Rollbar filter: it rejects known probes early, while the filter still suppresses routing-error reports for other unmatched URLs. Neither guarantees fewer performance alerts or stops distributed scans using many IPs.

## Monitoring capacity is part of reliability

For a team, filtering expected routing errors preserves the error-reporting budget for actionable failures and reduces time spent triaging scanner traffic. A cleaner error feed also makes customer-facing bugs easier to spot and prioritize. The benefit is shared: developers spend less time investigating irrelevant events, and the team gets more useful coverage from its monitoring subscription.

A public application receives traffic its developers never intended. Some of it will ask for nonexistent files, probe common vulnerabilities, or try random routes.

Returning a 404 handles the HTTP request correctly. It does not automatically make the request free.

In my case, the cost included Rollbar quota and time spent investigating New Relic alerts. Keeping expected internet noise out of the error feed helps preserve both monitoring capacity and attention for problems that affect users.

## Taking ownership of the monitoring setup

When WideFix takes over an existing Ruby on Rails application, understanding its monitoring is part of taking technical ownership. Application owners need to know which alerts indicate a customer problem, who investigates them, and whether reporting limits could hide the next failure. For the team maintaining the application, documenting those choices makes triage less dependent on one person's memory.

If you are inheriting an application, start by reviewing the most frequent reported exceptions alongside the requests and traces behind them. Decide which events need error reports, which belong in traffic metrics, and who owns each alert. Our [Ruby on Rails application takeover](/ruby-on-rails-application-takeover) and [ongoing Rails maintenance](/ruby-on-rails-maintenance) work provides a business context for keeping that monitoring useful as the application evolves.
