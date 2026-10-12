---
layout: post
title: "Don't generate trash with Rails generators"
description: "When you generate a controller in a Rails application, many unexpected files are generated with it. I like to disable this behavior right after generating an application. This post describes how to configure Rails to avoid generating trash."
tags: [rails]
share: true
comments: true
redirect_from:
  - /blog/2013/07/02/do-not-generate-trash-with-rails/
---


Let's assume that we have a Rails >= 3 application. When you generate a controller, a lot of trash appears in your application. I mean these things: helpers, assets (CSS and JS) and view tests. In 99% of cases, these files are waste and never used, so it's reasonable to disable their generation. It's very easy.

## Configure your application

Go to *config/application.rb* and paste these lines there:

{% highlight ruby %}
config.generators do |g|
  g.assets = false
  g.helper = false
  g.view_specs = false
end
{% endhighlight %}

These magic lines of code will get rid of the headache, and you will forget about removing this trash manually forever!

I also recommend not passing action names to the Rails controller generator because it automatically inserts routes that always change later.

Say we have run the command `rails g controller users new edit`. It will generate the following *trash*.

Example of generated routes:

{% highlight ruby %}
get "users/new"
get "users/edit"
{% endhighlight %}

It also generates tests that never remain in this form. In my opinion, it's more useful to have pending tests than tests that do nothing.

Example of generated tests for controller:

{% highlight ruby %}
require 'spec_helper'

describe LessonsController do

  describe "GET 'new'" do
    it "returns http success" do
      get 'new'
      response.should be_success
    end
  end

  describe "GET 'edit'" do
    it "returns http success" do
      get 'edit'
      response.should be_success
    end
  end

end
{% endhighlight %}

Thank you for your attention!
