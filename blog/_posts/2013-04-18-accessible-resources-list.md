---
layout: post
title: "Accessible resources list - DRY solution for controllers"
description: "In this post, I describe a DRY solution for controller actions that return a list of scoped objects. In other words, I show how to avoid repetitive changes in controller actions like this: Model.where :active => true."
tags: [rails, cancan, refactoring, gem]
share: true
comments: true
redirect_from:
  - /blog/2013/04/18/accessible-resources-list/
---


Imagine that we have a *Trademarks* controller with an *index* action. But in this action, we shouldn't get all trademarks. Instead, we have to get all *active trademarks* that are *accessible to the current user only*. This is the challenge I'm going to solve here.

## The sledge-hammer

The simplest solution will be something like this:

{% highlight ruby %}
class TrademarksController < ApplicationController
  def index
    @trademarks = Trademark.where :active => true
  end
end
{% endhighlight %}

One day, we have to change our conditions for selecting trademarks:

{% highlight ruby %}
class TrademarksController < ApplicationController
  def index
    @trademarks = Trademark.where :active => true, :owner_id => current_user.id
  end
end
{% endhighlight %}

Of course, we can define a scope on the *Trademark* model, but this will not save us from changes in the controller — we may still need to edit the index action in the future. For example, we might have to combine two scopes there.

## DRY solution

There is a better solution that can help us avoid these repetitive tasks. It requires installing the *cancan* gem. I hope you don't hate this gem and can add it to the project.

So the first step, as you have already guessed, is to install *cancan* — add it to the *Gemfile* and install it by running *bundle install* in your terminal. Initialize it with *rails g cancan:ability*.

Open the */app/models/ability.rb* file and define the abilities there. Let's do it:


{% highlight ruby %}
class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    can :read, Trademark, :active => true, :owner_id => user.id
  end
end
{% endhighlight %}

Now we are at the last step. We have to refactor the controller — use the *accessible_by* method provided by *cancan*:

{% highlight ruby %}
class TrademarksController < ApplicationController
  def index
    @trademarks = Trademark.accessible_by(current_ability)
  end
end
{% endhighlight %}

The implementation of the *accessible_by* method is very simple:

{% highlight ruby %}
def accessible_by(ability, action = :index)
  ability.model_adapter(self, action).database_records
end
{% endhighlight %}

It just fetches records from the database according to the scopes specified in the abilities. Note that you can pass any action here, not only the index action as I did.

Here we are. The code in the controller action won't change as often as before. I think we have reduced the need for changes to this action as much as possible.

There is one constraint here — you cannot use abilities defined with blocks (please read this [doc](https://github.
com/ryanb/cancan/wiki/Defining-Abilities-with-Blocks) about how to define abilities).

The documentation for the Fetching Records technique is [here](https://github.com/ryanb/cancan/wiki/Fetching-Records).
