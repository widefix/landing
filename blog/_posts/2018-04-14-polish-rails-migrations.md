---
layout: post
title: "Polish Rails migrations"
modified: 2018-04-14 00:41:06 +0300
description: "Sometimes you need to rerun a new migration back and forth several times in a pull request after code changes, rebasing and so on. This gets annoying when the PR has many migrations and the one you're changing is in the middle of the history. This post offers a solution to relieve the pain."
tags: [rails, migrations]
comments: true
share: true
---

Sometimes you need to rerun a new migration back and forth several times on a feature branch because of code changes, typo fixes, performance improvements, rebasing and so on. You can do this with popular Rake commands: run `rake db:rollback` as many times as needed to reach the migration you want to change (or, more easily, `rake db:rollback STEP=3`, where 3 is the number of steps back), change it and run `rake db:migrate`. That's all, easy-peasy. Isn't it? But what if there's another typo or mistake? What do you do? Repeat the process? That can get too annoying. In this post, I show an alternative way to relieve the pain and feel more comfortable writing migrations.

### Problem

Just imagine the situation below. Here is the list of migrations in your Rails app:

```
< > 20180317144803_migration1.rb
< > 20180317144804_migration2.rb
...
< > 20180317144814_migrationN.rb
```

All these migrations have run locally. Migration `1` should be altered. Moreover, there's clearly no need to rerun migrations `2` to `N`. Rolling all of them back to the first migration might become a pain, especially when working on a big problem in a big team that changes the migration list often. Rails kindly provides special Rake tasks for exactly this case.


### Solution

Long story short, to roll back the migration (it and only it!), use this command:

```
rake db:migrate:down VERSION=20180317144803
```

Then make the necessary change and run the migration forward:

```
rake db:migrate:up VERSION=20180317144803
```

When using these Rake tasks, note that Rails migrations can run in any order. But sometimes they depend on each other, especially at the beginning of project development. So, to be safe, run all of them down and up at least once:

```
rake db:rollback STEP=12
rake db:migrate
```

`12` is the `N` here.


### To boot

And for dessert, check out this command that shows the status of all migrations in a Rails project:

```
rake db:migrate:status
```

This is the output I got on a test project:

```
database: test-dev

 Status   Migration ID    Migration Name
--------------------------------------------------
   up     20180322190630  Remove special name
   up     20180326210602  Add default for users
  down    20180405124704  Add email
   up     20180406205508  Remove email
```

In this example, executing `rake db:migrate:up VERSION=20180405124704` changes the status to this:

```
database: test-dev

 Status   Migration ID    Migration Name
--------------------------------------------------
   up     20180322190630  Remove special name
   up     20180326210602  Add default for users
   up     20180405124704  Add email
   up     20180406205508  Remove email
```

Executing `rake db:migrate:down VERSION=20180405124704` changes it back to the previous state.

The following command can also be useful:

```
rake db:migrate:down VERSION=20180405124704
```

It combines the two actions (up and down) in one: first it tries `down`, then `up`. More information about these tasks is in the Rails source [here](https://github.com/rails/rails/blob/0a353a97869b2af256d4253533beeb38303cf753/activerecord/lib/active_record/railties/databases.rake#L108-L148).

### Conclusion

Adjusting a migration can be a huge pain. But thanks to Rails, this process is a pleasure to work with. There may be many pieces of advice for this kind of job, but I would caution that it's impossible to write instructions for every case in your daily work. Just read migration errors and use common sense. For example, if an error says the table `x` you're trying to delete doesn't exist, perhaps you're doing something wrong and have a mess in your DB. Maybe the DB should be reinitialized with new data. Or you can comment out that line in the migration for this run and uncomment it afterward (this may be acceptable when experimenting with a new migration).
