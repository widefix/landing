---
layout: post
title: "Rails feature flags: deploying code before exposing every customer"
headline: "Rails feature flags: deploying code before exposing every customer"
description: "Feature flags can separate deployment from customer exposure. Learn why user targeting, schedule semantics, monitoring, and cleanup determine whether they reduce release risk."
tags: ["rails", "feature-flags", "deployment", "maintenance"]
comments: true
share: true
toc: true
---

A feature is ready for real feedback. The team wants a few internal users to try it in the deployed application before every customer sees it.

Without a release control, the choice may become a separate environment that does not fully resemble production or a launch to everyone at once.

A feature flag provides another option: deploy the code, then control who encounters the new behavior. The value comes from a deliberate release procedure around that control.

## Deployment and exposure are separate decisions

Deployment places code in the running system. Exposure determines whether a user enters a particular path.

A Rails flag implementation we reviewed supports stable keys, individual user allowlisting, and date-based activation in a specified business timezone. It validates complete, ordered date ranges.

That is evidence of selective and scheduled behavior. It is not evidence of percentage rollouts, statistical experiments, or a complete experimentation platform.

For a business owner, even a small set of controls can be useful: a support colleague can preview a workflow, the team can collect feedback, and broader access can wait for a specific decision.

## A flag needs a precise meaning

“Enabled between these dates” sounds straightforward until the actual model is inspected.

In the reviewed implementation, the stored enabled value applies inside the date interval; outside it, that value is inverted. User allowlisting can also grant access. That supports more than a conventional on-window schedule, but it demands clear administration and tests.

A release owner should be able to answer:

- Which timezone decides the date boundary?
- Are the start and end dates inclusive?
- What happens outside the interval?
- Does a user allowlist override a disabled flag?
- What happens if the key does not exist?

If the interface says one thing and the evaluator does another, the flag becomes a source of unexpected releases.

## Targeting must use the correct user

A flag decision that depends on a current user needs reliable request context. In the reviewed model, evaluation reads thread-local user state. That makes setup and cleanup a separate review point, particularly when server threads are reused or background jobs evaluate flags.

For a new design, explicit context can make the dependency easier to see. This pseudocode illustrates the boundary rather than an existing library API:

```ruby
if release_policy.enabled?(:new_checkout, user: current_user)
  render_new_checkout
else
  render_existing_checkout
end
```

Tests should cover both branches and confirm that one user's targeting state cannot carry into another request.

## Turning a flag off cannot undo every effect

If the new path writes a different data format, disabling it does not transform the records back. If it sends an email or changes a subscription, the action has already crossed an external boundary.

Before exposure, confirm that both application paths can handle the data they may encounter. Decide which signals will trigger stopping the rollout: a workflow failure rate, support reports, or a specific business inconsistency.

Someone must observe those signals and have authority to act. A flag with no owner can leave a failing feature enabled just as effectively as no flag at all.

## The maintenance cost continues after launch

Each temporary branch adds combinations to understand and test. Once a release is accepted, remove the obsolete branch, flag records, and administrative controls where appropriate.

Long-lived business configuration may remain. Temporary rollout controls need an expiry decision so future engineers and AI tools do not have to infer which path is authoritative.

The source review establishes the available controls, not a measured reduction in incidents or proof that every feature uses them.

## Why clients need release ownership

AI helps teams implement more changes. That can increase the number of exposure decisions and compatibility questions someone must manage.

[WideFix's Rails maintenance service](https://widefix.com/ruby-on-rails-maintenance/) connects implementation with rollout, observation, and cleanup. The deliverable is a feature the team can introduce deliberately and continue to understand afterward.

For your next release, name the first users, the stop signal, and the person who will remove the flag. Those three decisions make the control useful.
