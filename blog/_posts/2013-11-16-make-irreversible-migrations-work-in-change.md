---
layout: post
title: "Make irreversible migrations work in change"
description: "Rails raises ActiveRecord::IrreversibleMigration when it
can't reverse a migration. Since Rails 4 was released, there has been a solution to avoid
it."
tags: [rails, migrations]
share: true
comments: true
redirect_from:
  - /blog/2013/11/16/make-irreversible-migrations-work-in-change/
---



In Rails 2, migrations had only 2 methods: `up` and `down`. They are
called when running migrations up and down, respectively, with the Rake tasks `rake db:migrate`
and `rake db:rollback`. In the migration's `up` method, you had to write
code called only when running the migration forward, and in down, the code
called only when rolling the migration back. For example, if you created a table
in up, you had to drop it manually on rollback. Rails 3 gave us a great method,
`change`, which allowed us to write code that creates a table and drops it
automatically when rolling the migration back. This was a really great step forward,
and thankfully it still exists in Rails 4. But unfortunately, there was a problem: you didn't
have the opportunity to say, "Don't run this piece of code in down; run it
only in up." So the solution was just to use the old syntax. Since Rails 4 was released,
there has been a feature to fix this situation.

## Reversible

How would you write a migration that should add a new column in up and
fill it for all records in the table only in up, then only delete this column in
down? I bet that in Rails 3 you would write it like this:

{% highlight ruby %}
def up
  add_column :users, :location, :string
  User.update_all(location: 'Minsk')
end

def down
  remove_column :users, :location
end
{% endhighlight %}

You had to avoid using the `change` method, which saves some time.
For example, if you didn't need to update column value immediately
after adding it, you could cut this code down to something like this:

{% highlight ruby %}
def change
  add_column :users, :location, :string
end
{% endhighlight %}

And that's it. In up, it will add the column to the table and remove it in
down. Much less code, and that's a benefit.

Rails 4 provides one more useful way to write what we need in one
place:

{% highlight ruby %}
def change
  add_column :users, :location, :string
  reversible do |direction|
    direction.up { User.update_all(location: 'Minsk') }
  end
end
{% endhighlight %}

Check out the original
[documentation](http://api.rubyonrails.org/classes/ActiveRecord/Migration.html#method-i-reversible).
