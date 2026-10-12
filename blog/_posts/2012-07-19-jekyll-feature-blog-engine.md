---
layout: post
title: "Jekyll - the best blog engine"
description: "This post describes how to use GitHub Pages (gh-pages) to host a simple blog based on Jekyll. You don't have to pay for hosting."
tags: [jekyll, git, hosting, blog]
share: true
comments: true
redirect_from:
  - /blog/2012/07/19/jekyll-feature-blog-engine/
---


Have you ever wanted a nice, simple-to-use, free blog engine for developers? If so, this post is especially for you.

## Blog engine

I think that *Jekyll* is the best blog engine for programmers today. It has everything you want as a developer to write your thoughts down:

* simple template system
* *markdown*, *html* or *textile* templates with *liquid* includes and the ability to add inline HTML
* code highlighting
* the ability to extend the system with plugins
* ready-to-use HTML templates ([twitter, tom, the-program, the-minimum and mark-reid](http://themes.jekyllbootstrap.com/preview/twitter/) are available for now)
* permalink customization
* SEO features (meta tags, sitemap.xml and atom.xml are available out of the box)
* tag support
* lightweight and fast
* no database
* no hosting headaches
* a comments system out of the box
* Google Analytics out of the box

At the same time, this blog engine is very simple and generates static pages, so it works rather quickly. The engine itself, without any templates, is available on [GitHub](https://github.com/mojombo/jekyll), but you can use [ready-made templates](http://jekyllbootstrap.com/). I prefer the second option for installation.

For hosting, Jekyll gets on well with [github-pages](http://pages.github.com/). It is the simplest way to put your blog on the internet.

If you have a blog on another engine (Tumblr, Posterous, Blogger/Blogspot, Mephisto, TextPattern, Typo 4+, Movable Type, Drupal or WordPress), you can migrate to this one very easily. You can find out how [here](https://github.com/mojombo/jekyll/wiki/Blog-Migrations).

## Installation

> I will describe the deployment process only for GitHub Pages here. If you would like to deploy the code to your server, follow [these instructions](https://github.com/mojombo/jekyll/wiki/Deployment).

Firstly, you should have an account on [GitHub](http://github.com). If you don't have one, sign up there. Then [create a repository](https://github.com/repositories/new) named *USERNAME.github.com*.

    $ git clone https://github.com/plusjade/jekyll-bootstrap.git USERNAME.github.com
    $ cd USERNAME.github.com
    $ git remote set-url origin git@github.com:USERNAME/USERNAME.github.com.git
    $ git push origin master

After these steps, you will have a ready-to-use blog template. To write posts locally, you should [install](https://github.com/mojombo/jekyll/wiki/Install) the *jekyll* gem.

The available blog actions are:

    rake page           # Create a new page.
    rake post           # Begin a new post in ./_posts
    rake preview        # Launch preview environment
    rake theme:install  # Install theme
    rake theme:package  # Package theme
    rake theme:switch   # Switch between Jekyll-bootstrap themes.

By the way this blog is also based on *jekyll-bootstrap*. Really awesome blog engine, check it out!
