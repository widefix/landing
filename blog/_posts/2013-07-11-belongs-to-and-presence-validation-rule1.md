---
layout: post
title: "Rule #1 for using belongs_to with a presence validator"
description: "This post describes rules of thumb for using a presence validator for a belongs_to association in Rails. Do you know what to pass to validates (or validate_presence_of) for a belongs_to association? You will find out in this post."
tags: [rails, validator]
share: true
comments: true
redirect_from:
  - /blog/2013/07/11/belongs-to-and-presence-validation-rule1/
---


I've always wondered which argument to pass to the validates method for a model that has a *belongs_to* association: the *association name* or the *field name* (Rails calls it a foreign_key). Do you know? Have you ever been asked this question? I know the answer, and of course I will share my idea with you in this post.

## Association name or foreign key?

Assume we have two models: `Account` and `User`. An account has many users, and a user belongs to an account. Here is the code:

{% highlight ruby %}
class Account < ActiveRecord::Base
  has_one :user
end

class User < ActiveRecord::Base
  belongs_to :account
end
{% endhighlight %}

We want to add validation for the user to check whether the account is present. This can be achieved in two ways:

* We can add a presence validator for the association name to the User class:

{% highlight ruby %}
class User < ActiveRecord::Base
  belongs_to :account
  validates :account, :presence => true
end
{% endhighlight %}

* Or we can add a presence validator for the foreign key:

{% highlight ruby %}
class User < ActiveRecord::Base
  belongs_to :account
  validates :account_id, :presence => true
end
{% endhighlight %}

Which way do you use? Do you know the difference between them? Let's check it in the Rails console.

### 1.1. Foreign key way

{% highlight ruby %}
class User < ActiveRecord::Base
  belongs_to :account
  validates :account_id, :presence => true
end
{% endhighlight %}

{% highlight ruby %}
irb(main):001:0> Account.destroy_all # Destroy all accounts in the DB
irb(main):002:0> Account.create(:id => 1)
irb(main):003:0> u = User.new(:account_id => 100)
irb(main):004:0> u.valid? # => true
irb(main):005:0> Account.exists?(100) # => nil - make sure that there is no account with id = 100
{% endhighlight %}

This test shows us one thing: the presence validator for a foreign key doesn't care whether the record exists. It means that you can pass *account_id* from a form (or API, for example) with any value, and ActiveRecord will save it silently. It's obvious that this is a hole in the application! Let's now see what happens with the second approach.

### Association name way

{% highlight ruby %}
class User < ActiveRecord::Base
  belongs_to :account
  validates :account, :presence => true
end
{% endhighlight %}

{% highlight ruby %}
irb(main):001:0> Account.destroy_all
irb(main):002:0> Account.create(:id => 1)
irb(main):003:0> u = User.new(:account_id => 100)
irb(main):004:0> u.valid? # => false
irb(main):005:0> Account.exists?(100) # => nil
irb(main):006:0> u.errors.full_messages # => ["Account can't be blank"]
irb(main):007:0> u.account_id = 1 # => 1
irb(main):008:0> u.valid? # => true
irb(main):009:0> u.account_id = nil
irb(main):010:0> u.save # => false
irb(main):026:0> u.account = Account.new
irb(main):026:0> u.save # => true - this record has saved because account doesn't have validations at all. If it had the user wouldn't be saved never!
{% endhighlight %}

This approach is obviously more robust — this validation checks that the associated object exists, that the foreign key is present, and also automatically validates the associated object.

### Conclusion

As you can see, the 1st approach can introduce a security issue and database inconsistency. So the answer is the following: **use the *association name* for the presence validator.**
