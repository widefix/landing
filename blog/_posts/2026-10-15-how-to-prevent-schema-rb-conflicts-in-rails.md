---
layout: post
title: "How to Prevent schema.rb Conflicts in Rails"
headline: "How to Prevent schema.rb Conflicts in Rails"
date: 2026-10-15 09:00:00 +0200
description: "Diagnose Rails schema.rb conflicts, remove phantom migrations, and regenerate a clean schema without losing legitimate changes from other branches."
tags: [rails, migrations, database, git, actual-db-schema]
comments: true
share: true
toc: true
featured_post: false
tested_with: "Ruby 3.4.9, Rails 8.1.0, and SQLite"
image_svg: schema-rb-conflicts.svg
social_image: schema-rb-conflicts-social.png
social_image_width: 1200
social_image_height: 630
---

You changed one column. Your pull request changes five tables in `db/schema.rb`. A teammate asks why, and you have no good answer yet.

I've seen this happen when a developer switches branches but keeps using the same local database. The code moved. The database didn't.

**TL;DR:** Find out whether the diff comes from legitimate changes on both branches, leftover local migrations, or different schema-dumping behavior. Resolve the migration files first, clean up unrelated database changes, and regenerate the schema. `actual_db_schema` helps with tracked migrations left behind by other branches; it does not merge arbitrary schema conflicts for you.

## Why schema.rb changes when you did not change a migration

Rails generates `db/schema.rb` from the database's current structure. It doesn't reconstruct the file solely by reading the migration files in your current branch.

Suppose a feature branch adds `users.timezone`. You migrate that branch, switch to another branch, and run `bin/rails db:migrate` again. If nothing reverses the first migration, your database still has the column. The next schema dump can include it even though the current branch has no migration that adds it.

Now your pull request contains a database change that belongs to someone else's work. That is different from two developers legitimately adding two columns to the same table.

The [Rails migration guide](https://guides.rubyonrails.org/active_record_migrations.html#schema-dumping-and-you) explains the role of the generated schema file. The practical consequence is simple: **a clean Git checkout does not imply a clean database**.

## Diagnose the diff before resolving it

Start with these commands from your Rails application:

```sh
git diff -- db/schema.rb
git diff --name-status main...HEAD -- db/migrate
bin/rails db:migrate:status
```

The first command shows uncommitted schema changes. If the file is already committed in your feature branch, also run:

```sh
git diff main...HEAD -- db/schema.rb
```

Replace `main` with your team's integration branch when necessary.

Look for three different situations:

| What you see | Likely cause | What to do |
| --- | --- | --- |
| A column or table appears without a corresponding migration on this branch | A leftover database change or a manual schema edit | Identify how it reached the database before regenerating the file |
| Both branches have migrations that change the same table | Legitimate concurrent development | Keep both intended migration changes and generate their combined schema |
| Column order or formatting changes across many tables | Different Rails versions or schema-dumping behavior | Align the environment and inspect the relevant Rails change |

An applied migration marked `NO FILE` is a useful clue. It means the database records the version but the source file is missing from the current checkout. It can be a branch-specific migration, but it can also be an old migration your team intentionally removed. Don't delete every such version automatically.

## Remove a leftover branch migration

For a migration you can still find on its original branch, the manual approach is straightforward:

1. Save or commit your current work.
2. Switch to the branch containing the migration.
3. Review its reverse operation and roll back that specific version.
4. Return to your working branch and run its migrations.

For example, after finding the actual version in the filename:

```sh
# Run on the branch that contains this migration.
bin/rails db:migrate:down VERSION=20261015080000
```

This example version is a placeholder. Use the version you identified, and check whether later migrations depend on it before running the command.

A rollback can remove data. Dropping a column removes the values stored in that column; dropping a table removes its rows. Doing less work than a full database reset does not make a rollback harmless.

## Prevent the same cleanup with actual_db_schema

I built [Actual DB Schema](/actual-db-schema) to track migrations as they run and retain their source code. That stored code lets the gem attempt a rollback when a migration is absent from the current branch.

Install it **before** running the feature migrations you want it to track:

```ruby
# Gemfile
group :development do
  gem "actual_db_schema"
end
```

```sh
bundle install
bin/rails actual_db_schema:install
```

For explicit control, decline the optional Git hook during installation. Keep using:

```sh
bin/rails db:migrate
```

With automatic rollback enabled, the gem attempts to reverse tracked phantom migrations before Rails dumps the schema. That stops those leftover changes from reappearing in the generated file when their rollbacks succeed.

You can inspect the tracked phantom migrations separately:

```sh
bin/rails db:phantom_migrations
```

The gem needs its stored migration source. Installing it after a migration has already run does not retroactively give it that history. Irreversible migrations and reversals that depend on unavailable branch code still need manual attention. See the project's [scope and rollback requirements](https://github.com/widefix/actual_db_schema#scope-and-rollback-requirements).

## Resolve a real Git merge conflict

What if both branches contain valid changes? Removing phantom migrations will not decide which business changes to keep. That's a code-review decision.

Suppose `main` adds `users.locale` and your branch adds `users.timezone`. Keep both migration files. Make sure the combined code and migration definitions are correct before dealing with the generated schema.

If you are merging `main` **into your feature branch**, you can use your branch's schema as a temporary starting point:

```sh
git checkout --ours db/schema.rb
bin/rails db:migrate
git diff -- db/schema.rb
git add db/schema.rb
```

These commands assume you are in a merge, not a rebase, and that the migration-file conflicts have already been resolved. `--ours` does not mean “the correct schema.” You still need to clean unrelated database state, apply the combined migrations, and inspect the generated result before staging it.

For a disposable development database, a fresh database built from the intended history can be another way to check the result. Don't reach for `db:reset` on a database containing local data you need.

The important part is the final review: are both intended columns present, are unrelated changes absent, and do the tests pass? Removing conflict markers alone does not answer those questions.

## Column sorting addresses a different problem

Rails 8.1 includes a [change that sorts columns by name when dumping the schema](https://github.com/rails/rails/pull/53281). It reduces differences caused by developers applying independent migrations in different orders.

If your team uses an older Rails version, that behavior may differ. Keep the Rails version consistent across development and CI before blaming a teammate's editor for a noisy diff.

Column sorting and phantom migration cleanup are complementary. Sorting doesn't remove a column left behind by another branch. `actual_db_schema` doesn't implement Rails' column sorting or solve every merge conflict.

## A small habit that prevents noisy pull requests

Before committing a generated schema, compare it with the migration changes you intend to ship. Ask yourself: can I explain each changed table, column, index, and constraint?

If the answer is no, investigate the database first. A generated file is only as trustworthy as the state it was generated from.

For installation details and a walkthrough, visit [Actual DB Schema](/actual-db-schema). If you need help maintaining a live application with difficult database changes, explore our [Rails maintenance service](/ruby-on-rails-maintenance).

{% assign branch_article = site.posts | where: "url", "/rails-database-migrations-across-multiple-git-branches/" | first %}
{% if branch_article and branch_article.date <= site.time %}
For a complete branch-switching exercise, read [Rails Database Migrations Across Multiple Git Branches]({{ site.url }}{{ branch_article.url }}).
{% endif %}
{% assign data_article = site.posts | where: "url", "/complete-guide-to-data-migrations-in-rails/" | first %}
{% if data_article and data_article.date <= site.time %}
For changes to the records themselves, read [The Complete Guide to Data Migrations in Rails]({{ site.url }}{{ data_article.url }}).
{% endif %}
