---
layout: post
title: "Stub Rails ActiveRecord associations in your tests"
modified: 2018-11-27 00:41:06 +0300
description: "A technique for easily stubbing ActiveRecord associations to make your tests faster."
tags: [rails, active_record, rspec]
comments: true
share: true
---

Have you ever struggled with slow tests in your Rails application? Do you know why they were slow? Well, it may not seem obvious, but tests spend most of their time interacting with a database. We won't prove this here because it's quite a [well-known fact](https://evilmartians.com/chronicles/testprof-a-good-doctor-for-slow-ruby-tests), but we'll discuss a solution that may help in some circumstances.

### Problem

Suppose a Rails app uses RSpec for tests and a factory library (FactoryBot, for example) to create models in tests. Tests where models are created with factories are slow. We want to make them faster.

### Solution

There is advice on speeding up tests in this [article](https://evilmartians.com/chronicles/testprof-a-good-doctor-for-slow-ruby-tests). It's very helpful and, I must admit, works well. But what if we want faster tests for whatever reason? As already mentioned, tests are slow because they interact with a database. What can we do then? It's quite obvious: stub the code that calls the DB and call it a day. The only problem is that our app talks to the DB for two reasons: saving and reading data. These are different problems, each requiring a specific approach. Here, we discuss only the "read" situation. The "write" situation is left for the reader to think about.

We know they're slow because they touch the DB. But which code causes the issue? Let's first think about why we need real models when testing a decorator. You may argue, but as I see it, we usually need persisted models to satisfy a select from the DB — actually **scopes** or **associations** in the Rails model layer. So why not stub these things?

OK, we figured out that we need to stub associations and scopes in a decorator test. But how exactly? Suppose there's code deep in our models called by the decorator: we test `SubscriptionDecorator.new(subscription).active_users`, which turns into `subscription.users.active.verified` underneath. A stub like `allow(subscription).to receive(users).and_return([User.new])` won't work because it has no `active` or `verified` methods defined. So we need to stub it wisely. Here is what I suggest: create a clone of `ActiveRecord::Relation` that copies an association's behavior.

```ruby
class ActiveRecordRelationStub
  attr_reader :records
  alias to_a records

  # @param model_klass [ActiveRecord::Base] the stubbing association's class
  # @param records [Array] list of records the association holds
  # @param scopes [Array] list of stubbed scopes
  def initialize(model_klass, records, scopes: [])
    @records = records

    scopes.each do |scope|
      fail NotImplementedError, scope unless model_klass.respond_to?(scope)
      define_singleton_method(scope) do
        self
      end
    end
  end
end

```

Having this in place, we can stub our association and scope:

```ruby
user1 = build_stubbed(:user)
user2 = build_stubbed(:user)
allow(subscription).to receive(:users).and_return(ActiveRecordRelationStub.new(User, [user1, user2], scopes: [:active, :verified]))
```

In order to demonstrate how it works, for the sake of simplicity let's have our `SubscriptionDecorator` class defined in the following way:

```ruby
class SubscriptionDecorator
  # ... details are hidden here
  def active_users
    subscription.users.active.verified
  end
end
```

Now calling `SubscriptionDecorator.new(subscription).active_users` in tests returns the stubbed relation with the provided records, just as real models would behave. But keep in mind that we don't care here about how scopes (`verified` or `active`) are defined, what filters they use and so on. Their real behavior should be tested in the models where they're defined. In other words, at the decorator layer, we rely on the scope implementations and assume they work correctly and are well tested, so we can safely stub them. To avoid stubbing an undefined association, it's better to use [verifying partial doubles](https://relishapp.com/rspec/rspec-mocks/docs/verifying-doubles/partial-doubles). Used properly, RSpec checks whether a stubbed method is defined and raises an exception if not. So you learn about a typo or mistake and can fix it without waiting for a production error caused by relying on weak tests. I highly recommend turning this option on globally to be safe.


### Conclusion

I used this technique once, and it was pretty successful. I managed to make our tests much faster. Of course, this approach works not only for decorators, but also for view specs, controller specs and any place where you want to check **your** code rather than whether the DB works properly. But that's not the whole story. Aggregate functions, some filter methods and so on should also be defined. If this approach works for you, please comment on what functionality is missing [here](https://gist.github.com/ka8725/de9e6a87d83a0f58ad3e3ba20ebaf3ae).

### PS

If you still have questions after reading this article, like "Why should I care about test speed?" or "What other options exist?", please read [this article](https://evilmartians.com/chronicles/testprof-a-good-doctor-for-slow-ruby-tests) and especially the [TestProf](https://test-prof.evilmartians.io) docs.
