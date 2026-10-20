---
layout: post
title: "Rails Stripe idempotency: protecting billing when requests are retried"
headline: "Rails Stripe idempotency: protecting billing when requests are retried"
description: "A timed-out payment request can still succeed. Learn why safe retries, stable operation identity, and reconciliation belong in ongoing Rails maintenance."
tags: ["rails", "stripe", "billing", "maintenance"]
comments: true
share: true
toc: true
---

A customer clicks Subscribe. The page waits, then reports a network error. They try again.

Did the first request fail before it reached Stripe? Or did Stripe create the subscription and the response disappear on the way back?

Your Rails application cannot answer that question from a timeout alone. A second request may be necessary. Creating a second subscription is a different matter.

This is one reason an established application needs maintenance even when AI can produce a billing integration quickly: someone must define what repeating an operation means for the business.

## The dangerous gap between two systems

A local database transaction does not make a remote API call atomic with your database. Stripe can complete its work before Rails records the result. A worker can restart in that gap. A customer can submit again while the original request is still running.

The visible problem may arrive later as confusing account records, an unexpected subscription, or a support conversation about billing. Those are risks of the failure mechanism, not measured outcomes from this article.

An idempotency key gives the payment provider an identity for an operation. Within the provider's documented rules, repeating the same request with the same key lets it recognize a retry.

## The key must identify the attempt you intend to repeat

A Rails billing implementation we reviewed explicitly passes idempotency keys for customer creation. Its subscription wrapper accepts an idempotency key when the caller supplies the required user and operation context.

That conditional behavior matters. A wrapper supporting idempotency does not establish that every subscription call uses it. Maintenance includes tracing callers, background retries, and alternative signup paths.

For a new design, consider a persisted billing-operation record with an opaque identifier. This is an illustrative design, not a copy of the reviewed application:

```ruby
Stripe::Subscription.create(
  { customer: customer_id, items: subscription_items },
  { idempotency_key: "subscription-create-#{operation.id}" }
)
```

Here, `operation` must already exist, its identifier must be unique, and retries must load the same operation with the same parameters. Creating a fresh operation on every retry defeats the design.

A later, legitimate purchase needs a different identity. Using only a customer identifier can merge unrelated intentions. Deriving the identity from mutable profile attributes can make a retry look like a new operation after the profile changes. Opaque keys also avoid placing personal data in request identifiers.

## Idempotency has boundaries

[Stripe's idempotency documentation](https://docs.stripe.com/api/idempotent_requests) describes parameter matching, response reuse, and key retention. For API v1, keys can be pruned after at least 24 hours; the mechanism is not a permanent business ledger.

That leaves several responsibilities inside your application:

- Keep the intended operation and its request parameters available for retries.
- Reconcile local state with the provider after an ambiguous response.
- Make webhook processing tolerate repeated delivery independently.
- Give support staff a way to find the operation and its external identifier.

These concerns span code, stored data, and operating procedures. Adding a request header solves one part.

## What should a maintenance team verify?

Start with a failure exercise: let the provider accept the request, then simulate losing the response. Retry the operation. Check the provider's objects and the application's records.

Also check a repeated browser submission, a restarted worker, a changed subscription plan, and a genuinely new purchase. A successful first subscription proves very little about these cases.

The evidence reviewed here establishes explicit duplicate-protection intent and implementation paths. It does not establish that duplicate billing has been eliminated, and no financial savings are claimed.

## Why ownership still matters with AI

AI can help write the wrapper, enumerate callers, and generate fault-injection tests. The business still needs someone to decide the operation boundary, review provider behavior, investigate mismatches, and follow the change through release.

That is a concrete part of [WideFix's Rails maintenance service](https://widefix.com/ruby-on-rails-maintenance/): taking responsibility for how billing behaves when the request does not follow the happy path.

If a customer retries a subscription today, can your team explain which existing operation that retry belongs to? That is a useful place to begin a billing review.
