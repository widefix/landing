---
layout: post
title: "How to find the method definition in Ruby"
description: "This post describes how to get the location (file and line) where a method is defined, when this is impossible, and how to avoid losing that location."
tags: [ruby]
share: true
comments: true
redirect_from:
  - /blog/2013/09/19/find-method-source-location/
---


At first glance, finding a method definition seems rather easy. You know the object's class name, open the documentation for this class and read it. But in real life, it's not as simple as it seems. In Ruby, an object's method can be defined in many places: modules, inheritance, metaprogramming, extensions in other languages and so on. Imagine that you have installed a lot of gems in your application, and every gem can potentially define or redefine a method on any object. How do you find the method definition in this situation?

## Source location

Getting the location of a method definition is rather simple. Assume you have a class, `A`, defined in `a.rb` like this:

> a.rb

{% highlight ruby %}
class A
  def m
  end
end
{% endhighlight %}


In Ruby, each method is an object too, and you can get it using a method called `#method`. It returns an object of the `Method` class:

{% highlight ruby %}
m = A.new.method(:m) #=> #<Method: A#m>
{% endhighlight %}

An object of the `Method` class has a '#source_location' method, which returns the file and line where the method is defined:

{% highlight ruby %}
m.source_location #=> => ["/Users/ka8725/sl/a.rb", 2]
{% endhighlight %}

Now we know where the method is defined. Open this file and see how it's implemented. This method doesn't work for methods defined by extensions in other languages:

{% highlight ruby %}
{}.method(:[]).source_location #=> nil
{% endhighlight %}

And note that methods defined by metaprogramming can lose their source location too:

> b.rb

{% highlight ruby %}
class B
  class_eval <<-M
    def m
    end
  M
end

B.new.method(:m).source_location #=> ["(eval)", 1]
{% endhighlight %}

Avoid losing the line information this way:

> b.rb

{% highlight ruby %}
class B
  class_eval <<-M, __FILE__, __LINE__
    def m
    end
  M
end

B.new.method(:m).source_location #=> ["/Users/ka8725/sl/activebilling/b.rb", 5]
{% endhighlight %}


Feel free to use `#define_method` — it doesn't lose its source location. But if a method appears on an object with the help of `#method_missing`, it can't know anything about where it was defined.

## Practical application

Recently, I had a problem in our Rails application. I defined a `Resource` model, `ResourcesController` and, as usual, its routes. But there was a surprise when I opened a page containing this helper: `link_to 'Resource', resource_path(@resource)`. This code caused the exception `SystemStackError - stack level too deep`. Rather strange, isn't it? Going through the Rails source, I didn't find any collisions there, but finally, with the help of `Method#source_location`, I found the source of this method definition (it's the [inherited_resources](https://github.com/josevalim/inherited_resources) gem we use). As a result, I [patched this gem](https://github.com/josevalim/inherited_resources/pull/318). I would say the patch is good, but at least it looks logical.

## Conclusion

No doubt, the `Method#source_location` method is very helpful. But sometimes it can be useless. So the conclusion here is to avoid using `#method_missing` (there are many reasons to avoid it, and this is one of them).
