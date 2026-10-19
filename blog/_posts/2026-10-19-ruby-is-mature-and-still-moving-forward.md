---
layout: post
title: "Ruby Is Mature and Still Moving Forward"
headline: "Ruby Is Mature and Still Moving Forward"
description: "My takeaways from the 2026 Rails Community Survey: new applications, practical architecture, shared maintenance challenges, and reasons to feel optimistic."
tags: [ruby, rails, community, open-source]
comments: true
share: true
toc: true
featured_post: false
image_svg: ruby-mature-community.svg
related_posts:
  - /ruby-wont-die-while-we-still-love-it/
  - /your-rails-app-still-works-is-it-still-supported/
---

I recently read the [2026 Ruby on Rails Community Survey](https://railsdeveloper.com/survey/2026), and it left me feeling optimistic.

My main takeaway: **Ruby has a mature community with a great future.**

For me, maturity means knowing which problems deserve attention, keeping useful software alive, and being willing to change how we work. Here are the things that stood out to me.

The percentages below describe survey respondents, rather than the entire Ruby ecosystem. Some questions allowed multiple answers.

## New applications still have a place

About 18% reported applications under development for three years or less.

I find that encouraging. Choosing a framework for a new application is a decision about the future. You are choosing the tools you expect to maintain, hire for, and build on.

I would happily choose Rails for a new product today. Being able to express business rules clearly and get a working application into users' hands still matters to me.

## Local development tools keep improving

[mise](https://mise.jdx.dev/) reached roughly 38% adoption among respondents.

This was one of my discoveries from the report. mise brings development tool versions, environment variables, and tasks into one CLI.

I like the direction. When joining a project, I want to understand how to run it without collecting setup instructions from several teammates. Anything that makes that process easier deserves a closer look.

## Maintenance needs a place on the roadmap

Among upgrade blockers, insufficient time led at 55%; lack of priority followed at 48%.

This is the finding I would most like application owners to think about.

My view is that maintenance needs an owner and time allocated to it. Otherwise, it is easy to keep postponing an upgrade because the application still works and another feature feels more urgent.

I want teams to be able to make small, regular improvements without waiting for an emergency. That means treating dependency updates, reliable tests, and understandable code as part of looking after a product.

## Keeping an application together is a reasonable choice

Monoliths accounted for about 81%; microservices, about 4%.

I read this as a sign of practical architectural judgment. Microservices still have their uses, but I don't want to introduce separate deployments, network boundaries, and distributed debugging without a concrete reason.

For many products, I would rather invest that effort in making the application easier to understand. Clear boundaries inside a Rails application can be valuable without requiring a separate service for every responsibility.

## Solid Queue has room to grow

Sidekiq appeared in 61% of responses, Solid Queue in 35%, and Delayed Job in 12%. These overlap; they are not exclusive market shares.

Sidekiq's lead makes sense to me. Replacing a working job processor needs a reason, especially when background jobs handle important business workflows.

Still, **I think Solid Queue has a great future**. It is already the default for new Rails applications, as the survey notes. My prediction is that it will become the natural long-term choice for more teams as they start projects and evaluate their infrastructure.

That is a prediction, rather than something these adoption numbers can prove.

## Welcoming newcomers still takes work

The 28% figure concerns limited web experience before learning Rails, not current newcomers.

That distinction changes the story. We cannot use it to establish a connection between new developers and recently started applications.

But it makes me think about our responsibility as experienced Ruby developers. I want someone discovering Rails today to find patient explanations, approachable projects, and people willing to help. A mature community should make its accumulated knowledge easier to access.

## Open source is a shared responsibility

Only 15% said they had never contributed to open source.

As a gem author, I find that heartening. I value the person who reports a confusing error, explains a reproduction case, or improves documentation. Those contributions help me understand what people need.

I also want contributing to feel manageable. You should not need to become a full-time maintainer to help improve a tool you use.

## Even a loved gem can be frustrating

Devise topped both the frustrating and most-loved gem lists.

I like that detail. Depending on a tool and enjoying every interaction with it are different experiences. I would be careful about reading a frustration ranking as a verdict on quality without knowing how widely each gem is used.

And yes, I was relieved not to see my gems, [ActualDbSchema](https://widefix.com/actual-db-schema) and [MigrationData](https://widefix.com/migration-data), in the published frustration list. I will take that small comfort, while continuing to listen to issues from their users.

## Established applications keep shipping

Multiple daily deployments rose from 37% in 2024 to about 41% in 2026.

That is encouraging progress. I like working toward a delivery process where a small improvement can reach users promptly and the team can see what happens afterward.

Deployment frequency alone does not tell me whether a product is healthy. But I would much rather have the option to ship a focused fix when it is ready than wait for a large release to come together.

## Experience does not have to mean resistance to change

For AI, 57% reported regular integration and 30% experimentation.

I would not describe everyone outside those groups as skeptical or unable to see value. Adoption and opinion are different questions.

What interests me is the willingness to try a different way of working. I want to keep that curiosity while remaining responsible for the software I deliver. Using a new tool still leaves me with the job of understanding the problem, checking the result, and maintaining it afterward.

## Why I feel optimistic

The survey measures confidence in Rails more directly than Ruby's future: about 91% called Rails their server-side framework of choice.

For me, the strongest reason for optimism is the combination of continuity and curiosity. I want to work in a community where we can value years of experience while still questioning our tools and habits.

There is work ahead. I want us to make maintenance easier to prioritize, help newcomers find their footing, and support the people maintaining our dependencies.

Those are worthwhile problems to spend time on. I still enjoy building with Ruby, and this report gives me more reasons to keep investing in it.

**Ruby is a mature community with a great future, and I want to help build that future.**

## Taking ownership of the applications already here

That future includes the Rails applications businesses already depend on. For their owners, confidence in Ruby becomes more useful when someone takes responsibility for the application: understanding its business rules, making risks visible, planning maintenance, and following changes through to production.

This is the work we focus on at WideFix. We help businesses [take over existing Ruby on Rails applications](https://widefix.com/ruby-on-rails-application-takeover) and provide [ongoing Rails maintenance](https://widefix.com/ruby-on-rails-maintenance). A handover should give the business a team that understands the product and owns its continued care. Maintenance then needs a place alongside feature delivery, with clear priorities and communication.

If your Rails application still serves your business but needs someone to take technical ownership, [tell us about the application and the challenges you are facing](https://widefix.com/contact). We can discuss a practical next step for its takeover and long-term maintenance.
