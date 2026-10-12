---
layout: post
title: "Rule #2 for validating the presence of a belongs_to association"
description: "Do you have trouble validating the presence of a belongs_to association when nested parameters come from a form? I recently had the same problem, and in this post I share how to tackle it."
tags: [rails, belongs_to, validator, nested_form]
share: true
comments: true
redirect_from:
  - /blog/2013/07/13/belongs-to-association-and-validate-presence-with-nested-attributes/
---


Recently, I've resolved one more problem concerning the presence validator and a *belongs_to* association. But it involves another thing: *accepts_nested_attributes*. Assume you have a nested form and the parent object doesn't exist yet. You can have this issue, and here I will show you how to fix it.

## Issue

Let's say we have the following models and their relationships:

{% highlight ruby %}
class Account
  has_one :user
  accepts_nested_attributes_for :user
end

class User
  belongs_to :account
  validates :account, :presence => true
end
{% endhighlight %}

Go to *rails console* and check the validator out:

{% highlight ruby %}
irb(main):001:0> params = {:account => {:user_attributes => {}}}
irb(main):002:0> a = Account.new(params[:account])
irb(main):003:0> a.valid? # => false
irb(main):004:0> a.errors.full_messages # => ["User account can't be blank"]
{% endhighlight %}

So this is our challenge: we can't save the account because the user can't pass validation, as the account (the parent model) doesn't exist yet! But removing the validator wouldn't be the right solution. Do you agree with me?


## Solution

The solution is very simple: just add one more option, *:inverse_of*, to *has_one* (or *has_many*, if that's what you have). With this option, *Rails* won't try to get the account from the database when the user is validated. The account will be retrieved from memory. If you aren't familiar with this option, I strongly recommend reading the official [Rails guide](http://guides.rubyonrails.org/association_basics.html#options-for-belongs-to-inverse-of).

So change the account model and try it:

{% highlight ruby %}
class Account
  has_one :user, :inverse_of => :account
  accepts_nested_attributes_for :user
end
{% endhighlight %}

{% highlight ruby %}
irb(main):001:0> params = {:account => {:user_attributes => {}}}
irb(main):002:0> a = Account.new(params[:account])
irb(main):003:0> a.valid? # => true
{% endhighlight %}

I hope this article was helpful for you.
