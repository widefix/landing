---
layout: post
title: "Git hosting"
description: "Are you looking for free Git hosting? Or perhaps Mercurial hosting or a VCS hosting alternative to github.com? If you answer yes to at least one of these questions, this post will be useful for you. You are welcome!"
tags: [git, hosting]
share: true
comments: true
redirect_from:
  - /blog/2012/03/21/git-hosting/
---


After finding my **github** repository instead of my project in **google**, I started searching for **free Git hosting** that would let me hide my projects from **Google's crawler**. And I was surprised when I found a lot of services that suited me. I will describe one of them in this article: **bitbucket**.

## Introduction

**Bitbucket** provides both **mercurial** and **git hosting**, with an **unlimited number of private projects** and **unlimited disk space** per account! This system was written by Atlassian, the company behind JIRA and Confluence. Go to their [site](http://bitbucket.org/) and check it out.

## Pricing
{% picture /images/bitbucket.jpg alt="BitBucket pricing" %}

> This screenshot may be outdated. To check current pricing, please visit the [bitbucket site](/blog/images/bitbucket.jpg).

As you can see, a free account has a restriction: a maximum of 5 users with write access to your project. 5 members is a very large number for one team. If this plan isn't enough, you can buy the next plan with 10 collaborators for $10 per month. Compare that with github's price — $24 per month for 10 collaborators and 20 projects — while here you have an unlimited number of private projects and unlimited disk space. It is a very cheap and tempting offer!

## Sign up

It is very easy to sign up here. OpenID is available through services:

* Google
* Yahoo!
* AOL
* OpenID
* MyOpenID
* LiveJournal
* Flickr
* WordPress
* VeriSign
* ClaimID

After signing up, you can create a repository.

## Migrate from github

It is very easy to create a Git repository here. You have 2 choices: create a project from scratch as you do on **github**, or import an existing repository from **github**, **Google code**, **Mercurial**, **SourceForge** or **Subversion**. I preferred to import my source code from **github**:

1. Type the URL for your public repo. If you want to migrate a private repo, check the _Requires authorization_ checkbox and fill in the *username* and *password* for your github account.
2. Type the repository name that **bitbucket** will use. You can also choose whether this repo will be **private** or **public**. Select the VCS: **git** or **mercurial**.
3. You can also enable **issue tracking** and **Wiki pages**.
4. Then select the main programming language for your repository. You can also write a **description** and set a **website URL**.

And that's it! Press the **Import** button and wait while **bitbucket** fetches the code from **github**. Nice feature — you can migrate your existing source code from **github** in several minutes. Don't forget to add your SSH key to your **bitbucket** account if you want to commit to the migrated repository.

## Alternatives

There are many other similar services:

* [Unfuddle](http://unfuddle.com/)
* [repositoryhosting.com](http://repositoryhosting.com/)
* [Assembla](http://www.assembla.com/)
* [Beanstalkapp](http://beanstalkapp.com/)
* [InDefero](http://www.indefero.net/)
* [Project Locker](http://www.projectlocker.com/)
* [Codebase](http://www.codebasehq.com/)
* [Springloops](http://www.springloops.com/v2)
* [Gitorius](http://gitorious.org/)
* [SourceRepo](http://sourcerepo.com/)
* [Bettercodes](http://bettercodes.org/)
* [Codeplane](https://codeplane.com/)
* [Codesion](http://codesion.com/)
* [XP-dev](http://xp-dev.com/)

But they have more restrictions or higher prices. So my choice is **bitbucket**!
