---
layout: post
title: "Environment variables in Rails"
description: "A post about defining ENV variables in Rails. It explains what ENV['FOG_PROVIDER'] means and how to configure Capistrano deployment with ENV variables."
tags: [rails, capistrano]
share: true
comments: true
redirect_from:
  - /blog/2013/02/15/how-to-define-environment-variables-in-rails/
---


When you see configuration examples in a gem's README like this:

> You can find this real example in the README of the awesome [assets_sync](https://github.com/rumblelabs/asset_sync) gem.

{% highlight ruby %}
AssetSync.configure do |config|
  config.fog_provider = 'AWS'
  config.fog_directory = ENV['FOG_DIRECTORY']
  config.aws_access_key_id = ENV['AWS_ACCESS_KEY_ID']
  config.aws_secret_access_key = ENV['AWS_SECRET_ACCESS_KEY']

  # Don't delete files from the store
  # config.existing_remote_files = "keep"
  #
  # Increase upload performance by configuring your region
  # config.fog_region = 'eu-west-1'
  #
  # Automatically replace files with their equivalent gzip compressed version
  # config.gzip_compression = true
  #
  # Use the Rails generated 'manifest.yml' file to produce the list of files to
  # upload instead of searching the assets directory.
  # config.manifest = true
  #
  # Fail silently.  Useful for environments such as Heroku
  # config.fail_silently = true
end
{% endhighlight %}

what do you think they are?
Where should you define `ENV['FOG_DIRECTORY']`? Should you define it in a shell script (like `~/.bashrc`, `~/.bash_profile`, `~/.profile` and so on), or maybe in `/etc/environment`? If you think so, I have to disappoint you — you are wrong!

## Challenge

Let's define the `FOG_DIRECTORY` variable in the `~/.bashrc` file:

> Note that if `~/.bashrc` includes the line `[ -z "$PS1" ] && return` or an equivalent, you have to define the variables above it.

{% highlight bash %}
export FOG_DIRECTORY=my-bucket-name
{% endhighlight %}

Then restart the shell and start the Rails application. You will see that the application is configured correctly. You enjoy it and plan to deploy the application to production on the VPS or VDS in the same way, and everything will work there... until the first reboot. Why is `ENV['FOG_DIRECTORY']` `nil` after the server reboots? The answer is simple — [nginx](http://nginx.org/) or another web server (I don't know which one you use, but I prefer **nginx**) starts before `~/.bashrc` and even `/etc/environment` are evaluated.

If you use [assets_sync](https://github.com/rumblelabs/asset_sync) to upload your assets to the **cloud**, you can get this error during deployment with [capistrano](https://github.com/capistrano/capistrano):

{% highlight ruby %}
AssetSync: using default configuration from built-in initializer
rake aborted!
Fog provider can't be blank, Fog directory can't be blank

Tasks: TOP => assets:precompile:nondigest
(See full trace by running task with --trace)
{% endhighlight %}

So we have to look for another way to define these variables.

## Solution

Considering the problem above, there is a reasonable question: what are these variables in the config, and what should we do? How should we define them?

While surfing the internet, I've found a good [article](http://railsapps.github.com/rails-environment-variables.html) that explains ways to achieve our goals.

I will describe the option I prefer because I think it is the simplest and faster than the others.

Insert these lines of code into **config/application.rb** after the line `config.assets.version = '1.0'`:

{% highlight ruby %}
config.before_configuration do
  env_file = File.join(Rails.root, 'config', 'local_env.yml')
  YAML.load(File.open(env_file)).each do |key, value|
    ENV[key.to_s] = value
  end if File.exists?(env_file)
end
{% endhighlight %}


Now you have to create a **yml** file in the **config** folder and add it to **.gitignore** if you need to define these variables locally. Here is an example of `config/local_env.yml`:

> These key values are not real, so it doesn't make sense to paste them into your configuration files.

{% highlight ruby %}
FOG_PROVIDER: AWS
FOG_DIRECTORY: my-bycket-name
AWS_ACCESS_KEY_ID: ASFAWFSFDGSDEQWEFGD
AWS_SECRET_ACCESS_KEY: Afsdgd35gSFsdgSDF46GDSG4ghdf356
FOG_REGION: eu-west-1
{% endhighlight %}


And finally, if we deploy the application with **Capistrano**, we have to do it properly. We should put **local_env.yml** in the **Capistrano** shared folder on the server and change **config/deploy.rb** like this:

{% highlight ruby %}
before 'deploy:assets:precompile', :symlink_config_files

desc "Link shared files"
task :symlink_config_files do
  symlinks = {
    "#{shared_path}/config/database.yml" => "#{release_path}/config/database.yml",
    "#{shared_path}/config/local_env.yml" => "#{release_path}/config/local_env.yml"
  }
  run symlinks.map{|from, to| "ln -nfs #{from} #{to}"}.join(" && ")
end
{% endhighlight %}


Here, it is assumed that **local_env.yml** exists in the **{shared_path}/config/** folder on the server. Note that I've done the same thing with my **database.yml** config (by the way, ignoring **database.yml** in your [CVS](http://en.wikipedia.org/wiki/Concurrent_Versions_System) is best practice too).
