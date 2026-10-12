---
layout: post
title: "Skip callbacks in tests"
description: "Simple solution to skip callbacks in tests if they should not be run there. The solution is for Rails ActiveRecord."
tags: [rails, callbacks]
share: true
comments: true
redirect_from:
  - /blog/2014/03/25/skip-callbacks-in-tests/
---


There are a lot of troubles around callbacks in Rails' ActiveRecord. In general, people use callbacks for complicated operations, such as sending emails, creating related models and so on. Basically, all of them should be prevented from running in tests because they slow the tests down. It's no secret that there are best practices for avoiding this problem, but in some cases it's almost impossible to apply them to your project.
This post shares an idea for preventing callback execution if you are in the same situation.


## Problem

Consider the most frequent use case. We have a `User` model and we want to send an email on its creation. With callbacks we could have the code like this:

{% highlight ruby %}
class User < ActiveRecord::Base
  after_create :send_greating_email

  private

  def send_greating_email
    NotificationSystem.send_email(:greeting, user)
  end
end
{% endhighlight %}

Here, we have one `after_create` callback, `:send_greeting_email`, called after the user is created. The callback should send a real email to the user.

> Note: We don't provide the `NotificationSystem` class here because it is not required to understand the problem.

At first glance, there is no problem with this code. But when you start testing it, you may have a problem: the callback shouldn't run in any tests except the one place where we want to test it. How do we do that?

One possible solution is to stub `send_greeting_email` in all tests and *unstub* it where its call is really needed. Of course, this will work, but it requires some monkey business because you have to put the stubbing code in all your project's test files. Here is possible `RSpec` code for doing it:

{% highlight ruby %}
describe User do
  before(:all) do
    User.any_instance.stub(:send_greeting_email)
  end

  context "tests which don't require sending greeting email" do
    # Common tests are here
    # ...
  end

  context 'testing sending greeting email' do
    before(:all) do
      User.any_instance.unbstub(:send_greeting_email)
    end

    # Test sending greeting email
  end
end
{% endhighlight %}

We should include the code in the `before(:all)` blocks in all tests that manipulate a `user` object. It's not convenient at all. Moreover, it's not robust because, if you change the callback name, you will have to fix many tests. Finally, remember that we have to test a class's interface, not its internals, but by stubbing the callback method here, we violate that rule.

Another solution might be to use [Rails observers](https://github.com/rails/rails-observers). With observers, you can disable them in tests by default and enable them where desired. Simply speaking, this works for some straightforward projects. But observers cause debugging problems in complicated projects with model inheritance, many observers per model and so on. So this isn't our solution either because, as you've already guessed, we have a complicated project.

So this solution won't work for us.

## Trending solutions

The most popular solution is to avoid falling into this trap at all. You can use best practices like [service objects](http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/) or [form objects](http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/). This lets you write callback logic separately from the model. With this approach, we won't have callbacks defined in models at all. Service or form objects can also be tested easily in isolation.

But although this solution has no drawbacks, there are cases where applying it may be too expensive. For example, you may already have a big project with many objects and controllers. In this case, we would have to write many service or form objects and change code in almost all controllers. It is a huge piece of work.

## Solution with skipping callbacks

A reasonable solution here is to turn off all callbacks in tests and turn them on in particular places. We can do this by implementing a switch in all models and adding a condition for all callbacks. The condition will check the switch's status and allow or block the callbacks accordingly.

Let's implement it. Firstly, add a switch to the models with this monkey patch:

{% highlight ruby %}
class ActiveRecord::Base
  cattr_accessor :skip_callbacks
end
{% endhighlight %}

> Note: the most suitable place for this code in a Rails project is the `config/initializers` folder. If you place the code in `config/initializers/active_record.rb`, for example, it will run on each application start.

In the next step, add the condition to the controlled callbacks. Check out how to do it in the `User` model:

{% highlight ruby %}
class User < ActiveRecord::Base
  after_create :send_greating_email, unless: :skip_callbacks

  private

  def send_greating_email
    NotificationSystem.send_email(:greeting, user)
  end
end
{% endhighlight %}

That's all. Now we can turn callbacks on and off where we need to:

{% highlight ruby %}
ActiveRecord::Base.skip_callbacks = true
User.create # callbacks won't be run
ActiveRecord::Base.skip_callbacks = false
User.create # callbacks will be run
{% endhighlight %}

> You can find the ready-to-use example [here](https://gist.github.com/ka8725/9767340) and run it with the command `ruby <exmaple>.rb`. To run the code, you should have any version of *Rails* installed.

With this approach, you can even write a simple switch for the tests. Put this code in `spec/spec_helper.rb`:

{% highlight ruby %}
RSpec.configure do |config|
  config.before(:all, callbacks: true) do
    ActiveRecord::Base.skip_callbacks = false
  end

  config.after(:all, callbacks: true) do
    ActiveRecord::Base.skip_callbacks = true
  end
end


ActiveRecord::Base.skip_callbacks = true
{% endhighlight %}

Now you can write contexts or tests with callbacks enabled or disabled:

{% highlight ruby %}
describe User do
  # As default callbacks are turned off, so we don't have to switch off them explicitly
  context "tests which don't require sending greeting email" do
    # Common tests are here
    # ...
  end

  # These tests should run callbacks - add "callbacks" option with the "true" value
  context 'testing sending greeting email', callbacks: true do
    # Test sending greeting email
  end
end
{% endhighlight %}

If you want, you can even turn callbacks on or off for a particular model:

{% highlight ruby %}
User.skip_callbacks = true
User.create
# Callbacks are run
User.skip_callbacks = false
User.create
# Callbacks are not run
{% endhighlight %}

## Conclusion

If you start a new Rails project, think it over and avoid using callbacks. Use service objects or form objects instead. But if your project has already started and has many models, skipping callbacks may save you.
