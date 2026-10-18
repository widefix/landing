---
layout: post
title: "Rails data backfills: the records your schema change must account for"
headline: "Rails data backfills: the records your schema change must account for"
description: "A migration that works on an empty database can fail against years of records. Learn how explicit mappings, preflight checks, and staged constraints make Rails changes reviewable."
tags: ["rails", "postgresql", "migrations", "maintenance"]
comments: true
share: true
toc: true
---

“Add a required unique key” sounds like a small change.

On a fresh database, it may be. On a live application, existing rows have no key, some labels may be duplicated, and old application processes may continue writing the previous format during deployment.

The migration has to account for that history. Passing against a clean development database is only the beginning.

This is where Rails maintenance creates value: carrying existing business data into a new design without silently changing what the data means.

## Existing records are part of the specification

Consider a feature-flag table that originally used editable titles. Code now needs stable machine-readable keys.

Generating a key from each title seems convenient. It can also turn a spelling change into a behavior change or map two different titles to the same key. The important question is which existing business concept each new identifier represents.

A migration we reviewed handles this explicitly: it adds a nullable key column, maps known titles to keys, checks for unmapped records, and only then enforces non-null and uniqueness rules.

The guard is the important part. Unknown data stops the operation instead of being silently assigned a guessed meaning.

## Fail with information before enforcing the rule

A simplified illustration of the validation step is:

```ruby
unmapped = FlagRecord.where(key: nil).distinct.pluck(:title)
raise "Unmapped flag titles: #{unmapped.join(', ')}" if unmapped.any?
```

`FlagRecord` here represents a model scoped to the migration. This fragment is illustrative, not a complete migration or a production command.

A failed guard should lead to a review of the missing records and an updated mapping. It should not become a reason to remove the check so deployment can continue.

For a small table, an explicit mapping can be easier to review than a general transformation. For a large table, loading every unmatched value or doing the full backfill in one migration may be inappropriate. Table size and write traffic change the operating plan.

## Keep historical migrations independent of today's behavior

The reviewed migration defines its own model rather than using the live feature-flag class. That avoids coupling the backfill to that class's current validations and callbacks.

There is still a boundary to inspect: the local model inherits from `ApplicationRecord`, which can acquire shared behavior later. Historical migration code should depend on as little evolving application behavior as practical.

The [Rails migration guide](https://guides.rubyonrails.org/active_record_migrations.html) provides the framework tools. Choosing when to transform data and when to enforce a constraint remains application-specific work.

## A correct transformation can still be an unsafe deployment

Adding the right values does not establish that the rollout is safe under traffic.

Before release, determine whether older web processes and background workers can create rows without the new key. Check lock behavior, migration duration, and how the index will be built. A large, busy table may need separate releases for adding the column, changing writers, backfilling in resumable batches, and enforcing the final rule.

Also inspect the existing data for duplicate keys before building a unique index. The database can reject the duplicates; it cannot decide which business record should survive.

The reviewed migration is evidence of data-aware sequencing. It is not evidence of a universal zero-downtime procedure.

## Reversing the schema does not restore the business state

Removing a key column may make a migration structurally reversible while discarding values the application now relies on. If later changes use those keys, rolling back the column is no longer an isolated decision.

A useful release review describes both application rollback and data recovery. They may require different procedures.

## What an owner brings to an AI-assisted change

AI can produce the migration syntax. Someone still needs to inspect production-shaped data, confirm mappings with the business, coordinate compatible application versions, and verify the resulting records.

That work is part of [WideFix's Rails maintenance service](https://widefix.com/ruby-on-rails-maintenance/). For related implementation context, see our earlier article on [changing data in migrations](https://widefix.com/blog/change-data-in-migrations-like-a-boss/).

Before approving your next required column, ask: what happens to the rows that already exist, and who can still write the old format? The answers determine the release plan.
