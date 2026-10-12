---
layout: post
title: "How to deploy Redmine to Heroku"
description: "This post describes how to deploy the free bug tracker Redmine 2 to free hosting on Heroku."
tags: [heroku, redmine, rails, hosting]
share: true
comments: true
redirect_from:
  - /blog/2012/04/28/how-to-deploy-redmine-to-heroku/
---


This post describes how to deploy an absolutely free bug tracker — **Redmine** — to free hosting on **Heroku**. That way, you will have a free bug tracker on the internet. There are many posts on the internet that describe how to deploy older versions of **Redmine** to **Heroku**, but I couldn't find any information on how to deploy the new version: **Redmine 2**. So if you have the same problem, you are welcome!

## Changes for Heroku

> NOTE: This manual applies only to Redmine version 2.2.2. There are a lot of changes in the next release, which I think will be 2.2.3.

So let's go! Firstly, we need to clone the source from **github**:

    wget https://github.com/edavis10/redmine/archive/2.2.2.tar.gz
    tar -zxvf 2.2.2.tar.gz
    cd redmine-2.2.2
    git init .

Open the *.gitignore* file in your favourite editor and remove these lines:

	Gemfile.lock
	Gemfile.local
	public/plugin_assets
	config/initializers/session_store.rb
	config/initializers/secret_token.rb
	config/configuration.yml
	config/email.yml

Install gems:

	bundle install

Execute the Rake task to generate a session token:

	rake generate_secret_token

Create an application on heroku:

	heroku create NAME_FOR_YOUR_APP

Make a commit and push the changes to the heroku origin:

	git add -A
	git commit -m "prepare for heroku"
	git push heroku

Make sure that all gems were installed on the heroku server. Then run the migrations and load the default data so Redmine works properly:

	heroku run rake db:migrate
	heroku run rake redmine:load_default_data

That's all, you can test it now in the browser:

	heroku open

The default user for Redmine is **admin**, and the password is **admin** too.

## Email confirmations

Firstly, add an add-on to your application on heroku:

	heroku addons:add sendgrid:starter

There is a limitation for the free version of this add-on: *200 emails per day*. So if you send more emails per day, you have to change the add-on plan to a more appropriate one. For more information, please read the [add-on description](https://addons.heroku.com/sendgrid).

Create the *config/configuration.yml* file, add the following configuration and replace user_name and password with yours:

{% highlight ruby %}
production:
  delivery_method: :smtp
  smtp_settings:
    address: "smtp.sendgrid.net"
    port: 25
    authentication: :plain
    domain: "heroku.com"
    user_name: "SENDGRID_USERNAME"
    password: "SENDGRID_PASSWORD"
{% endhighlight %}

Push the changes to heroku:

	git add -A
	git commit -m "email configuration"
	gut push heroku

## Save uploaded files to Amazon S3

If you are going to add attachments to tasks or upload files to Redmine, you can set up the **redmine_s3** plugin: [http://github.com/ka8725/redmine_s3.git](http://github.com/ka8725/redmine_s3.git). Please follow the link to read the installation instructions. This is my fork of the original gem: **git://github.com/tigrish/redmine_s3.git**

> Since **Redmine 2** was released, there have been many changes, and **git://github.com/tigrish/redmine_s3.git** no longer works with it. That's why I forked this gem and changed it.

> Don't forget to remove the **plugins/redmine_s3/.git** directory before making a commit. Otherwise, this plugin won't be installed on **Heroku**, and you won't be able to save files to **s3**.

Create a configuration file for the *redmine_s3* gem:

    cp plugins/redmine_s3/config/s3.yml.example config/s3.yml

Edit *config/s3.yml* with your favourite editor: paste your AWS S3 credentials (security keys) and bucket name there. The bucket should already exist in S3.

Push changes to the heroku:

	git add -A
	git commit -m "s3 configuration"
	gut push heroku

To start the server on heroku, you should also remove or comment out this code in *config/environment.rb*:

{% highlight ruby %}
# Make sure there's no plugin in vendor/plugin before starting
vendor_plugins_dir = File.join(Rails.root, "vendor", "plugins")
if Dir.glob(File.join(vendor_plugins_dir, "*")).any?
  $stderr.puts "Plugins in vendor/plugins (#{vendor_plugins_dir}) are no longer allowed. " +
    "Please, put your Redmine plugins in the `plugins` directory at the root of your " +
    "Redmine directory (#{File.join(Rails.root, "plugins")})"
  exit 1
end
{% endhighlight %}

That's it — you have a free bug tracker on the internet. Check it out: [http://redmine-todo.heroku.com](http://redmine-todo.heroku.com).

## Conclusion

The combination of **Redmine** and **Heroku** is perfectly appropriate for developers who want to save money and have a good bug tracker. But if your project is open source and you don't need to hide it on the internet, you can use [free hosted redmine](http://www.hostedredmine.com/) or [Pivotal Tracker](https://www.pivotaltracker.com).
