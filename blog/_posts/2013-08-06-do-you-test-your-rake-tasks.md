---
layout: post
title: "Do you test your Rake tasks?"
description: "This post explains how to test custom Rake tasks in a Rails application."
tags: [rails, rake, rspec]
share: true
comments: true
redirect_from:
  - /blog/2013/08/06/do-you-test-your-rake-tasks/
---


I think that many of you think writing tests for custom Rake tasks is redundant.
But as practice shows, if you think so, you are wrong.
In this post I will show how to test **custom rake tasks**.

# Issue

Assume that we have a **Rake task**, for example *products:load*, and you can run it from the terminal with the following command: `rake products:load`.
At first glance, you could test it manually when running `spec`, or you could configure the default Rake task to run RSpec and this task.
But the 1st approach has a side effect: your Rake task will always populate the database with products. We don't want to do that; we just want to make sure that the task works.
The 2nd approach looks more robust, but if you use the default Rake task for other things, it's definitely not your choice. I prefer to test Rake tasks with **RSpec**.

# Solution

Check out **rspec test** below:

{% highlight ruby %}
require 'spec_helper'
require 'rake'

describe 'db:seeds' do
  before { MyApp::Application.load_tasks }

  it { expect { Rake::Task['products:load'].invoke }.not_to raise_exception }
end
{% endhighlight %}

**MyApp::Application** is my application name; you can get it from `config/application.rb`:

{% highlight ruby %}
module MyApp
  class Application < Rails::Application
    ...
  end
end
{% endhighlight %}

I hope this code doesn't require a deeper explanation and the other lines are clear to you.
