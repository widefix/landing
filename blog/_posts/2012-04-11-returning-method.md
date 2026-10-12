---
layout: post
title: "Returning method"
description: "Ruby on Rails has a beautiful method that can help you clean up your code: the returning method."
tags: [ruby, rails]
share: true
comments: true
redirect_from:
  - /blog/2012/04/11/returning-method/
---


Have you ever written code in **Ruby on Rails** for these use cases?

1. Initialize an **object** that will contain the **result** of the method (**the resulting object**).
2. Change **the resulting object** with some operations, where the last operation might return **nil**.
3. Return **the resulting object** from the first step. You should do this because you have to return the object you manipulated, i.e. **the resulting object**, rather than the result of the last operation.

> There are a lot of 'the resulting object' references, aren't there?

If your answer is *yes* this post is especially for you.

# How can we clean up the code?

Assume that you have a method like the one I described above:

{% highlight ruby %}
def my_action
  res = []
  res << 'item 1'
  res << 'item 2'
  #…some code like two lines above
  res << 'item n'
  res
end
{% endhighlight %}

There is a perfect method in Ruby on Rails — **returning**. According to **rdoc**, we can clean up our code like this:

{% highlight ruby %}
def my_action
  returning res = [] do
    res << 'item 1'
    res << 'item 2'
    #…some code like two lines above
    res << 'item n'
  end
end
{% endhighlight %}

or like this:

{% highlight ruby %}
def my_action
  returning [] do |res|
    res << 'item 1'
    res << 'item 2'
    #…some code like two lines above
    res << 'item n'
  end
end
{% endhighlight %}

The result of **my_action** will be the modified array. It doesn't matter which approach you use: the first or the second.
Choose whichever one you like. This code looks a little better than the repetitive code we had before.

## Fail

But there is one *pitfall*. Let's try to use it like this:

{% highlight ruby %}
class Order < ActiveRecord::Base
  # ...
  def self.search(params)
    returning orders = self do
      orders = orders.scoped(:conditions => {:service_type => params[:service_type]}) if params[:service_type].present?
      orders = orders.scoped(:conditions => ['orders.created_at >= ?', params[:date_range_start]]) if params[:date_range_start].present?
      orders = orders.scoped(:conditions => ['orders.created_at <= ?', params[:date_range_end]]) if params[:date_range_end].present?
    end
  end
  # ...
end
{% endhighlight %}

You will be surprised that it doesn't work like the code in *my_action*! We have changed the **reference** for the local object **orders**. That's why we will get an unexpected result: **self** instead of the scope object (assume we passed the **:service_type** parameter, for instance, i.e. we called *Order.search(:service_type => 'test')*). We can use **returning** here, so the correct code should be this:

{% highlight ruby %}
# ...
def self.search(params)
  orders = self
  orders = orders.scoped(:conditions => {:service_type => params[:service_type]}) if params[:service_type].present?
  orders = orders.scoped(:conditions => ['orders.created_at >= ?', params[:date_range_start]]) if params[:date_range_start].present?
  orders = orders.scoped(:conditions => ['orders.created_at <= ?', params[:date_range_end]]) if params[:date_range_end].present?
  orders
end
# ...
{% endhighlight %}

## Conclusion

So the conclusion of this post is to use **returning** when you initialize an object, make some changes and then return it. But be attentive: **If you change the reference from the returning object to a new object, the result will still be the old one.**

> Attention! The returning method is provided ONLY by Ruby on Rails, NOT Ruby!
