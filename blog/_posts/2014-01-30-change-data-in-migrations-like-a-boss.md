---
layout: post
title: "Change data in migrations like a boss"
description: "Update data in migrations like a boss. Don't write raw SQL in migrations, redefine models or use seeds. Use the migration_data gem to keep migrations up to date, migrate production data, test data migration code and clean up migrations."
tags: [rails, migrations]
share: true
comments: true
redirect_from:
  - /blog/2014/01/30/change-data-in-migrations-like-a-boss/
---

TL;DR: use the [migration_data](https://github.com/ka8725/migration_data) gem.

Changing data in production is a common problem for Rails developers. Assume you have a Rails project. One day, you decide to change the database schema and add a new column. Then you have to go through all existing records and update the data according to this new schema. There are solutions for this, but they have disadvantages. You will see them in this article and finally find out how to avoid these issues with the `migration_data` gem.

## Solutions with disadvantages

There are many approaches to dealing with data migrations in a Rails application:

* Use model classes in migrations carelessly
* Redefine models in migrations
* Write raw SQL in migrations
* Use seeds
* Other methods

Now let's look at all of them one by one and see what problems these solutions have.

### Use model classes in migrations carelessly

Let's say we are going to add a column to the `User` model and then update all users in our database. The migration may look like this:

{% highlight ruby %}
class AddStatusToUser < ActiveRecord::Migration
  def up
    add_column :users, :status, :string
    User.find_each do |user|
      user.status = 'active'
      user.save!
    end
  end

  def down
    remove_column :users, :status
  end
end
{% endhighlight %}

Today, this migration works without problems. We commit this code to our version control system (I hope it's `git`). All our team members fetch this new code and run the migration. It works as expected — perfect! But tomorrow, we decide to rename the `User` model to `Customer`. We create a new migration to rename the table, rename the model and leave the old migrations alone. The tests work, the new migration works, and everyone is happy. But what will happen to this migration in a week when it runs on the production server? It will fail because we won't have a `User` model anymore. We forgot to rename it in the old migration. This happens too often in a startup that follows an agile development approach.

Obviously, this solution is not recommended.

### Redefine models in migrations

There is a similar solution to the previous one and it may be useful in some cases. Just define the `User` model in the migration:

{% highlight ruby %}
class AddStatusToUser < ActiveRecord::Migration
  class User < ActiveRecord::Base
  end

  def up
    add_column :users, :status, :string
    User.find_each do |user|
      user.status = 'active'
      user.save!
    end
  end

  def down
    remove_column :users, :status
  end
end
{% endhighlight %}

Now, when you rename the `User` model in a new migration, this code won't fail. The solution is suitable for this example. But problems come when you have to define a polymorphic association in the migration:

{% highlight ruby %}
class AddStatusToUser < ActiveRecord::Migration
  class User < ActiveRecord::Base
    belongs_to :role, polymorphic: true
  end

  class Role < ActiveRecord::Base
    has_many :users, as: :role
  end

  def up
    add_column :users, :status, :string
    role = Role.create!(name: 'admin')
    User.create!(nick: '@ka8725', role: role)
  end

  def down
    remove_column :users, :status
  end
end
{% endhighlight %}

The code will work without an exception, but it doesn't set the correct association because the defined classes are under the `AddStatusToUser` namespace. This is what happens in reality:

{% highlight ruby %}
role = AddStatusToUser::Role.create!(name: 'admin')
AddStatusToUser::User.create!(nick: '@ka8725', role: role)
{% endhighlight %}


A bug in production pops up after running a migration like this. You connect to the server, open the Rails console and see what the heck is going on:

{% highlight ruby %}
user = User.find_by(nick: '@ka8725')
user.role       # => nil
user.role_type  # => AddStatusToUser::Role
{% endhighlight %}

As you can see, `role_type` is set incorrectly: it should be `Role` without the namespace. That's why this solution is bug-prone as well. It's definitely not recommended. Nevertheless, it's a standard way to overcome the problem in the Rails community.

### Writing raw SQL in migrations

To be honest, this solution has only one disadvantage: you have to know SQL, sometimes very well. So it might take more time to write the code. Even if the Rails community prefers not to write raw SQL, I would recommend this approach. Once you've grasped SQL skills, you can cope with any production data problems.

Refer to [official documentation](http://guides.rubyonrails.org/migrations.html#when-helpers-aren-t-enough) for examples of raw SQL in migrations.

### Use seeds

Rails has a useful approach for populating the DB. You can write any code in `db/seeds.rb` and run `rake db:seed`. This is a great solution for populating the database with initial data. But after your project is released, when you have to change the data along with the database schema, this approach is no longer handy. Writing the code in one file may also lead to a mess. Of course, you can split it into files and load them in `seeds.rb`. But you still have to worry about what happens on the second run, i.e. seeds are usually not idempotent. There is also a gem that helps structure your seed data: [seedbank](https://github.com/james2m/seedbank). But again, this doesn't solve the problem; this solution isn't intended for it at all. Don't even try this approach — it mixes up two different concepts. I've included it merely to point out that it's not acceptable, as I've seen examples of it.

### Other methods

No doubt, there are many other methods. For example, Rake tasks can migrate data. Or you could write code in the production console after deployment (I hope you don't do this). Below is an attempt to overcome the problem.

## Use the migration_data gem

I've created a gem that tries to solve these problems: [migration_data](https://github.com/ka8725/migration_data). The idea behind it is very simple: how do we ensure the code doesn't fail? Correct — with the help of tests. So why not write tests for data migrations?

The gem lets you define a special method called `data` in schema migrations. Write the data migration code there. Keep in mind that this method runs only when migrating up, i.e. with `rake db:migrate`, not with `rake db:rollback`. Additionally, to keep the code in the `data` method up to date, just write tests for it. That's it.

To make testing migrations possible, the `require_migration` method loads migration code easily.

Check out a migration example below:

{% highlight ruby %}
class CreateUsers < ActiveRecord::Migration
  def change
    # Database schema changes as usual
  end

  def data
    User.create!(name: 'Andrei')
  end
end
{% endhighlight %}

And this is a test for the migration:

{% highlight ruby %}
require 'spec_helper'
require 'migration_data/testing'
require_migration 'create_users'

desribe CreateUsers do
  describe '#data' do
    it 'works' do
      expect { CreateUsers.new.data }.to_not raise_exception
    end
  end
end
{% endhighlight %}

The test will fail on unexpected changes in the code related to the `User` model, and your CI will immediately inform you that the migration is no longer up to date (you have CI set up, right?).

# Conclusion

The only solution for keeping your migrations up to date, whatever code they contain, is to write tests for them. But if you write data migration code and database schema changes together in the `up`, `down` or `change` methods, you won't be able to write tests for these migrations. Changing the database schema in tests is not a good idea, is it? So if you have these problems, this gem is what you are looking for.

# Update 06/11/2015:

Over time, you may notice that it's rather hard to maintain old migrations, especially when the code changes a lot. At this point, the best solution I know is to remove all the old migrations. After that, we just have to insert the current database structure into the last migration. This way, we will have a clean migration history, and it will be possible to run it on a new database.

To perform the **migrations squash** I've added a rake task into [the gem](https://github.com/ka8725/migration_data#clean-old-migration) today. The task name is `db:migrate:squash`. And finally, don't forget to remove the migrations tests. Enjoy!

One note about the Rake task: you have to make sure all team members and deployment servers have already run all current migrations before **squashing**. Otherwise, they may encounter conflicts. This process can be automated later.


# Update 08/12/2015

At some point, you may get the following state:

{% highlight text %}
              Timeline
                  |
                  |
                  |<- change in the DB schema
                  |
                  |
         Squash ->|
                  |
                  |
{% endhighlight %}

This happens when somebody squashes migrations while another person creates a new one. This way, you can have an inconsistency: the migration containing a change may try to alter tables that haven't been created yet (for example, it just adds a column to `users`, but fails when applied to a fresh DB according to the migration history). In other words, make sure you don't have a migration before the squashed one. The fix is pretty easy: update the timestamp of the migration containing the change so it is newer than the squash migration.

# Update 18/01/2017

When you have to update a lot of data, the `migration_data` gem might not be a good choice. Processing a huge amount of data takes time and will slow down deployment dramatically. It will increase application downtime, which is unacceptable for a production application with many online clients. So if you have this type of application, please don't use this gem. Other techniques have already been discussed in these great posts and gems:

- [Rails Migrations with Zero Downtime](https://blog.codeship.com/rails-migrations-zero-downtime/)
- [Data Migrations in Rails](https://robots.thoughtbot.com/data-migrations-in-rails)
- [Seed Migration](https://github.com/harrystech/seed_migration)
- [data-migrate](https://github.com/ilyakatz/data-migrate)

Explore [Migration Data](/migration-data) for installation instructions, data hooks, and a backfill example with an accompanying test.
