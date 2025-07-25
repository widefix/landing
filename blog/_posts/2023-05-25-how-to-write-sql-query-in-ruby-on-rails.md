---
layout: post
title: "How to write SQL query in Ruby On Rails"
headline: "Essential knowledge to write SQL in Ruby On Rails app"
modified: 2023-05-25 11:49:18 +0200
description: "Learn how to write SQL in Ruby On Rails applications. Use that to speed up performance and advance knowledge in software architecture."
tags: [sql, postgresql, rails, rails-development, performance]
featured_post: false
toc: true
image: write-sql-rails.jpg
---

ActiveRecord is a central component of a Rails application. It's a wrapper for a database used behind the scene. And the database is another essential thing in almost any web application. Understanding how these two things go along is crucial to develop a fast, performant, and correct project. Missing knowledge here leads to overengineered solutions, performance issues, and bad user experience.

In this article, you will see how to write SQL and use that knowledge in a Rails application.

## How to see which SQL generated by ActiveRecord

> The post uses this [app](https://github.com/widefix/demo-fast-sql){:ref="nofollow" target="_blank"} to play with examples.

To see which SQL is generated by queries to models in a common Rails app, use `.to_sql` method. We can check that in the Rails console (run `rails console` and then write your experimental Ruby code there):

```ruby
> Project.all.to_sql
=> "SELECT \"projects\".* FROM \"projects\""
```

Note, it works for any query, for example, when it uses conditions or joins:

```ruby
> Project.joins(:ratings).to_sql
=> "SELECT \"projects\".* FROM \"projects\" INNER JOIN \"ratings\" ON \"ratings\".\"project_id\" = \"projects\".\"id\""

> Project.joins(:ratings).where(ratings: {rating: 5}).to_sql
=> "SELECT \"projects\".* FROM \"projects\" INNER JOIN \"ratings\" ON \"ratings\".\"project_id\" = \"projects\".\"id\" WHERE \"ratings\".\"rating\" = 5"
```

The query can be very complex. It can be constructed from different parts of the app using scopes, and separate classes implementing some patterns like Query Object, etc. In the end, the generated SQL query defines a related feature correctness. Hence, use this trick while debugging code to find a bug in the generated query.

## How to write raw SQL in a Rails application

ActiveRecord comes with a handy interface and abstraction to write raw SQL queries. Why should one do that? Well, there can be many reasons for that:
- Improving query performance.
- Lack of knowledge in ActiveRecord.
- Lack of functionalities in ActiveRecord.
- Avoiding Arel queries (this thing is used behind the scene of ActiveRecord to generate SQL queries out of the Ruby constructions).

Whatever the reason, it's reduced to just one desire - **demand of controlling SQL queries**. If you are one of this kind of person having this desire, use the following approach:

```ruby
> ActiveRecord::Base.connection.execute("select * from projects").to_a
=> [
{"id"=>1,
  "description"=>"it's a test project",
  "user_id"=>3,
  "created_at"=>2022-09-29 20:10:46.751835 UTC,
  "updated_at"=>2023-01-17 23:22:42.275697 UTC,
  "status"=>"Open",
  "category"=>"Website and landing page design",
  "experience"=>"New to Widefix — under one year",
  "existing_website"=>"Yes, I already have a website set up and live for customers",
  "existing_website_platform"=>"Widefix",
  "category_tasks"=>nil,
  "delivery_timeline"=>"11-21 days",
  ...
}, ...]
```

Also, this API allows to write SQL queries inside migrations. It's even easier in migrations as the `execute` method is available there.

To construct correct SQL you would propaply need a db console. It's the fastest way to write pure and correct SQL related to your Rails app DB. Use `rails db` command to open DB console and do your experiments with SQL.

## How to measure SQL query performance in Rails

To understand why SQL query is slow you can use explain analyze built-in functionality that every SQL DB has:

```ruby
Project.joins(:ratings).where(ratings: {rating: 5}).explain
  Project Load (2.1ms)  SELECT "projects".* FROM "projects" INNER JOIN "ratings" ON "ratings"."project_id" = "projects"."id" WHERE "ratings"."rating" = $1  [["rating", 5]]
=>
EXPLAIN for: SELECT "projects".* FROM "projects" INNER JOIN "ratings" ON "ratings"."project_id" = "projects"."id" WHERE "ratings"."rating" = $1 [["rating", 5]]
                                      QUERY PLAN
---------------------------------------------------------------------------------------
 Nested Loop  (cost=0.14..9.63 rows=1 width=1694)
   ->  Seq Scan on ratings  (cost=0.00..1.29 rows=1 width=8)
         Filter: (rating = 5)
   ->  Index Scan using projects_pkey on projects  (cost=0.14..8.16 rows=1 width=1694)
         Index Cond: (id = ratings.project_id)
(5 rows)
```

If the query was slow, we had to pay attention to the `Seq Scan on ratings`. That means the it didn't use index to filter ratings by the `rating = 5` condition. We can add a corresponding index to fix the issue.

Another problem that is frequently related to performance penalties is N+1 queries. Why many solutions can help with that, it's pretty easy to detect the issues by looking into logs. Many repeated lines with the following format indicate that issue:

```ruby
  Category Load (0.9ms)  SELECT "categories".* FROM "categories" WHERE "categories"."id" = $1 LIMIT $2  [["id", 3], ["LIMIT", 1]]
  ↳ app/queries/services_stats_query.rb:48:in `block in call_ruby'
  Category Load (0.9ms)  SELECT "categories".* FROM "categories" WHERE "categories"."id" = $1 LIMIT $2  [["id", 1], ["LIMIT", 1]]
  ↳ app/queries/services_stats_query.rb:48:in `block in call_ruby'
  Category Load (0.8ms)  SELECT "categories".* FROM "categories" WHERE "categories"."id" = $1 LIMIT $2  [["id", 3], ["LIMIT", 1]]
  ↳ app/queries/services_stats_query.rb:49:in `block in call_ruby'
  Rating Load (0.9ms)  SELECT "ratings".* FROM "ratings" WHERE "ratings"."reviewee_id" = $1  [["reviewee_id", 10]]
  ↳ app/queries/services_stats_query.rb:37:in `block in call_ruby'
  Project Load (1.0ms)  SELECT "projects".* FROM "projects" WHERE "projects"."id" = $1 LIMIT $2  [["id", 27], ["LIMIT", 1]]
  ↳ app/queries/services_stats_query.rb:38:in `block (2 levels) in call_ruby'
  Project Load (0.9ms)  SELECT "projects".* FROM "projects" WHERE "projects"."id" = $1 LIMIT $2  [["id", 39], ["LIMIT", 1]]
  ↳ app/queries/services_stats_query.rb:38:in `block (2 levels) in call_ruby'
  Project Load (0.9ms)  SELECT "projects".* FROM "projects" WHERE "projects"."id" = $1 LIMIT $2  [["id", 86], ["LIMIT", 1]]
  ```

Usually, eager loading techniques fix this issue. But that's a topic for a separate article.

## Play with SQL in Rails apps with confidence

Now you know all the essential tricks to work with SQL in a Rails application.

Moving further, you can read the following articles that expand the related knowledge:

  - [Make your Ruby on Rails app 80x faster with SQL](https://widefix.com/blog/importance-sql-for-rails-experts/){:ref="nofollow" target="_blank"}
  - [Financial plan on PostgreSQL](https://widefix.com/blog/financial-plan-on-postgresql/){:ref="nofollow" target="_blank"}
  - [Financial plan on Rails](https://widefix.com/blog/financial-plan-on-rails/){:ref="nofollow" target="_blank"}
  - [From Single drop-down to Multiple check-boxes](https://widefix.com/blog/from-single-dd-to-multiple-checkboxes/){:ref="nofollow" target="_blank"}
  - [Efficient algorithm to check dates overlap](https://widefix.com/blog/date-ranges-overlap/){:ref="nofollow" target="_blank"}

These articles show how to use SQL within Rails applications efficiently on practical examples. They also explain some useful but not very popular in the Rails community SQL tricks.

Happy coding!
