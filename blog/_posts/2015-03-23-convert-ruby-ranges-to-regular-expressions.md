---
layout: post
title: "Convert Ruby ranges to regular expressions"
description: "In this post, I share a gem that lets you convert Ruby ranges to regular expressions."
tags: [ruby, gem]
share: true
comments: true
---
Recently, I noticed that there is no Ruby library for converting Ruby ranges to regular expressions. That's why I decided to write it myself. This post simply shares the gem's link and a few examples of how to use it.

## Problem

Assume you have a Ruby **range** and have to transform it into a **regular expression**. Say you have `-9..9` and need `/-[1-9]|\d/`. At first glance, the solution looks rather easy, but getting an optimized solution takes a lot of time if you don't know an algorithm for doing it.

Recently, I had to solve an issue like this, and honestly, I couldn't do it in 2 hours. Then I started searching Google for a ready-made solution and finally found an implementation in Python. Thanks to my curiosity, I had already learned Python and managed to translate the algorithm into Ruby within 1 hour. Finally, I released a gem with the algorithm.

So if you have this issue, the gem may be helpful for you.

## Solution

The gem is called `range_regexp` and is located [here](https://github.com/ka8725/range_regexp).

Here are a few examples of its use:

{% highlight ruby %}
require 'range_regexp'
converter = RangeRegexp::Converter.new(-9..9)
converter.convert # => /-[1-9]|\d/
converter = RangeRegexp::Converter.new(12..3456)
converter.convert # =>/1[2-9]|[2-9]\d|[1-9]\d{2}|[1-2]\d{3}|3[0-3]\d{2}|34[0-4]\d|345[0-6]/
{% endhighlight %}

## Conclusion

Now we can convert ranges to regular expressions easily using Ruby. You don't have to reinvent the wheel; just get the gem and use it. If you have any suggestions or questions, feel free to contact me.
