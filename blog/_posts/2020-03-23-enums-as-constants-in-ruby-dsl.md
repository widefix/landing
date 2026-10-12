---
layout: post
title: "Enums as constants in Ruby DSL"
modified: 2020-03-23 00:41:06 +0300
description: "The post provides a DSL that allows enum definitions as constants."
tags: [ruby, enums, DSL]
comments: true
share: true
---

Many Rails projects have a "constant" list of some predefined things, such as user roles, food categories, types of apartments, etc. These things are usually called "enums".
In the beginning, people prefer some easy implementation for that. For example, someone can use symbols, like `:admin` or `:leader` all over the application code.
And that's perfectly fine... until the time comes for changes. The business decides to rename `:admin` to `:superadmin`.
When trying to apply this change in the code the initial implementation might seem not so straightforward.
And the problem is that it's not enough just to rename `:admin` to `:superadmin` in all places.
`:admin` can be used in different contexts and might not mean a user role at all.
It might be something else, i.e. scope of a controller, or model, or ... you get the point, right?

If someone goes forward and does the rename, the whole application should be tested manually.
I don't think anyone in the world would be happy doing that, do you?

What to do then?

I suggest defining constants for these things called "enums" and keep them in their namespaces.
Check out the following Ruby snippet:


```ruby
module HasEnumConstants
  class ConstantsBuilder
    def initialize(namespace, const)
      @namespace = namespace
      @collection = @namespace.const_get(const)
    end

    def constant(name)
      val = name.to_s.downcase
      @collection.push(val)
      @namespace.const_set(name, val)
    end
  end

  # Introduces DSL for constants definition.
  # The all defined contants are put into the `collection` constant.
  #
  # Usage example:
  #   class User
  #     extend HasEnumConstants
  #
  #     constants_group :KINDS do
  #       constant :ADMIN
  #       constant :GUEST
  #     end
  #   end
  #   User::KINDS # => ['admin', 'guest']
  #   User::ADMIN # => 'admin'
  #   User::GUEST # => 'guest'
  def constants_group(collection, &block)
    const_set(collection, [])
    ConstantsBuilder.new(self, collection).instance_eval(&block)
    const_get(collection).freeze
  end
end
```

If `ApplicationRecord` uses it as below, all models obtain the DSL that allows enum definitions as constants:

```ruby
class ApplicationRecord
  extend HasEnumConstants
end
```

For example, the former `:admin` key could be defined on the `User` model like this:

```ruby
class User < ApplicationRecord
  constants_group :KINDS do
    constant :ADMIN
    constant :GUEST
  end
end
```

Feel how it works:

```ruby
> User::KINDS # => ['admin', 'guest']
> User::ADMIN # => 'admin'
> User::GUEST # => 'guest'
```

If we apply this practice, all the code that refers to `:admin` should refer to the constant `User::ADMIN`. Now that name is
pretty unique, as you can see (because it's scoped by `User`). The chance this thing may mean something else is minimized.

Consider there is a misspelling in the code, i.e. `User::AMDIN` instead of `User::ADMIN`.
If the code has good coverage, the code will fail immediately during the unit tests run with an adequate exception.
With that exception, it's very easy to understand what the problem is.
And this is why it's better than the built-in ActiveRecord enums. ActiveRecord enums are weaker in terms of strong types and preventing mistakes during the development process.
Basically, it's not much better than having just a bunch of unrelated symbols,
as in the example at the beginning of this post.

As one might notice, the module can be used by the other layers of a pure Ruby or Rails application, i.e. controllers, services, mailers, etc.

As practice shows, when it comes to production releases and maintenance, it's better to follow a practice like this as soon as possible.
