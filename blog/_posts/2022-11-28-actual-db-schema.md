---
layout: post
title: "Keep DB schema clean and consistent between branches"
modified: 2022-11-28 00:41:06 +0300
description: "Learn how to keep DB schema clean and consistent between branches while developing a Rails application"
tags: [rails, migrations, actual_db_schema]
keywords: "rails schema,rails migrations,db inconsistency,rails development,revert migrations,open-source gem,actual_db_schema,branch switching,reversible migrations,unreversible migrations,automated migration management,development time-saving,rake task,rails debugging,rails application development,github open source"
comments: true
share: true
image: actual_db_schema.png
---

**TL;DR:** Use the [actual_db_schema](https://github.com/widefix/actual_db_schema) gem.

Switching between branches after running migrations in a Rails application makes the DB inconsistent.
Eventually, the application starts raising exceptions coming from the DB. You start debugging and spend some time on that.
It turns out that some migrations from unmerged branches need to be rolled back.
Sounds familiar? Keep reading to see a solution that solves this issue once and for all (well, with some caveats). With this solution you will forget about the question of how to reset the DB schema to its previous state in Rails.

### Problem

Consider a typical Rails application development scenario.

In branch A, I add a mandatory (not null) field to the DB via a migration and run it. Then I switch to another branch B.
This branch's code is not aware of that new field.
As a result, the code is failing with an error "null value provided for non-null field".
Moreover, DB rake tasks generate a diff in `schema.rb` that's not relevant to the current branch.
I can switch to branch A and roll back the unneeded migration, but I need to remember that branch. That also wastes my time.

An example of an exception that starts appearing in the application "spontaneously":

```ruby
ActiveRecord::NotNullViolation:
   PG::NotNullViolation: ERROR:  null value in column "log" of relation "check_results" violates not-null constraint
   DETAIL:  Failing row contains (8, 46, success, 2022-10-16 21:47:21.07212, 2022-10-16 21:47:21.07212, null).
```

### Solution

What if we have a tool that tracks executed migrations outside the current branch and rolls them back automatically?
It would save a significant amount of time.

These thoughts made us build this tool. It's [open-source](https://github.com/widefix/actual_db_schema) and ready for you to use.

All you need is just to put it into your Gemfile and run bundle install:

```ruby
group :development do
  gem "actual_db_schema"
end
```

```shell
$ bundle install
```

From now on, it will try to revert all migrations that are not related to the current branch every time you run `rails db:migrate`
(or any other Rake task with a `db:schema:dump` dependency).

How does it understand which migrations it should revert? Simply, it collects all executed migrations within the `tmp` folder.
Knowing the difference between migrations that are related to the current branch (kept inside the `db/migrate` folder)
and those actually run (kept inside the `tmp` folder), it rolls the unrelated migrations back.

### Conclusion

All seems well, but this solution has one caveat. It assumes the migrations are reversible.
Irreversible migrations won't roll back. Handle such situations by hand.

The last item can be a pain point. Fortunately, most migrations are reversible. Hence, this tool can still save a lot of development time.

[Your feedback and questions are always welcomed](https://github.com/widefix/actual_db_schema/discussions).
