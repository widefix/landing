---
layout: post
title: "Rails 3 does not render a partial for a specific format — resolving the issue"
description: "There is a problem in Rails 3: if you want to render a partial in HTML format in an AJAX request, you won't be able to. In this post, I describe how to avoid this problem."
tags: [rails3, render]
share: true
comments: true
redirect_from:
  - /blog/2012/08/29/rails3-does-not-render-partial-for-specific-format/
---


## Problem

For example, you make an AJAX request to the server in JSON format. Assume we have to render a partial in the controller or view and return it in a JSON object. In the view, you may have code like this:

+ *Rails3 view*
{% highlight ruby %}
<%= {:form => render('form')}.to_json %>
{% endhighlight %}

In Rails 2, you could pass the format as an option to the render function, and it fixed the problem:

+ *Rails2 view*
{% highlight ruby %}
<%= {:form => render(:partial => 'form', :format => :html)}.to_json %>
{% endhighlight %}

But in Rails 2, this is not working. There is a fix for this issue, and it has been merged into master. So in Rails 4, it will indeed work, and the method signature will look like this:

+ *Rails4 view*
{% highlight ruby %}
<%= {:form => render(:partial => 'form', :formats => [:html])}.to_json %>
{% endhighlight %}

To enable this feature in Rails 3, you can make a monkey patch: just create a new file, *config/initializers/renderer.rb*, in your application and paste this code there:

+ *Monkey patch for Rails 3*
{% highlight ruby %}
class ActionView::PartialRenderer
  private
  def setup_with_formats(context, options, block)
    formats = Array(options[:formats])
    @lookup_context.formats = formats | @lookup_context.formats
    setup_without_formats(context, options, block)
  end

  alias_method_chain :setup, :formats
end
{% endhighlight %}
