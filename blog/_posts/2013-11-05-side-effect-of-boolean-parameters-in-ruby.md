---
layout: post
title: "A side effect of boolean parameters in Ruby"
description: "This post describes a side effect of having boolean arguments in Ruby methods. It shows how this can be elegant and confusing at the same time."
tags: [ruby]
share: true
comments: true
redirect_from:
  - /blog/2013/11/05/side-effect-of-boolean-parameters-in-ruby/
---


In this post, I will show you how confusing it can be to have a method that accepts boolean variables. The alternative approach is a little more complicated but much more robust and can be acceptable in applications with high security requirements.

## The problem

Say we have a method, `destroy`, that accepts a boolean argument, `forced`, which says how to destroy the object:

{% highlight ruby %}
def destroy(forced = false)
  forced ? forced_destroy : soft_destroy
end
{% endhighlight %}

And here are simplified versions of the `forced_destroy` and `soft_destroy` methods, respectively:

{% highlight ruby %}
def forced_destroy
  puts 'forced destroy...'
end

def soft_destroy
  puts 'soft destroy...'
end
{% endhighlight %}

At first glance, this code looks precise and doesn't have any pitfalls or side effects. We can use it rather simply and get the behavior we expect from this method:

{% highlight ruby %}
>> destroy(true)  # => forced destroy...
>> destroy(false) # => soft destroy...
{% endhighlight %}

But because of *Ruby*'s typeless nature, we can actually pass an argument of any type to the method. Knowing that *Ruby* treats `nil` as `false` and any other value as `true`, we will have this behavior:

{% highlight ruby %}
>> destroy(:forced) # => forced destroy...
>> destroy(nil)     # => soft destroy...
>> destroy(:soft)   # => forced destroy...
{% endhighlight %}

So here is a Ruby side effect or feature (who knows). On the one hand, it's convenient — we can have readable code (look at `destroy(:forced)`). But on the other hand, we can't pass a human-readable `:soft` argument there. Actually, it's possible, but as you can see, we get behavior a human wouldn't expect. Also, if you prefer to use this Ruby feature, you have to be prepared for changes: what will happen if the `destroy` method's implementation changes in the future to something like this?

{% highlight ruby %}
def destroy(forced = false)
  forced == true ? forced_destroy : soft_destroy
end
{% endhighlight %}

The code where you call `destroy(:forced)` will fail, and this can happen in many places. Some time ago, I saw this ability used in `ActiveRecord` for an internal feature. It's really confusing when you see it for the first time. Avoid this approach.

But the code `destroy(true)` or `destroy(false)` looks confusing. What do `true` and `false` mean here? To be completely sure, you have to read the method's documentation or implementation every time you use it. It looks like a boring way.

## Escape

I see only one solution to avoid pitfalls and misconceptions: use Hash options.

{% highlight ruby %}
def destroy(options = {:forced => false})
  # set to false if there is no passed `:forced` option and translate it to the boolean variable
  forced = options.fetch(:forced) { false }

  raise ArgumentError, ':forced option should be true or false' unless [true, false].include?(forced)

  forced ? forced_destroy : soft_destroy
end
{% endhighlight %}

This way, we can call the method with human-readable code: `destroy(:forced => true)` or `destroy(:forced => false)`. To avoid collisions, I filtered the `:forced` option to accept only `true` or `false`. That amounts to replacing a typeless language with a statically typed one like Java. If you have code like this in your application, it's a sign to refactor it or change the application's architecture.

So the preferable variant is this:

{% highlight ruby %}
def destroy(options = {:forced => false})
  options[:forced] ? forced_destroy : soft_destroy
end
{% endhighlight %}

It looks like the first variant but method calls are more readable: `destroy(:forced => true)` or `destroy(:forced => false)`.

## Conclusion

Just remember boolean arguments in Ruby and their side effects. Write concise, readable code, and someone will thank you for it someday.
