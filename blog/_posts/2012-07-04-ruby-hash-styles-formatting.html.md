---
layout: post
title: "Formatting Ruby hashes"
description: "Advice on how to improve hash formatting in Ruby/Ruby on Rails code."
tags: [ruby, rails, formatting]
share: true
comments: true
redirect_from:
  - /blog/2012/07/04/ruby-hash-styles-formatting.html
---


Have you ever felt annoyed when formatting hash keys and values in Ruby code? So have I. And I'm going to describe
how to improve it in this post.

## Formatting options

Assume we have to write a method, *build_location*, that receives a hash object with a lot of default parameters. So
in this case, we have a few ways to format this piece of code:

+ *Inline* (1)
{%  highlight ruby %}
def build_location(params = {:first_name => 'FirstName', :last_name => 'LastName', :address => 'DefaultValue', :phone => 'PhoneNumber', ...})
...
end
{% endhighlight %}

+ *Pure blocks* (2)
{% highlight ruby %}
def build_location(params = {:first_name => 'FirstName',
                             :last_name  => 'LastName',
                             :address    => 'DefaultValue',
                             :phone      => 'PhoneNumber', ...})
...
end
{% endhighlight %}

+ *Using begin-end Pairs (Braces) to Designate Block Boundaries* (3)
{% highlight ruby %}
def build_location(params = {
    :first_name => 'FirstName',
    :last_name  => 'LastName',
    :address    => 'DefaultValue',
    :phone      => 'PhoneNumber', ...
})
...
end
{% endhighlight %}

## Selection

Block #1 seems disgusting because we have an endless line of parameters. It is too difficult to find something in it or add a new parameter.
Block #2 looks rather pretty, but if you want to change a parameter name or add one, you will have to format them again. So this code is also
difficult to maintain. My choice is **#3**.

## The best one

In block **#3**, we have code that is easy to maintain. If we change the list of parameters or a name, we won't have to change the formatting of the hash parameters.
I would choose code like this not only for styling method parameters, but anywhere in the code where I have a hash with many parameters.
To confirm this assertion, let's try to change a parameter name and add a new one:

{% highlight ruby %}
def build_location(user, this_is_default_params = {
    :first_name => 'FirstName',
    :last_name  => 'LastName',
    :address    => 'DefaultValue',
    :phone      => 'PhoneNumber', ...
})
...
end
{% endhighlight %}

As you can see, I've changed only what I wanted without any regressions in my code's formatting.

# Additional resources

You can find a lot of code examples on this topic in the book [Code Complete, second edition](http://www.amazon.com/Code-Complete-ebook/dp/B004OR1XGK/ref=sr_1_7?ie=UTF8&qid=1341409481&sr=8-7&keywords=code+complete+2) by Steve McConnell.
This is a huge book, but it is very interesting and important, and contains a lot of coding advice. It is also on the list of books [every programmer must read](http://stackoverflow.com/questions/1711/what-is-the-single-most-influential-book-every-programmer-should-read). Thank you, Steve, for your hard work!
<dl class='figure'>
	{% picture /images/code_complete.jpg alt="Code Complete, second edition. By Steve McConell" %}
</dl>
