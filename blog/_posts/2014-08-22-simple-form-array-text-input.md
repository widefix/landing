---
layout: post
title: "Simple form array text input"
description: "Use simple_form to generate an array of text fields. Add a custom input for a PostgreSQL array in Rails."
tags: [rails, simpleform, array, postgresql, text, input]
share: true
comments: true
---

Since Rails 4 supports the PostgreSQL array type out of the box, it would be great to use it to receive an array of text fields from a client-side form (a collection of ZIP codes, for example) and pass it to a model. I love the [SimpleForm gem](https://github.com/plataformatec/simple_form) for generating forms in Rails, but it only lets you generate collections of radio buttons or checkboxes and unfortunately doesn't support this functionality. In this post, I will show how to solve the problem.

## Problem

This screenshot will explain what I have to do without any words:

{% picture /images/zips.jpg alt="Account and User relation" %}

In the database, I'm going to use [PostgreSQL arrays in ActiveRecord](http://blog.plataformatec.com.br/2014/07/rails-4-and-postgresql-arrays/) to save the data. But in the view, Rails doesn't provide a tool to generate these fields out of the box. So let's do it with SimpleForm.

## SimpleForm and custom inputs

It may not be a surprise to you, but SimpleForm lets us define our own [custom input](https://github.com/plataformatec/simple_form/wiki/Custom-inputs-examples). It's very easy: just define your own class inheriting from a base SimpleForm input and call it when generating inputs.

This is the custom attribute for the array input:

{% highlight ruby %}
class ArrayInput < SimpleForm::Inputs::StringInput
  def input
    input_html_options[:type] ||= input_type

    Array(object.public_send(attribute_name)).map do |array_el|
      @builder.text_field(nil, input_html_options.merge(value: array_el, name: "#{object_name}[#{attribute_name}][]"))
    end.join.html_safe
  end

  def input_type
    :text
  end
end
{% endhighlight %}

In the form use this example to generate a collection of text fields:

{% highlight ruby %}
form_for @location do |f|
  f.input :zips, as: :array
end
{% endhighlight %}

One note here: the `@location` object must have a `zips` attribute, and it should be an array. If you have a nonempty `zips` array, this piece of code will generate its entries in a form. If you have an empty array, you will have to think about initializing the attribute on the server before rendering the form.

All generated inputs will get a name like this: `location[zips][]`. They will all have the same name. The browser will join them together before sending them to the server. Rails will understand that this is an array of inputs because their names end with `[]`. Finally, you will get an array parameter in the controller's `params` object. This means you can get the values in a controller with this code: `params[:location][:zips]`.

We've just said that the browser joins parameters with the same name into one line. Here is an example of how they go to the server: `"location[zips][]=11111&location[zips][]=22222"`. Rails will parse them into a hash with the
`Rack::Utils.parse_nested_query` method. Let's summarize the process and see the results of parsing these attributes:

{% highlight ruby %}
$irb --simple-prompt
>> require 'rack'
=> true
>> Rack::Utils.parse_nested_query "location[zips][]=11111&location[zips][]=22222"
=> {"location"=>{"zips"=>["11111", "22222"]}}
{% endhighlight %}

If you use [StrongParameters](http://edgeapi.rubyonrails.org/classes/ActionController/StrongParameters.html) to filter parameters from a client, you may be interested in how to manage this. It's very simple: just don't forget to indicate that you expect an array rather than one attribute.

{% highlight ruby %}
params.require(:location).permit(zips: [])
{% endhighlight %}

Note that `[]` comes after `zips:` — it's important to write it like this. Otherwise (if you write `permit(:zips)`, for example), you will get an exception because an array comes from the server, but StrongParameters expects a single object with that definition.

> Implementing the "+Add another" link won't be described in this post because it's rather trivial. You will have to write a little JavaScript, and it's up to you.

Hope this article will help somebody.
