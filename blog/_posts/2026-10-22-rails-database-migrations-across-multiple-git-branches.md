---
layout: post
title: "Rails Database Migrations Across Multiple Git Branches"
headline: "Rails Database Migrations Across Multiple Git Branches"
date: 2026-10-22 09:00:00 +0200
description: "Reproduce database drift across Rails feature branches, compare manual rollback and branch-specific databases, and try actual_db_schema with observable checks."
tags: [rails, migrations, database, git, actual-db-schema]
comments: true
share: true
toc: true
featured_post: false
tested_with: "Ruby 3.4.9, Rails 8.1.0, and SQLite"
image_svg: rails-migrations-git-branches.svg
social_image: rails-migrations-git-branches-social.png
social_image_width: 1200
social_image_height: 630
---

Git is very good at switching the files in your working directory. Your database lives outside that directory's version history, so it keeps its own state.

This matters when you review one feature, return to your own branch, and find that tests no longer pass. The problem may not be in either feature's code. You may be running one branch's code against another branch's database structure.

Let's reproduce that situation and then choose a workflow deliberately. The goal here is not just a clean `schema.rb` diff. It is knowing which database your branch is actually using.

## Three histories, not one

A Rails developer working across branches has at least three things to keep aligned:

- Git's current migration files.
- The migration versions recorded in the database's `schema_migrations` table.
- The tables, columns, indexes, and constraints actually present in that database.

A version record tells Rails that a migration ran. It does not store the original migration's Ruby source or make `git switch` reverse that migration.

That is why switching to a branch with fewer migration files can leave more database structure than the branch expects.

## Reproduce the mismatch in a disposable app

The following exercise uses SQLite so you do not need a database server. It was checked with Ruby 3.4.9 and Rails 8.1.0. Use a throwaway app: the exercise intentionally adds and removes a column.

```sh
gem install rails -v 8.1.0
rails _8.1.0_ new branch_lab --minimal --database=sqlite3
cd branch_lab
bin/rails generate model Account name:string
bin/rails db:migrate
git add .
git commit -m "Create accounts baseline"
git branch -M main
```

If the initial commit fails, configure your Git name and email first. There should be no application code using a nickname yet.

Now add a column on a feature branch:

```sh
git switch -c feature/account-nickname
bin/rails generate migration AddNicknameToAccounts nickname:string
bin/rails db:migrate
git add db/migrate db/schema.rb
git commit -m "Add account nickname"
```

Confirm that the database has the new column:

```sh
bin/rails runner 'puts Account.column_names.include?("nickname")'
```

It prints `true`.

Return to the baseline branch:

```sh
git switch main
bin/rails runner 'puts Account.column_names.include?("nickname")'
```

It still prints `true`, even though the nickname migration file disappeared from the checkout. SQLite's development database is not a tracked Git file. Git switched the code, not the database.

Run the migration task and inspect its consequences:

```sh
bin/rails db:migrate:status
bin/rails db:migrate
git diff -- db/schema.rb
```

The status includes the applied nickname migration with `NO FILE`. The schema diff includes the nickname column again. Rails has no pending migration on `main` that knows it should remove the column.

## Option 1: Roll back before switching

For occasional branch changes, a manual workflow can be enough. While the migration file is available, run its reverse operation before leaving the branch.

To clean up the exercise, discard only the generated schema diff we just produced in this throwaway app, then return to the feature branch and identify its migration version:

```sh
git restore -- db/schema.rb
git switch feature/account-nickname
bin/rails db:migrate:status
```

Then roll down the version shown for `Add nickname to accounts`:

```sh
bin/rails db:migrate:down VERSION=YOUR_NICKNAME_MIGRATION_VERSION
git restore -- db/schema.rb
git switch main
bin/rails db:migrate
bin/rails runner 'puts Account.column_names.include?("nickname")'
```

The schema restore removes only the generated diff in this disposable exercise; it does not undo the database rollback. In a real working tree, save any unrelated edits first.

The last command now prints `false`. Review `git diff -- db/schema.rb`; it should be clean for the baseline.

This approach costs almost nothing to adopt. Its weakness is that you must remember the cleanup, retain the original migration source, and reverse dependent migrations in a sensible order. It also removes the data stored in the dropped column.

## Option 2: Keep a database per branch or worktree

Separate databases let branches retain their own structure and local data. A feature branch can keep its nickname values while `main` uses a database without that column.

For example, a team using PostgreSQL can assign each working checkout an explicit database name:

```yaml
# config/database.yml
production:
  url: <%= ENV.fetch("DATABASE_URL") %>

development:
  adapter: postgresql
  encoding: unicode
  database: <%= ENV.fetch("DEV_DATABASE_NAME", "branch_lab_development") %>
```

This is a separate configuration example, not a step for the SQLite exercise. Supply the other PostgreSQL connection settings your environment needs.

In one terminal or worktree, set:

```sh
export DEV_DATABASE_NAME=branch_lab_nickname
bin/rails db:prepare
```

In another, use `branch_lab_main`. Restart long-running Rails processes when changing their database configuration. A Git worktree by itself does not give you a separate PostgreSQL database.

I prefer an explicit assignment over blindly interpolating raw branch names into database names. Branch names can contain slashes, and a team's naming and cleanup policy deserves a little thought.

The tradeoff is storage and setup. Large production-like datasets are expensive to duplicate. You also need a process for creating databases, loading suitable development data, and removing abandoned ones. For long-running parallel work, that cost may be worth it.

## Option 3: Track and clean phantom migrations

[Actual DB Schema](/actual-db-schema) records the source of migrations executed while it is installed. It can then find applied migrations that are missing from the current branch and attempt their reversal.

Start this part of the exercise on the clean `main` baseline from the manual cleanup above. Install the gem on `main` so every new feature branch inherits it:

```ruby
# Gemfile
group :development do
  gem "actual_db_schema", "0.10.0"
end
```

```sh
bundle install
bin/rails actual_db_schema:install
```

Decline the optional post-checkout hook for this exercise. That lets us see the mismatch before explicitly running cleanup. Check that automatic rollback on migration is enabled; the generated initializer describes the options.

```sh
git add Gemfile Gemfile.lock config/initializers/actual_db_schema.rb
git commit -m "Track development migrations"
git switch -c feature/tracked-nickname
bin/rails generate migration AddTrackedNicknameToAccounts nickname:string
bin/rails db:migrate
git add db/migrate db/schema.rb
git commit -m "Add tracked nickname"
git switch main
```

Inspect the tracked phantom migration:

```sh
bin/rails db:phantom_migrations
bin/rails runner 'puts Account.column_names.include?("nickname")'
```

The column is still present: switching branches alone has not run cleanup because we skipped the hook. Now run:

```sh
bin/rails db:migrate
bin/rails runner 'puts Account.column_names.include?("nickname")'
git diff -- db/schema.rb
```

The column check prints `false`. The gem uses the stored migration to reverse the feature's schema change before Rails dumps the baseline schema.

Notice the order of the exercise: **install, execute the feature migration, switch, clean up**. If you install the gem after running the feature migration, it cannot invent the stored source it never captured.

For regular use, pin or constrain a version according to your application's dependency policy. See the project's [installation and configuration documentation](https://github.com/widefix/actual_db_schema#installation).

## What automatic cleanup cannot decide

A migration is not reversible just because it has a `down` method. That method may need a model or service that exists only on the old branch. It may drop useful local data. A migration containing irreversible operations may fail to roll back entirely.

Review warnings and inspect the actual structure after a failure. Don't assume the database is aligned merely because the command finished.

The gem also does not detect an edit to an already-applied migration that remains in the current branch. Create a new migration for shared changes instead of treating migration filenames as editable state snapshots.

If you prefer manual cleanup, the gem supports inspecting phantom migrations and running explicit rollback tasks. That can be useful when you want to examine each reverse operation before applying it.

## Choose a workflow for the way your team works

| Workflow | Useful when | Cost to account for |
| --- | --- | --- |
| Manual rollback before switching | Branch changes are infrequent and migrations are simple | Developer attention, dependent migrations, and rollback data loss |
| Separate database per checkout | Several branches stay active for long periods | Database storage, setup, naming, and cleanup |
| Tracked phantom migration cleanup | One local database frequently follows different branches | Stored source, reversible migrations, and checking failed cleanup |

These choices can coexist. You might keep a separate database for a large experiment and use `actual_db_schema` for routine changes on the main development database.

For shared staging environments, coordinate deployment and database changes with the team. One developer's branch switch must not unexpectedly reverse schema changes another developer is still using. Development automation is not a production deployment policy.

## Make the database state observable

The most useful habit is checking the database after a branch change rather than inferring it from the code. A quick column check, migration status, or focused test gives you an answer you can verify.

Choose the workflow that makes those checks boring. That's the point: less detective work, more confidence in the environment you're developing against.

Explore [Actual DB Schema](/actual-db-schema) for the product walkthrough, or [Migration Data](/migration-data) for testable changes to records inside migrations.

{% assign schema_article = site.posts | where: "url", "/how-to-prevent-schema-rb-conflicts-in-rails/" | first %}
{% if schema_article and schema_article.date <= site.time %}
For a focused schema-conflict checklist, read [How to Prevent schema.rb Conflicts in Rails]({{ site.url }}{{ schema_article.url }}).
{% endif %}
{% assign data_article = site.posts | where: "url", "/complete-guide-to-data-migrations-in-rails/" | first %}
{% if data_article and data_article.date <= site.time %}
For choosing a record-migration approach, read [The Complete Guide to Data Migrations in Rails]({{ site.url }}{{ data_article.url }}).
{% endif %}
