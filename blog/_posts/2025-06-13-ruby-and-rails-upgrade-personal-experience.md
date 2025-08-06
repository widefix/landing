---
layout: post
title: "Ruby and Rails upgrade: personal experience"
headline: "Ruby and Rails upgrade: personal experience"
modified: 2025-06-13 22:33:44 +0200
description: "A personal story on upgrading Ruby from 3.1 to 3.4 and Rails from 6.1 to 7.2 in a live project. Reflection on using AI tools to speed up the process. Shared challenges and lessons learned."
tags: [rails, rails-development, ruby]
featured_post: true
toc: true
image: rails-upgrade-notes.jpg
---

Good day, everyone! Today, I want to share my personal experience upgrading Ruby and Rails in a project. This is not a tutorial, but rather a reflection on the process, challenges, and lessons learned. I also share the instances where I used AI tools to speed up the process. Where they were useful and where they weren't. The post is quite long, so grab a cup of coffee and enjoy the read.

I've organized my journey into two logs. The first log is about the <a href="#my-log-of-upgrading-ruby">Ruby upgrade</a>, and the second pertains to the <a href="#my-log-of-upgrading-rails">Rails upgrade</a>. Each log consists of the issues I encountered along the way and the solutions I implemented. I've included links for each issue that direct you to the relevant section of the page, making it easy to share with your colleagues.

## Why upgrade Ruby and Rails?

Upgrading Ruby and Rails is necessary to ensure your app operates without issues and maintains security. For me, a more undeniable motivation was that Heroku deprecates older Ruby versions. The next Heroku stack will most likely not support Ruby 3.1. Deployments on Heroku would fail after some time without an upgrade.

The client will continue using Heroku. This is true even with the [recent major outage](https://www.reddit.com/r/Heroku/comments/1l7sq5p/is_something_happening_cant_access_heroku_also_my/) and rising prices. So, I had to upgrade Ruby and Rails to keep the app running on Heroku.

## Current stack of the project

The project ran on Ruby 3.1.4 and Rails 6.1.7.6. Upgrade targets to Ruby 3.4.4 and Rails 7.2.

It’s a Rails monolith that serves primarily as a GraphQL API backend. The frontend was once part of a full-stack app but is now a separate React app. Some old legacy controllers, views, helpers, and gems are still around, even though they are not used.

The codebase isn’t huge — about 100 models, 3 GraphQL schemas, 200 service objects, 60 background jobs, and around 5 actively used controllers.

PostgreSQL is the main DB; Sidekiq is for background jobs. No caching. RSpec/FactoryBot is for testing; Rubocop for code linting.

Some places in the app use Dry-Rb gems, including monads and the auto-injector. The app has had many developers over the years. So, it has picked up different approaches and patterns. Pretty average Rails app, I’d say.

## Iterative changes

I prefer to make small, incremental changes rather than big-bang upgrades. This way, I can test each change and ensure everything works as expected. For that reason, I started the upgrade with Ruby only, leaving Rails for later. Even though some people might suggest upgrading both Ruby and Rails at the same time, I find it easier to isolate issues when I tackle them one at a time.

## The log of upgrading Ruby

{% picture /images/ruby-upgrade-subtasks.jpg alt="Ruby upgrade in a Rails project step-by-step log" %}

I install Ruby 3.4.4 locally and update the `Gemfile` to use it:

```ruby
ruby '3.4.4'
```

Next, I delete the `Gemfile.lock` file. Then, I run `bundle install` to create a new lock file. This file includes the updated Ruby version and all dependencies that work with it. If some gems are not compatible, I will update them to the latest versions that support Ruby 3.4.4.

All gems were installed without any issues. But installed gems don't guarantee compatibility. So, right after that, I run the test suite to ensure everything works as expected. Besides tests, I have set for myself the following checks to pass:

- Assets precompilation;
- Rails console should work;
- Rails server should start without errors;
- Sidekiq should start without errors;
- Rubocop should pass without errors;

But first, I need to fix all tests.

Next, you see the list of issues/exceptions I encountered while running tests and the fixes I made.

<a id="issue-1" href="#issue-1">💣 issue 1 🔗</a>

```ruby
uninitialized constant GraphQL::Compatibility::ExecutionSpecification::SpecificationSchema::OpenStruct
```

✅ add `require 'ostruct'` in `config/application.rb`.

New Ruby no longer loads `OpenStruct` (and some more standard libraries) by default.

<a id="issue-2" href="#issue-2">💣 issue 2 🔗</a>

```ruby
uninitialized constant ActiveSupport::LoggerThreadSafeLevel::Logger
```

✅ add `require 'logger'` in `config/application.rb`.

New Ruby no longer loads `Logger` by default.

<a id="issue-3" href="#issue-3">💣 issue 3 🔗</a>

```
Bundler::GemRequireError:
  There was an error while trying to load the gem 'bootstrap'.
  Gem Load Error is: bootstrap-rubygem requires a Sass engine. Please add dartsass-sprockets, sassc-rails, dartsass-rails or cssbundling-rails to your dependencies.
```
✅ add `sassc-rails` gem to the `Gemfile`.

The project has `bootstrap` gem. Even though it's useless since the frontend is now a separate React app, I decide to keep it for now. Removing the legacy code is a separate task, and I don't want to mix it with the Ruby upgrade.

<a id="issue-4" href="#issue-4">💣 issue 4 🔗</a>

```
Bundler::GemRequireError:
  There was an error while trying to load the gem 'sidekiq-cron'.
  Gem Load Error is: cannot load such file -- sidekiq/util
  Backtrace for gem load error is:
```

✅ upgrade `sidekiq-cron` gem to the latest version.


<a id="issue-5" href="#issue-5">💣 issue 5 🔗</a>

```
TSort::Cyclic:
  topological sort failed: [...a long list of output...]
```

✅ removing `dartsass-sprockets` and `dartsass-rails` from the `Gemfile`.

I remove neither dart nor sass engines from the project to avoid the cyclic dependency error. The recommendation of the `bootstrap` gem added the gems. But those gems are not needed for the project, so I remove them.

At this point, the tests started to run; not all of them passed, but at least I could see the progress. I left the tests fixing for later and moved on to the next step — assets precompilation. On that step, I encountered the following issues.

<a id="issue-6" href="#issue-6">💣 issue 6 🔗</a>

```ruby
LoadError: cannot load such file -- drb (LoadError)
```

✅ add gem `drb` to the `Gemfile`.

The `rails` gem requires `drb` for assets precompilation, but New Ruby no longer loads it by default.


<a id="issue-7" href="#issue-7">💣 issue 7 🔗</a>

```ruby
error Command "build:css" not found.
```

✅ remove `cssbundling-rails` gem from the `Gemfile`.

The `cssbundling-rails` gem is not used in the project, so I remove it to avoid the error. The project uses `sassc-rails` for CSS processing, so I don't need `cssbundling-rails`. This gem was also added by the recommendation of the `bootstrap` gem.


<a id="issue-8" href="#issue-8">💣 issue 8 🔗</a>

Assets precompilation failed on Heroku with the following error:

<br>
<details>
<summary>[webpack-cli] Error: error:0308010C:digital envelope routines::unsupported - click to expand!</summary>

<div>
<pre><code>

[webpack-cli] Error: error:0308010C:digital envelope routines::unsupported
           at new Hash (node:internal/crypto/hash:79:19)
           at Object.createHash (node:crypto:139:10)
           at CompressionPlugin.taskGenerator (/tmp/build_8801e356/node_modules/compression-webpack-plugin/dist/index.js:163:38)
           at taskGenerator.next (&lt;anonymous&gt;)
           at /tmp/build_8801e356/node_modules/compression-webpack-plugin/dist/index.js:216:49
           at CompressionPlugin.runTasks (/tmp/build_8801e356/node_modules/compression-webpack-plugin/dist/index.js:236:9)
           at /tmp/build_8801e356/node_modules/compression-webpack-plugin/dist/index.js:270:18
           at _next0 (eval at create (/tmp/build_8801e356/node_modules/tapable/lib/HookCodeFactory.js:33:10), &lt;anonymous&gt;:37:17)
           at eval (eval at create (/tmp/build_8801e356/node_modules/tapable/lib/HookCodeFactory.js:33:10), &lt;anonymous&gt;:53:1)
           at WebpackAssetsManifest.handleEmit (/tmp/build_8801e356/node_modules/webpack-assets-manifest/src/WebpackAssetsManifest.js:486:5)
           at AsyncSeriesHook.eval [as callAsync] (eval at create (/tmp/build_8801e356/node_modules/tapable/lib/HookCodeFactory.js:33:10), &lt;anonymous&gt;:49:1)
           at AsyncSeriesHook.lazyCompileHook (/tmp/build_8801e356/node_modules/tapable/lib/Hook.js:154:20)
           at Compiler.emitAssets (/tmp/build_8801e356/node_modules/webpack/lib/Compiler.js:491:19)
           at onCompiled (/tmp/build_8801e356/node_modules/webpack/lib/Compiler.js:278:9)
           at /tmp/build_8801e356/node_modules/webpack/lib/Compiler.js:681:15
           at AsyncSeriesHook.eval [as callAsync] (eval at create (/tmp/build_8801e356/node_modules/tapable/lib/HookCodeFactory.js:33:10), &lt;anonymous&gt;:6:1)
           at AsyncSeriesHook.lazyCompileHook (/tmp/build_8801e356/node_modules/tapable/lib/Hook.js:154:20)
           at /tmp/build_8801e356/node_modules/webpack/lib/Compiler.js:678:31
           at AsyncSeriesHook.eval [as callAsync] (eval at create (/tmp/build_8801e356/node_modules/tapable/lib/HookCodeFactory.js:33:10), &lt;anonymous&gt;:6:1)
           at AsyncSeriesHook.lazyCompileHook (/tmp/build_8801e356/node_modules/tapable/lib/Hook.js:154:20)
           at /tmp/build_8801e356/node_modules/webpack/lib/Compilation.js:1423:35
           at AsyncSeriesHook.eval [as callAsync] (eval at create (/tmp/build_8801e356/node_modules/tapable/lib/HookCodeFactory.js:33:10), &lt;anonymous&gt;:6:1)
           at AsyncSeriesHook.lazyCompileHook (/tmp/build_8801e356/node_modules/tapable/lib/Hook.js:154:20)
           at /tmp/build_8801e356/node_modules/webpack/lib/Compilation.js:1414:32
           at eval (eval at create (/tmp/build_8801e356/node_modules/tapable/lib/HookCodeFactory.js:33:10), &lt;anonymous&gt;:14:1)
           at process.processTicksAndRejections (node:internal/process/task_queues:105:5) {
         opensslErrorStack: [
           'error:03000086:digital envelope routines::initialization error',
           'error:0308010C:digital envelope routines::unsupported'
         ],
         library: 'digital envelope routines',
         reason: 'unsupported',
         code: 'ERR_OSSL_EVP_UNSUPPORTED'
       }

</code></pre>
</div>
</details>

✅ add `NODE_OPTIONS=--openssl-legacy-provider` to the Heroku config: `heroku config:set NODE_OPTIONS=--openssl-legacy-provider`.

The `assets:precompile` task forced me to upgrade Node.js to a newer version, which in turn caused the `compression-webpack-plugin` to fail. The error message says that the OpenSSL version in Node.js can’t handle some cryptographic tasks needed by the plugin. Set the `NODE_OPTIONS` environment variable to `--openssl-legacy-provider`. This lets it work with the old OpenSSL provider. I plan to upgrade the `compression-webpack-plugin` to a version that works with the new OpenSSL. For now, this workaround is enough. The current version of `compression-webpack-plugin` is 11.1.0 but the app has installed 4.0.1. Even though the previous upgrade was a few years ago. The number of releases between is scary. The JavaScript ecosystem is a nightmare 😢.

The precompilation of assets was successful in the end. Hooray! 🎉 Switching back to the failed tests.

<a id="issue-9" href="#issue-9">💣 issue 9 🔗</a>

I receive these errors on some scopes defined in the models:

```ruby
ArgumentError: wrong number of arguments (given 1, expected 0)
```

✅ change `scope :something, ->(from:, to:) { where(from:, to:) }` in several models to `scope :something, ->(kwargs = {}) { where(**kwargs) }`.

I don't understand the reasons for its failure. But it seems that the issue was in the incompatibility of Ruby 3.4.4 and Rails 6.1. Rails 6.1 does not officially support Ruby 3.4. Consider this fix a temporary workaround. When I upgrade Rails to 7.2, I will revisit this code to ensure a thorough refactor.


<a id="issue-10" href="#issue-10">💣 issue 10 🔗</a>

```ruby
'Regexp#initialize': wrong number of arguments (given 3, expected 1..2) (ArgumentError)
```

✅ change `Regexp.new('...', nil, 'n')` with `Regexp.new('...', Regexp::FIXEDENCODING | Regexp::NOENCODING)`.

New Ruby has changes in the `Regexp` class, which caused this error. I personally never use `Regexp.new` for regexps. I don't know why someone used it in the project like that. But it was failing, so I fixed it. I must admit, it was pretty tricky to figure out which parameters the new way of initializing `Regexp` accepts. I had to check Ruby sources to come up with this solution.


<a id="issue-11" href="#issue-11">💣 issue 11 🔗</a>

✅ monkey-patch

```ruby
# frozen_string_literal: true

module ActionDispatch
  module Routing
    module UrlFor
      def initialize(*args)
        @_routes = nil
        super(*args)
      end
    end
  end
end

module ActionController
  class Metal
    def initialize(*_args)
      @_request = nil
      @_response = nil
      @_routes = nil
      super()
    end
  end
end

module ActionView
  module Layouts
    def initialize(*_args)
      @_action_has_layout = true
      super()
    end
  end
end
```

At this moment I thought it was incompatibility between Ruby 3.4.4 and Rails 6.1. I even created a [discussion](https://www.reddit.com/r/rails/comments/1l77bri/rails_6_compatibility_with_ruby_34/) on Reddit. But later I found out that it was actually a problem with `dry-auto_inject` gem. See more details in the [comment](https://github.com/dry-rb/dry-auto_inject/issues/80#issuecomment-2968324620). Later, I took out those monkey-patches and changed the auto-injection to an explicit class initialization. The project had only one controller that used auto-injection, which made the situation manageable.

All tests pass. Assets precompilation doesn't fail. The Rails console works. The Rails server starts without errors. Sidekiq also starts without issues. I can now deploy the app to Heroku.

Moving on to the next step — upgrading Rubocop.


<a id="issue-12" href="#issue-12">💣 issue 12 🔗</a>

I upgraded Rubocop and got many violations. They say `RSpec/BeEq: Prefer be over eq`. This happens in lines like `expect(some_value).to eq(expected_value)`.

✅ disable `RSpec/BeEq` cop in the `.rubocop.yml` file.

I decide not to fix them right now. I would like to have the upgrade task contain as few changes as possible. Moreover, I have doubts that using `be` instead of `eq` is a good idea. I prefer to use `eq` for equality checks; it's been working in this project for 7 years, and everything has been fine. Why should we change everything now because someone has a different opinion? I will revisit this later, after the Rails upgrade.

So I disabled the `RSpec/BeEq` cop in the `.rubocop.yml` file:

```yaml
RSpec/BeEq:
  Enabled: false
```


<a id="issue-13" href="#issue-13">💣 issue 13 🔗</a>

Some cops are failing with `undefined method 'empty?' for an instance of Integer (NoMethodError)`.

✅ Do not use Rubocop v1.76.0.

It turned out the `Lint/EmptyInterpolation` cop was failing not only for me but also in general. The issue was reproducible in Rubocop v1.76.0. The cop checks for empty interpolations like `#{}` and raises an error if it finds one. But in Ruby 3.4, the `empty?` method is not defined for `Integer` and other primitives, which causes the error.

I downgraded Rubocop to the previous version and made a [pull request to the Rubocop team](https://github.com/rubocop/rubocop/pull/14245). They merged it almost immediately, and they released the fix in Rubocop v1.76.1. Kudos to the Rubocop team for their quick response! Moreover, I became the 900th contributor to RuboCop - congrats to me! 🎉

There were some other cops that were failing. To avoid too much changes in the code, I regenerate the `.rubocop_todo.yml` file:

```shell
rubocop --auto-gen-config
```

And push the changes to the repository.

There is an approach to fix all the violations now. But I prefer not to do that. This kind of effort usually results in wasted time and fails to improve code quality. Instead, I ask myself: is it worth it? To justify my decision, I prefer the 80/20 rule: 20% of the effort should yield 80% of the results. In this case, spending 80% of the effort for a questionable 20% gain isn't worth it.

Ruby upgrade is done! 🎉

## The log of upgrading Rails

{% picture /images/rails-upgrade-notes.jpg alt="Live Rails project upgrade step-by-step log" %}

Now that I have upgraded Ruby, I can move on to upgrading Rails. I start by updating the `Gemfile` to use Rails 7.2:

```ruby
gem 'rails', '7.2.2.1'
```

I delete the `Gemfile.lock` file. Then, I run `bundle install` to create a new lock file. This file has the updated Rails version and all dependencies that work with it. If some gems are not compatible, I will update them to the latest versions that support Rails 7.2.

This time, I had to update several gems to make them compatible with Rails 7.2. I will list them below, along with the fixes I made.

Note, I have not dived deep into each issue. When I encountered an issue, I attempted to upgrade to the largest version that is compatible with the current stack. In all cases, that worked well. If an upgrade didn't help, I would investigate the issue in greater depth. But in this case, I didn't have to do that.


<a id="issue-14" href="#issue-14">💣 issue 14 🔗</a>

```
PaperTrail 12.0.0 is not compatible with ActiveRecord 7.2.2.1. We allow PT
contributors to install incompatible versions of ActiveRecord, and this
warning can be silenced with an environment variable, but this is a bad
idea for normal use. Please install a compatible version of ActiveRecord
instead (>= 5.2, < 6.2). Please see the discussion in paper_trail/compatibility.rb
for details.
```

✅ upgrade `paper_trail` gem to 16.0.0.


<a id="issue-15" href="#issue-15">💣 issue 15 🔗</a>

```
Because paranoia >= 2.5.0, < 2.6.3 depends on activerecord >= 5.1, < 7.1
  and rails >= 7.2.2.1, < 8.0.0.beta1 depends on activerecord = 7.2.2.1,
  paranoia >= 2.5.0, < 2.6.3 is incompatible with rails >= 7.2.2.1, < 8.0.0.beta1.
So, because Gemfile depends on rails = 7.2.2.1
  and Gemfile depends on paranoia = 2.6.2,
  version solving has failed.
```

✅ upgrade `paranoia` gem to 3.0.1.


<a id="issue-16" href="#issue-16">💣 issue 16 🔗</a>

<br>
<details>
<summary>ActiveSupport::Dependencies.reference is deprecated - click to expand!</summary>

<pre><code>
NoMethodError:
  undefined method 'reference' for module ActiveSupport::Dependencies
# ./config/application.rb:12:in '<top (required)>'
# ./config/environment.rb:2:in 'Kernel#require_relative'
# ./config/environment.rb:2:in '<top (required)>'
# ./spec/rails_helper.rb:3:in '<top (required)>'
# ./spec/mailers/mailer_spec.rb:1:in '<top (required)>'
~/.rbenv/versions/3.4.4/lib/ruby/gems/3.4.0/gems/devise-4.7.0/lib/devise.rb:52: warning: already initialized constant Devise::ALL
~/.rbenv/versions/3.4.4/lib/ruby/gems/3.4.0/gems/devise-4.7.0/lib/devise.rb:52: warning: previous definition of ALL was here
~/.rbenv/versions/3.4.4/lib/ruby/gems/3.4.0/gems/devise-4.7.0/lib/devise.rb:53: warning: already initialized constant Devise::CONTROLLERS
~/.rbenv/versions/3.4.4/lib/ruby/gems/3.4.0/gems/devise-4.7.0/lib/devise.rb:53: warning: previous definition of CONTROLLERS was here
~/.rbenv/versions/3.4.4/lib/ruby/gems/3.4.0/gems/devise-4.7.0/lib/devise.rb:54: warning: already initialized constant Devise::ROUTES
~/.rbenv/versions/3.4.4/lib/ruby/gems/3.4.0/gems/devise-4.7.0/lib/devise.rb:54: warning: previous definition of ROUTES was here
~/.rbenv/versions/3.4.4/lib/ruby/gems/3.4.0/gems/devise-4.7.0/lib/devise.rb:55: warning: already initialized constant Devise::STRATEGIES
~/.rbenv/versions/3.4.4/lib/ruby/gems/3.4.0/gems/devise-4.7.0/lib/devise.rb:55: warning: previous definition of STRATEGIES was here
~/.rbenv/versions/3.4.4/lib/ruby/gems/3.4.0/gems/devise-4.7.0/lib/devise.rb:56: warning: already initialized constant Devise::URL_HELPERS
~/.rbenv/versions/3.4.4/lib/ruby/gems/3.4.0/gems/devise-4.7.0/lib/devise.rb:56: warning: previous definition of URL_HELPERS was here
~/.rbenv/versions/3.4.4/lib/ruby/gems/3.4.0/gems/devise-4.7.0/lib/devise.rb:59: warning: already initialized constant Devise::NO_INPUT
~/.rbenv/versions/3.4.4/lib/ruby/gems/3.4.0/gems/devise-4.7.0/lib/devise.rb:59: warning: previous definition of NO_INPUT was here
~/.rbenv/versions/3.4.4/lib/ruby/gems/3.4.0/gems/devise-4.7.0/lib/devise.rb:62: warning: already initialized constant Devise::TRUE_VALUES
~/.rbenv/versions/3.4.4/lib/ruby/gems/3.4.0/gems/devise-4.7.0/lib/devise.rb:62: warning: previous definition of TRUE_VALUES was here
</code></pre>
</details>

✅ upgrade `devise` gem to 4.9.4.


<a id="issue-17" href="#issue-17">💣 issue 17 🔗</a>

I get this error during the assets precompilation step when deploying on Heroku:

```
Uglifier::Error: Unexpected token: keyword (const). To use ES6 syntax, harmony mode must be enabled with Uglifier.new(:harmony => true)
```

✅ replace `uglifier` gem with `terser` and configure the new js compressor in the environment files:

```ruby
config.assets.js_compressor = :terser # instead of :uglifier used before
```

<a id="issue-18" href="#issue-18">💣 issue 18 🔗</a>

Rails console fails with the following error:

```
~/.rbenv/versions/3.4.4/lib/ruby/site_ruby/3.4.0/bundler/rubygems_integration.rb:215:in 'block (2 levels) in Kernel#replace_gem': can't activate listen (~> 3.5), already activated listen-3.0.8. Make sure all dependencies are added to Gemfile. (Gem::LoadError)
```

✅ upgrade `listen` gem to 3.9.0.

<a id="issue-19" href="#issue-19">💣 issue 19 🔗</a>

```ruby
RuntimeError:
  Attach interfaces using `implements(SomeType)`, not `include(SomeType)`
```

✅ upgrade `graphql` gem to 1.13.25.

At that point, I updated to the latest versions compatible with Rails 7.2.

<a id="issue-20" href="#issue-20">💣 issue 20 - Zeitwerk 🔗</a>

Next, I encounter a lot of issues related to code eager loading. Rails 7.2 made Zeitwerk the default code loader, which is stricter than the previous classic loader. You must define all classes and modules in files that have matching names and paths. This means that if you define a class `Foo::Bar`, you must place it in a file `foo/bar.rb`.

Unfortunately, the project has a lot of code that doesn't follow this convention. I could not come up with any Zeitwerk configuration that would make it work without changing the code. So, I decided to load those failing files manually in an initializer. I made a new initializer file called `config/initializers/zeitwerk.rb`. I added this code (it's obfuscated for security reasons):

```ruby
# These are classes that don't follow the current inflection rules, and hence Zeitwerk conventions.
custom_classes = %w[
  AlphaProcessJob
  BetaNotificationMailer
  GammaSyncService
]

# Map underscored file names to class names that don't follow Zeitwerk conventions
mapping = custom_classes.map { |klass| [klass.gsub(/([a-z\d])([A-Z])/, '\1_\2').downcase, klass] }.to_h

# Register inflection mapping
Rails.autoloaders.main.inflector.inflect(mapping)

# Ignore specific folders
%w[
  app/modules/foo
  app/modules/bar
  app/modules/baz
].each do |folder|
  Rails.autoloaders.main.ignore(Rails.root.join(folder))
end

# Manually require a few specific files
require Rails.root.join("app/modules/foo/core_update_service.rb")

# Load all Ruby files in nested folders
Dir[Rails.root.join("app/modules/bar/**/*.rb")].each { |f| require f }
Dir[Rails.root.join("app/modules/baz/**/*.rb")].each { |f| require f }
Dir[Rails.root.join("app/modules/shared/**/*.rb")].each { |f| require f }
```

In the inflections config (`config/initializers/inflections.rb`), the project had set up abbreviations like this:

```ruby
ActiveSupport::Inflector.inflections(:en) do |inflect|
  inflect.acronym 'ALPHA'
  inflect.acronym 'BETA'
  inflect.acronym 'GAMMA'
end
```

Having these inflections, Zeitwerk expects `ALPHAProcessJob` class defined in `alpha_process_job.rb` file. But the current class name in this file is `AlphaProcessJob`. The same applies to some more classes. I don't want to jeopardize the existing code by making the class renames. Especially, when some of these classes are Sidekiq jobs. Renaming job classes could fail the existing jobs in production. When it comes to other files, I want to mitigate any possible risks. Again, I want Ruby /Rails upgrade to be only an upgrade, but not a refactoring task.

Some folders in the project break Zeitwerk rules so much that inflections and autoloading can't fix them. For example, the same folder, say `app/modules/foo` has a file `bar.rb` with a class `Bar` (without the required `Foo` namespace!). At the same time, there is another file, say `qux.rb`, in the same folder `app/modules/foo` with a class under the namespace `Foo::Qux`. Crazy stuff! I don't know how it has been working before.

For that reason, I ignore these tricky folders and load the files from them by hand. Some files need a specific loading order. For example, class `B` depends on class `A`. So, I required them in the initializer. Then, I looped through the files that depend on base classes.

If a module wraps a class, Zeitwerk expects the file to have the same name as the module. For example, if you define a class `Foo::Bar`, you must place it in a file `foo/bar.rb`, and the `foo.rb` file must define the `Foo` module/class. The project has several modules missing like that. So, I added the necessary files that define these missing modules.

<a id="issue-21" href="#issue-21">💣 issue 21 🔗</a>


There were a lot of `to_s` methods in the codebase that were failing with the following error:

```ruby
wrong number of arguments (given 1, expected 0) (ArgumentError)
```

✅ change `to_s(:utc)` to `to_fs(:utc)`.

This is a change in Rails 7.2, where `to_s` no longer accepts a format argument. Instead, you should use `to_fs` method for formatting dates and times.

<a id="issue-22" href="#issue-22">💣 issue 22 🔗</a>

Rails 7 has made some changes on `schema.rb`. [Read this](https://rubyonrails.org/2022/2/11/this-week-in-rails-rails-7-0-2-schema-versioning-based-on-the-rails-version-and-more-cbcb0592) for more details.

I regenerate `schema.rb` with `rails db:migrate` and it generates a new schema. The changes I got:

```ruby
| -ActiveRecord::Schema.define(version: 2025_04_29_203724) do
| +ActiveRecord::Schema[7.2].define(version: 2025_04_29_203724) do


| -    t.datetime "created_at", precision: 6, null: false
| +    t.datetime "created_at", null: false

| -    t.datetime "updated_at", null: false
| +    t.datetime "updated_at", precision: nil, null: false
```

And so on. As you can see, the schema is now versioned, and the datetime columns have had their precision removed.

<a id="issue-23" href="#issue-23">💣 issue 23 🔗</a>

The codebase has several places iterating over ActiveRecord errors like this:

```ruby
errors.each do |attribute, message|
  puts "#{attribute}: #{message}"
end
```

This fails, as instead of attribute and message, it returns an instance of `ActiveModel::Error` class now. So, I changed the code to: A code like this has stopped working:

```ruby
errors.each do |error|
  puts "#{error.attribute}: #{error.message}"
end
```

<a id="issue-24" href="#issue-24">💣 issue 24 🔗</a>

A code like this has stopped working:

```ruby
object.errors[:base] << 'Some error message'
```

✅ change it to:

```ruby
object.errors.add(:base, 'Some error message')
```

This is a change in Rails 7.2, where you should use `add` method to add errors to the base attribute.

<a id="issue-25" href="#issue-25">💣 issue 25 🔗</a>

The `alias_attribute` method no longer works on deleted attributes that are columns of the delegated object.

Say, we have the following code:

```ruby
class User < ApplicationRecord
  belongs_to :address

  delegate :my_column, to: :address

  alias_attribute :new_my_column, :my_column
end
```

It would fail with the following error:

```
User model aliases `my_column`, but `my_column` is not an attribute. Use `alias_method :new_my_column, :my_column` or define the method manually. (ArgumentError)

          raise ArgumentError, "#{self.name} model aliases `#{old_name}`, but `#{old_name}` is not an attribute. " \
```

✅ change `alias_attribute` to the plain Ruby code like this:

```ruby
def new_my_column
  my_column
end
```

Fortunately, I had to fix only a few places like this.

<a id="issue-26" href="#issue-26">💣 issue 26 🔗</a>

PaperTrail stopped working at the deserialization step with errors like this:

```ruby
Psych::DisallowedClass:
        Tried to load unspecified class: Symbol
```

✅ I added the following to the `config/application.rb` file:

```ruby
config.active_record.use_yaml_unsafe_load = true
```

Some changes in YAML deserialization. See more details on StackOverflow [here](https://stackoverflow.com/questions/72970170/upgrading-to-rails-6-1-6-1-causes-psychdisallowedclass-tried-to-load-unspecif).

<a id="issue-27" href="#issue-27">💣 issue 27 🔗</a>

Custom initializers (in `config/initializers` folder) that use some code defined in the `lib` folder started to fail with an error like this:

```ruby
NameError:
  uninitialized constant Foo::Bar
```

✅ I tried to make Zeitwerk load the `lib` folder, but it didn't help. So, I had to require the necessary files in the initializers manually.

```ruby
require 'lib/foo/bar'

...
```

There were few initializers like this, so I fixed them by hand.

And... that's the final point of my story: Ruby/Rails got upgraded; the app works well! 🎉

## Reflection on AI tools

{% picture /images/ai-in-rails-upgrade.jpg alt="Using AI tools in Ruby/Rails upgrade task" %}

I have GitHub Copilot with the GPT-4.1 model inside VS Code that I tried to use in my task. However, the assistance was good only in some routine tasks. For example, when I had to change `to_s(<time format>)` to `to_fs(<time format>)` everywhere in the codebase. I had only 2 such issues out of 27. These issues are <a href="#issue-21">21</a> and <a href="#issue-23">23</a>. It could also be helpful in <a href="#issue-24">24</a>. But for me, the old fashioned search and replace worked fine. So roughly, AI helped me with <b>less than 10%</b> of the issues.

AI tools were not helpful with more complex issues at all. That even led to time wasted. When I had to fix Zeitwerk configuration (<a href="#issue-20">20</a>), the AI suggested some several bizarre solutions that didn't work. At the end I gave up and stopped wasting time on it. Another example of time wasted is on the <a href="#issue-11">issue 11</a> with the DRY auto-inject. These kinds of issue is still a great challenge for AI.

In conclusion, it is unlikely that AI will fully replace software engineers. Instead, I anticipate that AI will serve as a valuable tool for developers, much like how robots have assisted factory workers in improving efficiency and productivity.

## First impressions after the upgrade

{% picture /images/first-impression-after-rails-upgrade.jpg alt="Live Rails project upgrade first impression" %}

The code autocompletion in the Rails console works better now. The suggestions are much faster and more accurate. Rails server boots also faster. At first glance, the response time for HTTP requests is much lower on Heroku. But these are just my subjective opinions.

The changes aren't in production yet. I'll measure the performance later and compare the results.

I like Zeitwerk as the default code loader. It is much stricter than the classic loader, but it helps catch issues early.

## Conclusion

{% picture /images/rails-upgrade-conclusion.jpg alt="Live Rails project upgrade conclusion" %}

Upgrading Rails is not a trivial task, and the process can vary significantly from one project to another. In another project where we are upgrading Ruby and Rails, the plan is somewhat different. That project uses the Paperclip gem for storing and processing attachments. But it's not compatible with the newer versions of Rails. As a result, it will need to be replaced with Active Storage, which is a tricky migration. Expect more details in the future in our blog.

Each project may have its own set of prerequisites, making the upgrade plan unique to that specific project. This uniqueness primarily stems from the dependencies and the codebase involved. I hope my experience helps you better understand the upgrade process and gives you some ideas on how to approach your own upgrades.

AI tools can be useful, but they are not a complete solution. They can accelerate the process, but it's still essential to understand the code and the changes you are making. I find AI particularly helpful for repetitive tasks, such as fixing the same issue in multiple locations. However, for more complex problems, I relied on my own knowledge and experience. If I could sense **when AI is unhelpful** before making a prompt, I wouldn't waste time on it. This ability seems to be a skill that an engineer needs to develop independently in order to use AI tools more effectively.

I followed the **20/80 rule** focusing on the key changes that would bring the biggest benefits. I didn't try to fix every single issue or violation. Instead, I concentrated on the essential changes that would make the app work on the new Ruby and Rails versions.

Making **iterative changes** allowed me to identify and test issues in isolation. This way, I could ensure that everything worked as expected before moving on to the next step. As a result, I believe I achieved my goal earlier.

Fortunately, the upgrading app didn't have much of the Rails "standard" front-end. I've been working with Rails since 2009. So I have gone through many Rails upgrades, and the front-end part has always been a pain in the ass. Nowadays, using Rails as an API-only backend with a separate front-end framework (like React or Vue.js) has become a preferred approach for me.

During the upgrade process, I contributed to the open-source community by reporting an issue in dry-auto_inject and making a pull request to Rubocop. I believe contributing to open-source projects is crucial because it connects me to something greater.
