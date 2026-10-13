---
layout: post
title: "The Complete Guide to Data Migrations in Rails"
headline: "The Complete Guide to Data Migrations in Rails"
date: 2026-10-29 09:00:00 +0100
description: "Choose a Rails data migration approach: SQL, scripts, migration_data hooks, data-migrate, or maintenance_tasks. Plan batching, tests, retries, and production rollout."
tags: [rails, migrations, database, data-migrations, migration-data]
comments: true
share: true
toc: true
featured_post: false
tested_with: "Ruby 3.4.9, Rails 8.1.0, and SQLite"
image_svg: rails-data-migrations.svg
social_image: rails-data-migrations-social.png
social_image_width: 1200
social_image_height: 630
---

Adding a column is usually the easy part. Deciding what belongs in it for the existing records takes more thought.

Maybe you are introducing a new account status, moving values between columns, or changing how the application stores customer preferences. You need a data migration: a deliberate change to records that already exist.

I created [Migration Data](/migration-data) because code that changes records inside a migration deserves tests. But the gem is one option, not the answer to every backfill. A ten-row update and a ten-million-row conversion need different operational plans.

This guide covers choosing an approach, making the work restartable, testing the transformation, and fitting it into a deployment. The examples use accounts with a `name` and a new `display_name` column.

## Schema migrations, seeds, and data migrations

These concepts often get mixed together:

- **A schema migration** changes structure: columns, tables, indexes, or constraints.
- **Seeds** establish data needed when setting up an environment, such as a small set of reference records.
- **A data migration** changes existing records from one representation or state to another.

A seed file can contain arbitrary Ruby, but using it for every one-time production update makes execution history and reruns harder to reason about. Likewise, `schema.rb` describes database structure; loading it does not replay the historical data transformations your application once ran.

The current [Rails guide's data-migration section](https://guides.rubyonrails.org/active_record_migrations.html#data-migrations) recommends separating data work from schema migrations and points to dedicated tools. That is a useful default, especially for substantial production work. Small, tightly coupled updates can still have a reason to run with a schema migration, provided you understand the consequences.

## Choose the execution model before the library

Start with the operational questions:

1. How many rows need changing, and how expensive is the transformation?
2. Must old and new application versions both work during rollout?
3. Can the job stop midway, and how will it resume?
4. What will concurrent user writes do to the same records?
5. Can you reverse the transformation, or do you need a forward repair?
6. Who can see progress and stop the job if it overloads the database?

Then compare tools:

| Approach | Good fit | What you must provide |
| --- | --- | --- |
| SQL update | A simple transformation the database can express | Query review, execution plan, locks, and verification |
| Script or Rake task | A one-off change with an explicit execution step | Progress, restart behavior, permissions, and execution records |
| `migration_data` | A small data change coupled to a schema migration, with directly testable hooks | Tests, reverse logic, and an acceptable migration runtime |
| `data-migrate` | Versioned data migrations kept separately from schema files | Deployment integration and the operational plan for each migration |
| `maintenance_tasks` | Background maintenance that benefits from batching and operator controls | Worker setup, task behavior, monitoring, and validation |

None of these libraries makes the transformation correct by itself. That part belongs to your code and your tests.

## Use SQL when the transformation is simple

Suppose the new display name should initially equal the existing name, but only where no display name has been set:

```sql
UPDATE accounts
SET display_name = name
WHERE display_name IS NULL;
```

This avoids loading every account into Ruby. It also avoids Rails callbacks and validations. That's helpful when those callbacks are irrelevant to a backfill, and dangerous when you were relying on them to maintain other state.

“It's one query” does not mean “it's cheap.” A large update can hold locks, generate substantial database work, and affect replication. Check the target row count and the query's behavior against a representative dataset before choosing a single transaction.

If copying a name does not meet the business requirements, don't optimize the wrong transformation. First define exactly which records should change and what their values should become.

## Make scripts restartable

For a larger update, you might run batches independently:

```ruby
# script/backfill_account_display_names.rb
class BackfillAccount < ActiveRecord::Base
  self.table_name = "accounts"
end

BackfillAccount.where(display_name: nil).in_batches(of: 1_000) do |batch|
  updated = batch.update_all("display_name = name")
  puts "Updated #{updated} accounts"
end
```

Execute it explicitly:

```sh
bin/rails runner script/backfill_account_display_names.rb
```

This example assumes both columns exist and `name` contains the value you want to copy. The small model uses the existing connection without inheriting the application's account-specific callbacks.

The `display_name: nil` condition remains part of each batch update. A rerun skips accounts that already have a display name, including names users have supplied. Records whose source `name` is also null will remain candidates, so treat them separately rather than calling the backfill complete because a run finished.

This is restartable for this particular copying operation. It is not a general concurrency solution. Decide what should happen if users change `name` while the task runs, and whether the new application should populate `display_name` on every write.

A production version should also record the run, expose useful progress, and use the team's approved execution method. For jobs that need pausing, throttling, or an operator interface, it may be better to use a maintenance framework than to keep extending a script.

## Version data changes separately with data-migrate

[data-migrate](https://github.com/ilyakatz/data-migrate) puts versioned data migrations in `db/data` and tracks their execution separately. It is useful when you want a repeatable migration history while keeping schema and record changes in different files.

Its documented tasks include:

```sh
bin/rails data:migrate
bin/rails db:migrate:with_data
```

The first runs data migrations; the second integrates schema and data execution. Configure deployment scripts deliberately so the required data step is not forgotten. Check the project's supported Rails versions before adding it to an application.

Separating the files does not automatically separate the runtime from deployment. If your deployment invokes a long-running data migration synchronously, it can still keep the deployment waiting.

## Use maintenance_tasks for operational control

[Shopify's maintenance_tasks](https://github.com/Shopify/maintenance_tasks) provides a Rails engine for running and managing background maintenance. Its task model, batching support, and operator controls are useful when data work needs to be observed and interrupted.

A job that processes many records, needs deliberate throttling, or should continue independently of application deployment can be a better fit here than inside `db:migrate`.

It still needs a worker environment, appropriate database access, and code that behaves correctly when interrupted or repeated. Read the project's [task-writing documentation](https://github.com/Shopify/maintenance_tasks#writing-a-maintenance-task) before deciding how to express the collection and transformation.

## Use migration_data for a small coupled change

[migration_data](https://github.com/ka8725/migration_data) takes another approach: keep the schema operation and its related data work in one migration, but put the data work in its own method.

Install it in the application environments that run migrations:

```ruby
# Gemfile
gem "migration_data", "0.6.0"
```

```sh
bundle install
```

For a small accounts table, this migration adds the column and fills it:

```ruby
class AddDisplayNameToAccounts < ActiveRecord::Migration[8.1]
  def change
    add_column :accounts, :display_name, :string
  end

  def data
    Account.reset_column_information
    Account.where(display_name: nil).update_all("display_name = name")
  end
end
```

`data` runs after the normal schema operation when migrating up. `reset_column_information` refreshes the model's knowledge of its columns before the update. The example intentionally skips callbacks and validations through `update_all`.

The gem also provides `data_before` and `data_after`, with corresponding rollback hooks. The documented order is:

```text
Up:   data_before → change/up → data → data_after
Down: rollback_before → change/down → rollback → rollback_after
```

If reverse data work needs a column that the schema rollback drops, it belongs before that drop, not in a later hook. The library does not derive a reverse transformation for you.

For this example, rolling down the schema migration removes the display-name column. That also removes any values users entered there after deployment. Being able to reverse the schema operation does not mean rollback is a suitable business recovery plan.

Use this approach when the data update is small enough to belong in the migration's execution window. Putting an update in a `data` method does not turn it into a background job or make it safe for a huge table.

## Test the resulting records, not just the absence of an exception

The test helper loads the migration so you can call its data method directly:

```ruby
require "rails_helper"
require "migration_data/testing"
require_migration "add_display_name_to_accounts"

RSpec.describe AddDisplayNameToAccounts do
  it "fills missing display names without replacing existing ones" do
    account = Account.create!(name: "Ada", display_name: nil)
    customized = Account.create!(name: "Grace", display_name: "G. Hopper")

    described_class.new.data

    expect(account.reload.display_name).to eq("Ada")
    expect(customized.reload.display_name).to eq("G. Hopper")

    # Running it again should leave the result unchanged.
    described_class.new.data
    expect(account.reload.display_name).to eq("Ada")
    expect(customized.reload.display_name).to eq("G. Hopper")
  end
end
```

This test assumes the test database already has both columns and these account attributes satisfy the application's requirements. Extend the setup when your application requires other fields.

There is an important limit: **testing the data method against today's schema does not prove that replaying the entire historical migration will work**. A later migration might remove a column the old data method still references. Where replay is part of your process, test that sequence separately against the appropriate starting schema.

For a significant change, include cases for missing source values, already-converted records, invalid data, and a second execution. Test rollback behavior when you offer a rollback. For external side effects, test how retries avoid duplicating them.

## Roll out a large backfill in stages

For a live application, I usually want the schema and application code ready before the bulk data work starts:

1. Add the new storage while keeping the old representation available.
2. Deploy code that can tolerate unconverted records and populates the new representation on new writes.
3. Run the backfill in manageable batches while monitoring the database and application.
4. Check that the data meets the intended invariant.
5. Switch reads or enforce constraints only when the relevant records are ready.
6. Remove the old representation in a later change.

The exact order depends on the transformation, write paths, and deployment model. Calling something a backfill does not make it compatible with old application versions; you have to design that compatibility.

For the display-name example, useful verification might include:

```sql
SELECT COUNT(*)
FROM accounts
WHERE display_name IS NULL AND name IS NOT NULL;
```

That checks for records the copy operation could still fill. It doesn't prove every account has a usable display name. Null source names, blank strings, and domain-specific naming rules need their own checks.

## Keep the plan as small as the problem allows

Use a simple SQL statement for a simple, reviewed update. Use a versioned data migration when execution history is important. Use a managed background task when operational control matters. Use `migration_data` when directly testable hooks are a good fit for a small change coupled to a schema migration.

The decision should come from the workload and recovery plan, not from which gem I happen to maintain.

Explore [Migration Data](/migration-data) for its hooks and installation details. For the earlier story behind the gem, read [Change data in migrations like a boss]({{ site.url }}/change-data-in-migrations-like-a-boss/). If you need help planning changes to production records, our [Rails maintenance service](/ruby-on-rails-maintenance) covers that work.

{% assign schema_article = site.posts | where: "url", "/how-to-prevent-schema-rb-conflicts-in-rails/" | first %}
{% if schema_article and schema_article.date <= site.time %}
For generated schema-file problems, read [How to Prevent schema.rb Conflicts in Rails]({{ site.url }}{{ schema_article.url }}).
{% endif %}
{% assign branch_article = site.posts | where: "url", "/rails-database-migrations-across-multiple-git-branches/" | first %}
{% if branch_article and branch_article.date <= site.time %}
For local database state across branches, read [Rails Database Migrations Across Multiple Git Branches]({{ site.url }}{{ branch_article.url }}).
{% endif %}
