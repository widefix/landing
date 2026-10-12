---
layout: post
title: "How to generate a Rake task"
headline: "An easy way to create your own Rake task"
description: "Generate a Rake task with bin/rails generate task namespace task1 task2, add Ruby code, and run it in your Rails app."
tags: [ruby, rails, rake]
share: true
featured_post: false
comments: true
image: rake-task.jpg
redirect_from:
  - /blog/2012/03/14/how-to-generate-rake-task/
modified: 2026-10-11
tested_with: "Rails 8.1.0 and Ruby 3.4.9"
related_posts:
  - /do-you-test-your-rake-tasks/
  - /do-not-generate-trash-with-rails/
---

TL;DR: from your Rails application's root, run `bin/rails generate task my_namespace my_task1 my_task2`. Add code to the generated tasks, then execute one with `bin/rails my_namespace:my_task1`.

I’m [Andrei Kaleshka]({{ site.url }}/about-author/), a Rails developer and the author of **Rake Task Management Essentials**. I originally wrote this article in 2012 after finding Rails' task generator. Here is a complete example you can try in your own app.

## Generate a Rake task

You can write a `.rake` file yourself, copy an existing task, or let Rails generate the skeleton:

```shell
bin/rails generate task greetings hello goodbye
```

The shorter form, `bin/rails g task greetings hello goodbye`, does the same thing. `greetings` is the namespace; `hello` and `goodbye` are task names. Rails creates `lib/tasks/greetings.rake`:

```ruby
namespace :greetings do
  desc "TODO"
  task hello: :environment do
  end

  desc "TODO"
  task goodbye: :environment do
  end
end
```

## Add code and run it

Replace the placeholders with descriptions and a little Ruby:

```ruby
namespace :greetings do
  desc "Print a greeting"
  task hello: :environment do
    puts "Hello from #{Rails.application.class.module_parent_name}!"
  end

  desc "Print a farewell"
  task goodbye: :environment do
    puts "Goodbye!"
  end
end
```

Run the first task from the application root:

```shell
bin/rails greetings:hello
```

In an app named `TaskDemo`, this prints:

```text
Hello from TaskDemo!
```

Run `bin/rails greetings:goodbye` to print `Goodbye!`. You can also execute these tasks with `bundle exec rake greetings:hello` or `bundle exec rake greetings:goodbye`.

### What does `:environment` do?

`task hello: :environment` makes Rails' `environment` task a prerequisite. It loads your application before the task body runs, so you can use application classes, models, and database queries. The greeting uses it to access `Rails.application`.

For a task that only uses plain Ruby, you can omit that prerequisite. For example, `task :goodbye do` is enough for the farewell above. Keep task bodies small: when the work grows, put the logic in an application class and call it from the task.

## List your tasks

To list the tasks in this namespace:

```shell
bin/rails -T greetings
```

The list includes the descriptions you supplied:

```text
bin/rails greetings:goodbye  # Print a farewell
bin/rails greetings:hello    # Print a greeting
```

`-T` lists tasks with a `desc`; an executable task without a description can be missing from this list. Use `bundle exec rake -T -A greetings` to include tasks without descriptions. Listing a task does not execute its body; run its full `namespace:task` name to do that.

See the [Rails command-line guide](https://guides.rubyonrails.org/v8.1/command_line.html#custom-rake-tasks) and [Rake command-line reference](https://ruby.github.io/rake/doc/command_line_usage_rdoc.html) for more details.

## Learning more

{% picture /images/rake_book.jpg alt="Rake Task Management Essentials" align="left" vspace="5" hspace="5" width="100" style="margin-right: 24px;" %}

My book, **Rake Task Management Essentials**, covers Rake through practical examples. You can find it at [Packt](https://www.packtpub.com/product/rake-task-management-essentials/9781783280773){:rel="nofollow" target="_blank"}.
