---
layout: post
title: "Planning a Rails Upgrade? Start With the Risks, Not the Version Number"
headline: "Planning a Rails Upgrade? Start With the Risks, Not the Version Number"
description: "What a Rails upgrade assessment should tell founders: dependency blockers, business workflows, staged delivery, recovery and the first milestone to budget for."
tags: [rails, ruby, maintenance, modernization, upgrades]
comments: true
share: true
toc: true
featured_post: false
image: rails-upgrade-route.svg
image_svg: rails-upgrade-route.svg
related_posts:
  - /your-rails-app-still-works-is-it-still-supported/
  - /ruby-and-rails-upgrade-personal-experience/
---

You have agreed that your Rails application needs an upgrade. The next question sounds straightforward: how much will it cost?

Before answering, I want to know what could make that estimate wrong. Is an essential gem incompatible with the target version? Does billing depend on behavior nobody has tested? Can the application still deploy on its current hosting stack?

A version number tells us where we want to go. It does not tell us what is between here and there.

My recommendation for a live product is to start with a bounded assessment. Its purpose is to turn uncertainty into decisions: what must change, what needs protection, which step comes first and what evidence will show that step is complete.

## First separate the deadline from the delivery plan

An unsupported stack is a reason to act. It is not a specification for the upgrade.

Check the [Rails maintenance policy](https://rubyonrails.org/maintenance) and [Ruby maintenance branches](https://www.ruby-lang.org/en/downloads/branches/) against the versions actually deployed. Ruby and Rails have separate support lifecycles. Include workers and hosting dependencies in the inventory.

Then ask a different question: which compatible sequence gets this application to a supported destination while preserving its business behavior? The answer depends on the codebase. It can include replacing a dependency, strengthening tests or changing deployment configuration before the framework itself moves.

I covered the support question in [Your Rails App Still Works. Is It Still Supported?](/blog/your-rails-app-still-works-is-it-still-supported/). Here I want to focus on what you should receive before approving implementation.

## Ask for evidence behind the blockers

“The app is old” is too vague to guide a budget. A useful finding names a dependency or behavior, explains the constraint and records what has been checked.

For example, suppose an application uses an abandoned authentication extension. A review might identify that extension as a compatibility risk. That is different from proving the application cannot run on the proposed version. A small experiment in an isolated branch can help distinguish a dependency constraint from a failure in the application's own usage.

The report should separate verified blockers, suspected blockers and missing access. You should be able to tell whether an estimate rests on a successful experiment or an assumption.

## Define what must keep working

I would rather start with a short list of business workflows than a promise to increase test coverage by an arbitrary percentage.

For a subscription product, that list might include payment webhooks, renewals, cancellation and access permissions. An operations product may depend on imports, exports and scheduled jobs. Your application will have its own list.

For each workflow, record the current behavior, available tests, missing checks and the person who can confirm the expected result. Include failures and retries where they matter. A payment that succeeds twice after a retry is still a business problem.

Passing tests are useful evidence only for the behavior they exercise. Whether changes are written by a person or an AI coding agent, someone needs to review the acceptance criteria and follow the result through deployment.

## Make the first milestone small enough to verify

The official [Rails upgrade guide](https://guides.rubyonrails.org/upgrading_ruby_on_rails.html) recommends working through versions incrementally and using tests. Its technical instructions support a practical budgeting principle: make each step observable before stacking more changes on top.

Here is an illustrative plan, not a universal sequence:

| Stage | Decision or deliverable | Evidence to review |
| --- | --- | --- |
| Establish the baseline | Agree critical workflows and capture current production signals | Test results, known failures, error rates and job behavior |
| Remove a blocker | Replace or adapt one incompatible dependency | Focused regression checks and a staging demonstration |
| Upgrade one step | Move to the next compatible runtime or framework milestone | CI results, integration checks and reviewed configuration changes |
| Release and observe | Deploy with an agreed recovery plan | Production errors, latency and job failures compared with the baseline |

Choose measures relevant to the change. For latency, compare a meaningful percentile under a comparable workload. For jobs, inspect failures, retries and queue age. An upgrade may aim to restore upstream support rather than improve speed; say that explicitly instead of promising a performance gain.

In [our Ruby and Rails upgrade account](/blog/ruby-and-rails-upgrade-personal-experience/), the useful lessons are the compatibility work and investigation behind the change. The destination versions belong to that project at that time, rather than being a recommendation for today's applications.

## Include deployment and recovery in the estimate

The pull request is one part of the work. Ask how the release affects workers, scheduled tasks, integrations and the database. Check whether old and new processes can coexist during deployment.

A code rollback does not automatically reverse a data migration. If a release changes records or removes a column, recovery needs its own explicit plan. Someone should verify backup and restore arrangements before depending on them.

Our [Paperclip to ActiveStorage migration](/blog/migrate-paperclip-to-activestorage-without-downtime/) illustrates why sequencing matters: existing files and customer behavior had to remain usable during the transition. Dependency modernization is part of operating a live product.

## What you should have before approving the upgrade

A useful assessment leaves you with:

- A production stack inventory, support status and compatible target options.
- Named blockers, the evidence behind them and unresolved questions.
- Critical workflows and the verification gaps that matter to them.
- A staged backlog with acceptance checks, deployment and recovery considerations.
- An estimate for the first implementation milestone, with assumptions and exclusions.

If a blocker is still too uncertain, the next milestone may be a compatibility investigation. That is a valid outcome when the investigation has a defined question, budget and deliverable. It is more useful than treating uncertainty as a fixed implementation price.

## A practical first step with WideFix

At WideFix, we take technical ownership of existing Rails applications and provide [ongoing maintenance](/ruby-on-rails-maintenance) and [incremental modernization](/legacy-ruby-on-rails-maintenance). Upgrade planning belongs in that work because the application still needs to serve customers while its foundations change.

Our [Ruby and Rails Upgrade Assessment](/ruby-on-rails-upgrade-assessment) turns that approach into a scoped starting engagement: investigate the main blockers, identify the workflows to protect and agree the first delivery milestone. The output is a written plan and walkthrough that your team can use; implementation can be scoped separately.

Bring your known versions, business deadline and the part of the upgrade that worries you most. We will agree the investigation scope, access, fee and delivery date before starting.
