---
layout: post
title: "Travel in time while testing a Rails application"
modified: 2017-07-22 00:41:06 +0300
description: "How to test a Rails application when you need to change the current time repeatedly. In other words, how to travel in time without disrupting your operating system."
tags: [rails, time travel, testing]
comments: true
share: true
---

When testing a Rails application, you often need to check that an event occurs in the future after some actions. For example, when a user signs up on "22 July 2017", they get a bonus. To test this manually, the current time has to be set to "22 July 2017". At first glance, this looks pretty trivial. Just open system settings, disable synchronization with time servers and change the operating system's local time. This will work, with no surprises. But problems come later if the time isn't restored to the real current time. Possible problems include mixed-up chat messages, secure sites that won't open because of HTTPS issues, commits with wrong timestamps and cluttered version control history, and so on. If these problems look familiar, welcome aboard and enjoy the flow of thoughts!

## Excursus

I often need to test a Rails application at a particular time, mostly in the future. I always did this by changing the operating system's time, which led to the problems described above. One day, it annoyed me so much that I started thinking about solutions that would emulate the current time without changing the operating system's time. Inspired by the feature on Linux-based machines that lets you override the time zone with the `TZ` environment variable, I started thinking in this direction. Unfortunately, I couldn't find a way to override the current time at the system level. Finally, I invented my own solution based on a Ruby gem, [Timecop](https://github.com/travisjeffery/timecop). But you can use any other gem you like. In this post, I just describe the general idea. So **never change your operating system time manually** because of the issues above, and keep reading!


## The solution

Before showing the main idea behind the solution, I would like to share a hack that will be handy not only here, but in other circumstances too.

Sometimes you need to change Rails application code locally without deploying those changes to production or committing them to version control. For example, I want to set a local alias for a namespace because it's too long, and I don't want to type a lot when debugging or investigating something in the Rails console. I.e. I want to do `GW = ActiveMerchant::Billing::TrustCommerceGateway`. It would be great not to set this alias manually every time I open the Rails console. One solution is to define a custom initializer (I hope this isn't news to you: initializers are in a Rails application's `config/initializers/` folder; more about them [here](http://guides.rubyonrails.org/configuring.html)). But version control will track it automatically. That's not a problem — you can configure it to be ignored. For Git, for example, put the file's path in `.gitignore`, and that's it.

I recommend defining one such initializer (for example, `config/initializers/dev.rb`) for all your aliases, local monkey patches and so on. By the way, check out a very useful monkey patch you will love:

```ruby
class BigDecimal
 def inspect
   to_s('F')
 end
end

```

Now, when you fetch an ActiveRecord instance from the DB in the Rails console, you will see human-readable floating-point numbers instead of unreadable `BigDecimal` objects. For example, before it was `#<BigDecimal:7fb8301a25a8,'0.5005E3',18(18)>`; after, it's `500.50`.


Enough introduction and excursuses. This is the code snippet for changing current time:

```ruby
class TravelTime
  def self.take
    File.read(ENV['TRAVEL_TIME']).chomp
  end
end

class TravelTimeMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    Timecop.travel(TravelTime.take) do
      @app.call(env)
    end
  end
end

Rails::Application.subclasses.first.class_eval do
  if ENV['TRAVEL_TIME']
    require 'timecop'

    config.middleware.use TravelTimeMiddleware

    Timecop.travel(TravelTime.take) # For Rake tasks, console and other similar processes

    # Uncomment the code below if you use Delayed Job as a queue in your application
    # class Delayed::Worker
    #   alias origin_run run
    #
    #   def run(job)
    #     Timecop.travel(TravelTime.take) do
    #       origin_run(job)
    #     end
    #   end
    # end
  end
end

```

To use this code, just put it in a local initializer. Create a text file containing a time in any format compatible with Rails. This is the time to travel to when testing the application. For example:

```
echo "Fri, 19 Jun 2017 10:46:52 EDT -04:00" > travel_time
```

Then set the `TRAVEL_TIME` environment variable to point to this file:

```
export TRAVEL_TIME=travel_time
```

That's it. Now, when you run the Rails server or console, the current time will be set to "19 Jun 2017 10:46:52". Defining it in a file lets you change it at any time, and it will update without restarting the Rails server (note that the console should be restarted). If you use Delayed Job and want to emulate the current time in its worker, uncomment the commented code. Similar code can be written for other queues.

> The snippet uses middleware. If you aren't familiar with this concept, please refer to [this guideline](http://guides.rubyonrails.org/rails_on_rack.html#configuring-middleware-stack).


## Conclusion

In this post, you've seen how to emulate the current time in a Rails application without changing operating system settings. This avoids many critical issues that may arise. I've also described a useful trick with local initializers that will help in different circumstances.
