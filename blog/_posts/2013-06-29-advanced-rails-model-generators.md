---
layout: post
title: "Advanced Rails model generators"
description: "Check out how awesome Rails generators are. In this post, you will learn how to make full use of Rails model generators."
tags: [rails]
share: true
comments: true
redirect_from:
  - /blog/2013/06/29/advanced-rails-model-generators/
---


Some people advise against using Rails generators and suggest creating models, controllers and other things manually. I don't agree with them. My advice is to understand deeply how the generators work and then draw a conclusion.

In this post, I will describe the most commonly used and useful generator: the model generator. I bet that if you don't use Rails generators yet, this post will make you change how you work. Using Rails generators saves you time, increases productivity and helps you get consistent data for your application.

## Basic usage

Let's start with a simple example:

    $ rails g model user email

This command will generate a *user* model with an *email* field of type *string*, a migration that creates the *users* table, a model test and a factory (if you have it). You can generate a model with several fields like this:

    $ rails g model user first_name last_name email

This example will generate a model with 3 string fields: first_name, last_name and email.

If you want a model with a field of a type other than string, pass the type after the field name, separated by a colon. Example:

    $ rails g model user email age:integer

The whole list of available types:

    integer
    primary_key
    decimal
    float
    boolean
    binary
    string
    text
    date
    time
    datetime
    timestamp

You can pass the *--option* parameter to the generator. The generated class will inherit from the name you pass to achieve STI (single table inheritance):

    $ rails g model admin --parent user

This example generates a model:

{% highlight ruby %}
class Admin < User
end
{% endhighlight %}

An interesting fact: if you generate a model in a namespace by passing a name like *admin/user* or *Admin::User*:

    $ rails g model admin/user

you will get a generated model in *app/models/admin/user.rb* and a file, *app/models/admin.rb*, that defines the module. Let's look at the generated module's content:

{% highlight ruby %}
module Admin
  def self.table_name_prefix
    'admin_'
  end
end
{% endhighlight %}

It means that the generated table name for *Admin::User* starts with the prefix *admin_users*. This feature allows separate namespaced models in both Rails code and the DB schema. In my opinion, it is a very convenient and useful feature for applications with multiple modules.

## Advanced usage

Sometimes you have to add indexes for columns in your migration automatically. It's not a problem:

    $ rails g model user email:index location_id:integer:index

Or a unique index:

    $ rails g model user pseudo:string:uniq

Set a limit for integer, string, text and binary fields:

    $ rails generate model user pseudo:string{30}

Special syntax to generate decimal field with scale and precision:

    $ rails generate model product 'price:decimal{10,2}'

> Note that you have to wrap the parameter `price:decimal{10,2}` in quotes. It's vital, and the generator may behave incorrectly if you don't do it. A full explanation of this case is [here](https://github.com/rails/rails/pull/12642).

You can combine any single curly brace option with the index options:

    $ rails generate model user username:string{30}:uniq

And the last useful generator feature is the option to generate reference columns (fields used in Rails as foreign keys):

    $ rails generate model photo album:references

This command will generate a *photos* table with an integer field, *album_id*, and add an index for this field automatically. Confirm this by looking at the generated migration:

{% highlight ruby %}
class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.references :album

      t.timestamps
    end
    add_index :photos, :album_id
  end
end
{% endhighlight %}

For a polymorphic reference, use this syntax:

    $ rails generate model product supplier:references{polymorphic}

Polymorphic reference with indexes:

    $ rails generate model product supplier:references{polymorphic}:index


## Conclusion

As you can see, there are a lot of useful things in the Rails model generator that can decrease your development time. Thank you for reading this trolling post, but anyway, I hope you find it useful because I didn't find any similar post or literature that fully describes the Rails model generator.

PS. The foundation for this post came from [this](https://github.com/rails/rails/blob/master/railties/lib/rails/generators/rails/model/USAGE) Rails usage description, which is located only in the Rails source on GitHub.
