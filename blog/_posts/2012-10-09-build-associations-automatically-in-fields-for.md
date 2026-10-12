---
layout: post
title: "Build associations automatically in fields_for helper"
description: "Check out my gem. It is an extension for the fields_for helper that lets you avoid boring code for creating associated objects in belongs_to and has_one associations."
tags: [rails, gem]
share: true
comments: true
redirect_from:
  - /blog/2012/10/09/build-associations-automatically-in-fields-for/
---


Assume you have code in your project like this:

{% highlight ruby %}
form_for :company do |f|
  f.fields_for(:user, f.object.user || f.object.build_user) do |ff|
    ff.text_field :name
{% endhighlight %}

With the [get_or_build](https://github.com/ka8725/get_or_build) gem, you can turn this code into the following:

{% highlight ruby %}
form_for :company do |f|
  f.fields_for(:user, :build_association => true) do |ff|
    ff.text_field :name
{% endhighlight %}

I hope you will enjoy this gem! Thank you for your attention!
