---
layout: post
title: "Pass variables to JavaScript with gon"
description: "This post describes how to enjoy using the gon gem. Gon lets you pass Ruby variables from the Rails server to JavaScript, but it can turn your controllers into huge monsters. I offer an interesting approach to avoid this."
tags: [gem, rails, javascript]
share: true
comments: true
redirect_from:
  - /blog/2012/11/06/pass-variables-to-javascript-in-rails-with-gon/
---


If you haven't noticed yet that there is a good solution for passing *Rails* variables from controllers to JavaScript, I will be happy to introduce you to [gon](https://github.com/gazay/gon). In this post, I will show how to use it with controller filters in a clean, DRY way. This approach will help you avoid turning controllers into big monsters.

## Using filters in controllers

If you don't know what controller filters are or how to use them, check out the [official documentation](http://guides.rubyonrails.org/action_controller_overview.html#filters). In our case, we have to know that filters can be applied to one action. Here is one way to use them:

{% highlight ruby %}
class ApplicationController < ActionController::Base
  before_filter LoginFilter
end

class LoginFilter
  def self.filter(controller)
    unless controller.send(:logged_in?)
      controller.flash[:error] = "You must be logged in"
      controller.redirect_to controller.new_login_url
    end
  end
end
{% endhighlight %}

## Using Gon

Say we have to pass a *location* model as a JSON object from the server side to the client side (from a Rails controller to JavaScript). With *gon*, we can reduce it to:

{% highlight ruby %}
class ProductsController < ApplicationController
  def show
    @product = Product.find(params[:id])
    gon.locations = @product.locations.as_json(:only => [:latitude, :longitude], :methods => [:address])
  end
end
{% endhighlight %}

Everything is OK, but if we have to pass a lot of variables to JavaScript, we will get a fat controller. Controllers aren't easy to test either. So my solution is to use `before_filter` here. Here is an example of a fat controller action:

{% highlight ruby %}
  def show
    gon.locations = @product.locations.as_json(:only => [:latitude, :longitude], :methods => [:address])
    gon.current_user = current_user.as_json(:only => [:email, :id])
    gon.redirect_path = users_path
    gon.global_variables = {
      :subdomain => @product.subdomain,
      :statistic => {
        :count_hints => @product.count_hints,
        :count_logins => current_user.count_logins
      }
    }
    gon.image_uploader = {
      :create_path => product_path(@product),
      :image_tempale => render_to_string(:partial => 'image')
    }
    # etc. and etc.
  end
{% endhighlight %}

This code looks too bad, and I don't know how you feel when you see it, but my brain explodes.

## Using Gon in a DRY way

So let's get down to business and do something with this piece of ugly code. Let's create a `LocationGonFilter` class and move it to the `app/filters` folder. You should create this folder if you don't have it.

{% highlight ruby %}
class LocationGonFilter
  def self.filter(controller)
    return unless controller.respond_to?(:gon)

    gon = controller.gon

    if resource = controller.send(:resource)
      if resource.respond_to?(:locations)
        gon.locations ||= []
        gon.locations |= resource.locations.as_json(:only => [:latitude, :longitude], :methods => [:address])
      end
    end
  end
end
{% endhighlight %}

After this we can refactor our controller:

{% highlight ruby %}
class ProductsController < ApplicationController
  before_filter LocationGonFilter, :only => [:show]

  def show
  end

  def resource
    @product ||= Product.find(params[:id])
  end
end
{% endhighlight %}

A test for this filter will look like this:

{% highlight ruby %}
require 'spec_helper'

describe LocationGonFilter do
  let(:controller) { double(:some_controller) }
  let(:gon) { double(:gon) }
  let(:resource) { double(:resource) }
  let(:locations) { [create(:location), create(:location, :address2 => 'suite 2')] }
  let(:json_locations) { locations.as_json(:only => [:latitude, :longitude], :methods => [:address]) }

  context :without_gon do
    it { expect { LocationGonFilter.filter(controller) }.to_not raise_error }
  end

  context :with_gon do
    before { controller.stub(:gon).and_return(gon) }
    before { gon.stub(:locations).and_return([]) }
    before { controller.stub(:resource).and_return(resource) }

    context :filter do
      it { expect { LocationGonFilter.filter(controller) }.to_not change(gon, :locations) }

      it do
        resource.stub(:locations).and_return(locations)
        gon.stub(:locations=) do |args|
          gon.stub(:locations).and_return(args)
        end
        LocationGonFilter.filter(controller)
        gon.locations.should eq(json_locations)
      end
    end
  end
end
{% endhighlight %}

> I'm using FactoryGirl here to create locations

PS. I believe that every class should be responsible for only one thing (this is the [Single Responsibility Principle (SRP)](http://en.wikipedia.org/wiki/Single_responsibility_principle)). In my post, I've explained how to achieve this for the controller layer. Filters are a separate layer, where we should filter parameters. Controllers should only listen for requests, pass the action to the lower layer (the model) and then respond to the request. They should not contain complicated logic.
