---
layout: post
title: "Clean up your controllers with inherited resources"
description: "This post describes how to use one of the best Rails tools: the inherited_resources gem. Learn how it can help you spend less time and have fewer bugs in your Rails code. I hope this technique will be useful for all Rails developers."
tags: [rails, gem, rest, refactoring]
share: true
comments: true
redirect_from:
  - /blog/2012/10/25/clean-up-controllers-with-inherited-resources/
---


If you haven't noticed yet that a main rule in Rails development is not to complicate controller logic, I recommend reading these articles:

* [Skinny controller, fat model](http://weblog.jamisbuck.org/2006/10/18/skinny-controller-fat-model)
* [Rails Model View Controller + Presenter?](http://blog.jayfields.com/2006/09/rails-model-view-controller-presenter.html)

This post assumes that you already know this truth, so it's not necessary to clarify it for you. I also assume that you know what [REST](https://peepcode.com/products/rest-for-rails-2) is and that you should follow [RESTful](https://peepcode.com/products/rest-for-rails-2) rules. I will show you how to avoid writing boring, repetitive code in controllers.

## Boring code

Imagine you have a controller:

{% highlight ruby %}
class ChannelsController < ApplicationController
  def index
    @channels = current_user.channels
    respond_with(@channels)
  end

  def new
    @channel = current_user.channels.build
    respond_with(@channel)
  end

  def create
    @channel = current_user.channels.build(params[:channel])
    @channel.save
    respond_with(@channel)
  end

  def show
    @channel = current_user.channels.find(params[:id])
    respond_with(@channel)
  end

  def edit
    @channel = current_user.channels.find(params[:id])
    respond_with(@channel)
  end

  def update
    @channel = current_user.channels.find(params[:id])
    @channel.update_attributes(params[:channel])
    respond_with(@channel)
  end

  private
  def current_user
    @current_user ||= User.find(params[:user_id])
  end
end
{% endhighlight %}

This code looks pretty nice. But it contains a lot of repetitive code, such as `current_user.channels.find(params[:id])`, `respond_with` and so on. Of course, you can write before filters to avoid this repetition:

{% highlight ruby %}
class ChannelsController < ApplicationController
  before_filter :find_channel, :only => [:edit, :show, :update]

  def index
    @channels = current_user.channels
    respond_with(@channels)
  end

  def new
    @channel = current_user.channels.build
    respond_with(@channel)
  end

  def create
    @channel = current_user.channels.build(params[:channel])
    @channel.save
    respond_with(@channel)
  end

  def show
    respond_with(@channel)
  end

  def edit
    respond_with(@channel)
  end

  def update
    @channel.update_attributes(params[:channel])
    respond_with(@channel)
  end

  private
  def find_channel
    @channel = current_user.channels.find(params[:id])
  end

  def current_user
    @current_user ||= User.find(params[:user_id])
  end
end
{% endhighlight %}

Looks better, yes? But it's possible to write all this functionality in 3 (!!!) lines. Check it out:

{% highlight ruby %}
class ChannelsController < InheritedResources::Base
  belong_to :user
end
{% endhighlight %}

So there is no boring code. It's a really clean controller, and you can feel confident that it doesn't contain any bugs, your views work as before, and you don't have to change anything there.
If you are interested, just insert this line into your *Gemfile*:

    gem 'inherited_resources'

and that's it. Note that you have to inherit your controllers from `InheritedResources::Base`, not `ApplicationController`.

## Complicated logic

Maybe you've noticed that `ChannelsController` had a private method:

    def current_user
      @current_user ||= User.find(params[:user_id])
    end

which gets current_user for each request. This controller also requires the *:user_id* parameter. It listens to the following routes:

           user_channels GET    /users/:user_id/channels(.:format)              channels#index
                         POST   /users/:user_id/channels(.:format)              channels#create
        new_user_channel GET    /users/:user_id/channels/new(.:format)          channels#new
       edit_user_channel GET    /users/:user_id/channels/:id/edit(.:format)     channels#edit
            user_channel GET    /users/:user_id/channels/:id(.:format)          channels#show
                         PUT    /users/:user_id/channels/:id(.:format)          channels#update
                         DELETE /users/:user_id/channels/:id(.:format)          channels#destroy

But what if you don't want to pass :user_id to every call, and all channels should be scoped to current_user? Here, `current_user` is a helper method in `ApplicationController` that holds the signed-in user. This isn't a problem for the `inherited_resources` gem either:

{% highlight ruby %}
class ChannelsController < InheritedResources::Base

  protected
  def begin_of_association_chain
    @begin_of_association_chain ||= current_user
  end
end
{% endhighlight %}

This will be enough to get a working controller for our needs. Now you can change your routes:

           user_channels GET    /user/channels(.:format)              channels#index
                         POST   /user/channels(.:format)              channels#create
        new_user_channel GET    /user/channels/new(.:format)          channels#new
       edit_user_channel GET    /user/channels/:id/edit(.:format)     channels#edit
            user_channel GET    /user/channels/:id(.:format)          channels#show
                         PUT    /user/channels/:id(.:format)          channels#update
                         DELETE /user/channels/:id(.:format)          channels#destroy

Let's complicate the logic and rework our controller to listen to both sets of routes:

           user_channels GET    /user/channels(.:format)              channels#index
                         POST   /user/channels(.:format)              channels#create
        new_user_channel GET    /user/channels/new(.:format)          channels#new
       edit_user_channel GET    /user/channels/:id/edit(.:format)     channels#edit
            user_channel GET    /user/channels/:id(.:format)          channels#show
                         PUT    /user/channels/:id(.:format)          channels#update
                         DELETE /user/channels/:id(.:format)          channels#destroy
           user_channels GET    /users/:user_id/channels(.:format)              channels#index
                         POST   /users/:user_id/channels(.:format)              channels#create
        new_user_channel GET    /users/:user_id/channels/new(.:format)          channels#new
       edit_user_channel GET    /users/:user_id/channels/:id/edit(.:format)     channels#edit
            user_channel GET    /users/:user_id/channels/:id(.:format)          channels#show
                         PUT    /users/:user_id/channels/:id(.:format)          channels#update
                         DELETE /users/:user_id/channels/:id(.:format)          channels#destroy

How do we change our `ChannelController`? Very simply:

{% highlight ruby %}
class ChannelsController < InheritedResources::Base

  protected
  def begin_of_association_chain
    @begin_of_association_chain ||= (User.find_by_id(params[:user_id]) || current_user) || raise(ActiveRecord::RecordNotFound)
  end
end
{% endhighlight %}

This way, we have a universal RESTful controller in 6 lines of code instead of 100 or maybe 200.

## Resources

Check out the [InheritedResources gem](https://github.com/josevalim/inherited_resources) and read its README. I promise you will find a lot of interesting information there that I've omitted in my post. The README doesn't cover all the possibilities either, so I would recommend reading the source.

I hope you don't blame me for the time you spent. Thank you for reading!

PS. *InheritedResources* is compatible with [cancan](https://github.com/ryanb/cancan/wiki/Inherited-Resources). You have to add one line of code, `load_and_authorize_resource`, and your restrictions will work exactly as you want.
