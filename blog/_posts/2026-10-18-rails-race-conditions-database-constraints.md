---
layout: post
title: "Rails race conditions: why checking first does not prevent duplicates"
headline: "Rails race conditions: why checking first does not prevent duplicates"
description: "Two workers can both pass a Rails existence check. See how database uniqueness, precise conflict handling, and business-focused tests protect application data."
tags: ["rails", "postgresql", "concurrency", "maintenance"]
comments: true
share: true
toc: true
---

A background job checks whether a notification exists. It does not, so the job creates it.

The code looks sensible. The test passes. Then two workers run at the same time and the user receives duplicate notifications.

The missing requirement was concurrency. Each worker made a correct observation at a different moment; neither observation reserved the right to insert.

For a product owner, this is a maintenance problem with a familiar shape: a feature works in testing, but ordinary production conditions expose a rule the implementation never enforced.

## Two correct checks can produce one wrong result

Imagine this simplified sequence:

| Step | Worker A | Worker B |
|---|---|---|
| 1 | Checks for the notification: absent | |
| 2 | | Checks for the notification: absent |
| 3 | Creates the notification | |
| 4 | | Creates another notification |

Moving the check into a model validation does not by itself remove that interval. The invariant needs enforcement where the competing writes meet: the database.

[PostgreSQL uniqueness constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-UNIQUE-CONSTRAINTS) enforce uniqueness for specified columns. A partial unique index can apply a rule to a subset of rows.

The difficult decision is choosing that rule. “One notification per user” might suppress legitimate later notifications. “One notification per user, event type, and achieved level” expresses a different product promise.

## A production pattern worth preserving

In a Rails application we reviewed, level-up notifications combine an existence check, database uniqueness, and explicit handling of a competing insert. The application also distinguishes later levels from a repeated attempt at the same level.

Those layers serve different purposes. The initial check avoids an unnecessary insert in the ordinary case. The database rule decides the race. The service handles the expected duplicate conflict according to the business meaning.

This does not make every uniqueness error harmless. Rescuing `RecordNotUnique` broadly can conceal an unrelated constraint failure. A review should confirm that the conflict corresponds to the intended operation. In PostgreSQL, a statement error inside an enclosing transaction can also leave that transaction unusable until rollback; rescue placement and savepoint boundaries matter.

## The index cannot deliver an external side effect

Suppose the row is unique, but both workers send an email before attempting the insert. The database can prevent duplicate rows while the customer still receives two messages.

A maintenance review follows the whole operation: record creation, transaction boundaries, job enqueueing, retries, and delivery. Where external delivery matters, a durable outbox or another explicit delivery protocol may be appropriate. The database invariant is one boundary, not a universal exactly-once guarantee.

## Tests should explain the product rule

The reviewed service has behavior tests for repeated execution, later levels, crossing multiple thresholds, decreases, and subscription eligibility. That is useful evidence of requirements captured in code.

Those tests are not a demonstrated concurrency test. To establish the race behavior, use separate database connections, coordinate competing inserts, and inspect the committed result. Running the same service twice sequentially answers a different question.

Before adding a unique index to an existing table, inspect and resolve current duplicates. Also decide how nullable key columns should behave; ordinary uniqueness rules may permit multiple null values. These are data decisions as well as schema decisions.

## What the client is paying for

AI can generate an existence check and its matching test in seconds. An experienced owner asks whether two workers can pass it, whether the index expresses the actual business rule, and whether the side effect can still happen twice.

[WideFix's Rails maintenance work](https://widefix.com/ruby-on-rails-maintenance/) includes reviewing those boundaries and preserving the decisions as regression coverage. We do not claim an incident reduction from the source review alone.

For your application, choose one operation that must not happen twice. Can the team point to the database rule that protects it and explain what happens when two requests compete? If the answer ends at `exists?`, there is more to investigate.
