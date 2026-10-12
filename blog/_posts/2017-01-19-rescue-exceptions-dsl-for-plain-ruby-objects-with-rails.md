---
layout: post
title: "An exception-rescue DSL for plain Ruby objects with Rails"
description: "A solution for using the rescue_from DSL in a Rails application.
              Likewise in Rails controllers we have a useful functionality to
              catch exceptions with rescue_from in order to change the default
              behavior, it's too easy to obtain it for any other type of a Ruby object in Rails applications."
modified: 2017-01-19 22:53:20 +0100
tags: [rails, rescue_from, exceptions, DSL]
comments: true
share: true
---

At some point, you may think how great it would be for the pure Ruby objects
in your Rails application to have the same DSL as Rails controllers for rescuing exceptions from
actions with the help of `rescue_from`. If you are interested in this topic, keep reading, and I will
show how easy it is to implement it from scratch.

**TL;DR:** use [ActiveSupport::Rescuable](http://api.rubyonrails.org/v5.0/classes/ActiveSupport/Rescuable/ClassMethods.html).

## Introduction

It's no secret that catching targeted exceptions raised in a Rails controller is very easy. Just use `rescue_from` in a base controller like this:

```ruby
class ApplicationController < ActionController::Base
  rescue_from CanCan::AccessDenied do
    redirect_to root_path, alert: "You don't have access to this page."
  end
end
```

And that's it. Whenever `CanCan::AccessDenied` is raised in an action of a controller inheriting from `ApplicationController`, the Ruby interpreter jumps into the block defined with `rescue_from` and executes it. As a result, the user is redirected to the main page with an alert, and the original exception is suppressed. There are different ways to use `rescue_from`, but this post isn't about them. You can find all the variations [here](http://api.rubyonrails.org/v5.0/classes/ActiveSupport/Rescuable/ClassMethods.html#method-i-rescue_from).

The main idea of this article is to show how to add this functionality to other types of objects in your Rails application. Say you have a bunch of service objects on the same hierarchy branch.
You want to catch a general exception easily in their base class, and you think
it would be good to have this functionality in the descendants.


## Extend custom objects with Rescuable

Actually, it's not a problem at all. All you have to do is just to include the `ActiveSupport::Rescuable`
module in a base class and wrap the method that does work that could raise an exception you want to catch with `rescue_from`.

To avoid being wordy, I will just provide a code snippet that demonstrates the main idea:

```ruby
class BaseService
  include ActiveSupport::Rescuable

  class FieldIsNilError < StandardError; end

  rescue_from FieldIsNilError do |exception|
    puts "Field is empty: #{exception.class} - #{exception.message}"
  end

  def call
    call_with_rescue { useful_yield }
  end

  private

  def call_with_rescue
    yield
  rescue => e
    rescue_with_handler(e) || raise(e)
  end

  def useful_yield
    fail NotImplementedError
  end
end

class LoginUserService < BaseService
  class InvalidEmailError < StandardError; end
  class EmptyEmailError < StandardError; end
  class SecurityError < StandardError; end

  rescue_from InvalidEmailError, EmptyEmailError do |exception|
    puts "Logged invalid login attempt: #{exception.class} - #{exception.message}"
  end

  def initialize(email: nil)
    @email = email
  end

  private

  def useful_yield
    case @email
    when 'invalid'
      fail InvalidEmailError, 'email is invalid'
    when ''
      fail EmptyEmailError, 'email is empty'
    when 'kill -9'
      fail SecurityError, 'throw out'
    when nil
      fail FieldIsNilError, 'email is nil'
    else
      puts 'login ok'
    end
  end
end

LoginUserService.new(email: 'invalid').call
# => Logged invalid login attempt: LoginUserService::InvalidEmailError - email is invalid
LoginUserService.new(email: '').call
# => Logged invalid login attempt: LoginUserService::EmptyEmailError - email is empty
LoginUserService.new(email: 'ok@email.com').call
# => login ok
LoginUserService.new(email: nil).call
# => Field is empty: BaseService::FieldIsNilError - email is nil
LoginUserService.new(email: 'kill -9').call
# => throw out (LoginUserService::SecurityError)
```

The main trick here is in the `include ActiveSupport::Rescuable`. It provides us with the `rescue_from`
method, defined at the class level. It also adds `rescue_with_handler`, which tries to find a handler for a raised exception and calls it if found. The handler is defined with `rescue_from` in a service object — it's just a block. We use this in `call_with_rescue`, which wraps the method that does the real work and may raise an exception (`useful_yield`).
The exception can be caught with `rescue_from`, and some useful work can be done while suppressing the error. Or it will propagate, and an end user will see it if we don't have a rescue handler defined for
this exception.

Now let's experiment with this code. Put it in a `test.rb` file in a Rails application and execute it with [rails runner](http://guides.rubyonrails.org/command_line.html#rails-runner) using this command: `rails runner test.rb`. You will get output similar to this:

```
Logged invalid login attempt: LoginUserService::InvalidEmailError - email is invalid
Logged invalid login attempt: LoginUserService::EmptyEmailError - email is empty
login ok
Field is empty: BaseService::FieldIsNilError - email is nil
test.rb:49:in `useful_yield': throw out (LoginUserService::SecurityError)
```

If you feel uncomfortable at this point, you can change the code and rerun it with rails runner. It's rather easy, as you can see. Or just comment on this post. I would be glad to hear your feedback and questions.


## Conclusion

Try to understand how interesting things you would like in your code are implemented, and reuse
the implementation. But note that sometimes it's easier to implement things yourself
from scratch. There may be many reasons: code quality, missing functionality that can't be
added easily and so on. Every case should be analyzed, and the correct decision made. But that doesn't apply
here. `ActiveSupport::Rescuable` does its work gracefully.
