---
layout: post
title: "Make a free landing page"
description: "This blog post describes how to make a startup landing page with minimum effort. All described tools to make the landing page are free. And as a special bonus you will see how to add a sign up form to the landing page to collect visitors' emails."
tags: [github, mailchimp]
share: true
comments: true
redirect_from:
  - /blog/2014/06/15/make-free-landing-page/
---


A **landing page** may be useful in many cases for people who want a business on the internet. Its main goal is to promote a business idea. The target may be a site you plan to build (or have already released), or a book if you are the author. The page basically contains static content with contact information, cool images and JavaScript or CSS effects to attract people. Often, it has a signup form with a mandatory email field. To have a one-page site like this on the internet, you have to solve at least these issues: writing the static site, choosing hosting, deploying the site and finding a backend. In this post, you will see how to solve them with minimal effort and cost. All the tools are **free** of charge.

This solution can be applied to many other types of sites, such as **launching soon** or **coming soon pages**. The type doesn't matter; the main feature is that they all have static content and, optionally, a signup form.

## Introduction

First of all, if you don't have specific requirements for the **landing page** and are fine with ready-made solutions, you may be interested in site builders.

One of the most famous products is [LaunchRock](http://launchrock.co). It has a built-in site builder with templates that doesn't even require knowledge of HTML or CSS. It also has a signup form with one field (email), and all form data goes to its backend. You can see statistics for registered users there and set your domain for the page.

But when you want to go beyond their site templates, you can get trapped. One example is adding a field to the signup form. You are restricted by their backend, and if you really want to add the field, you have to move to your own solution. Another problem is deployment: there is no automated deployment tool. We are developers, so this is vital for us! We want to track changes in a version control system (mostly [GitHub](https://github.com/)), push them there and have a hosting server fetch them automatically.

## Hosting and deployment

There are many ways to set up your site's deployment process. You can buy shared hosting, a virtual private server or a dedicated server. There are also special tools (for example, [Capistrano](https://github.com/capistrano/capistrano)) to automate delivering code to the server and restarting the web browser to apply it. You can also do it manually through an [FTP](http://ru.wikipedia.org/wiki/FTP) or [SMB](http://en.wikipedia.org/wiki/Server_Message_Block) server (hello, PHP!). But setting up a process like this takes time and money.

Fortunately, there is [GitHub Pages](https://pages.github.com). It's a tool that covers half the work of building a **landing page**.

* It solves the deployment issue. You don't have to worry about it at all. Just push your changes to the Git repository, and that's it. They will be applied to the site automatically.
* It provides free shared hosting for static sites.
* It works with *git*. So the desire to have a *version control system* is satisfied.
* It lets you point your domain or subdomain to the web server. You can find more information [here](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages).

Three of the four issues are solved by this tool, plus the possible wish to have a custom domain. Not bad for one tool. Also, don't forget — it's absolutely free.

> You won't see how to set up a GitHub Pages project here. That's another story. Don't be sad; it's not as hard as it seems. In [this article](/blog/jekyll-feature-blog-engine/), you will see how to do it. There is also a tutorial on the [official site](https://pages.github.com/).

The main problem with this solution may be *git*, if you aren't familiar with it. Unfortunately, you can't use this solution without knowing [Git basics](http://git-scm.com/book). So in that situation, you have two choices: learn Git or hire a specialist.

## Signup form

If you are going to gather information from your visitors, you may be interested in a signup form. Because *GitHub Pages* doesn't let you save form submissions, you have to choose a backend server. Again, you have a choice: write it yourself or use a ready-made third-party service. Writing your own server seems like a good idea, but it requires hosting and time, so it's not our choice. We choose a third-party tool, for example [Google Forms](http://www.google.com/google-d-s/createforms.html). If you choose this tool, you will have to use this [jquery plugin](https://github.com/kctess5/jqGoogleForms) to save data from your server to *Google* remotely.

But perhaps the best choice is [MailChimp](http://mailchimp.com). It lets you create custom forms and has built-in functionality to verify visitors' submitted email addresses through confirmation emails. There are three types of forms in *MailChimp*: **general**, **embedded** and **integration**. The *general* form is hosted on MailChimp's server. An *embedded* form can be included in your site as an iframe, which means you won't be able to change its CSS and JavaScript. Finally, the **integration** form lets you create any kind of form on your site; it's fully customizable.

By choosing *MailChimp*, you get the bonus of sending emails to visitors. You can create pretty email templates there and send them to your customers. This solution is free but has limitations, which you can see on [this page](http://mailchimp.com/pricing).


## Conclusion

Choosing *GitHub Pages* and *MailChimp* benefits us when we need a site such as a *landing page* or *coming soon page* with an *email signup form*. This is a free solution but requires some knowledge, so it may not suit people unfamiliar with *git*, for instance.

This is a [working solution](http://introduction.mezuka.com/). The site is hosted on *GitHub Pages* and uses *MailChimp* for signup forms. Cost of use: $0.

{% picture /images/gh_mailchimp.jpg alt="GitHub pages + MailChimp = landing page" %}
