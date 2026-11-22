---
layout: post
title: "What happens when your Rails app breaks after hours?"
headline: "What happens when your Rails app breaks after hours?"
date: 2026-11-22 19:55:00 +0100
description: "WideFix founder Andrei Kaleshka explains when he can act on urgent Rails issues outside business hours and what teams should agree on before an incident."
tags: [rails, maintenance, production-support, technical-ownership]
featured_post: false
toc: true
image: urgent-rails-issues-after-hours.svg
image_svg: urgent-rails-issues-after-hours.svg
author:
  name: Andrei Kaleshka
  linkedin: ka8725
---

If I support your Ruby on Rails app and an urgent production issue comes up outside business hours, I can start investigating when I'm online and available. That might be in the evening or early in the morning. **It's flexible availability, not 24/7 on-call coverage.** If you need a guaranteed acknowledgement window, agree it before an incident.

I don't work a fixed nine-to-five. One of the things I enjoy most about this job is following a clue through an application and finding out why something that should work doesn't. When that something is checkout, it matters whether the next customer can pay. If I'm already online and can help, I don't see a reason to wait for office hours just because the clock says the workday is over.

## What makes a Rails issue urgent?

I start with what people can't do. Are customers unable to check out, or did one payment fail with a clear way to retry? Is a backlog still draining, or has processing stopped? A noisy alert can wait if the affected workflow still works. A quiet failure that leaves customers stuck can be more urgent.

When that happens, I look for the safest way to restore the workflow. That might mean rolling back a release or fixing the underlying problem, depending on what we know. The first useful update is what I've confirmed, who's affected and what I'm trying next. I don't promise a fix time before I know what broke.

## What a stalled queue meant for ShopWired

On a Rails application we worked on for ShopWired, the background job queue had stopped moving. Work that depended on third-party API calls was stuck, and the application was also seeing recurring Heroku request timeouts. WideFix changed how Delayed Job work was handled and dispatched. In our [ShopWired queue recovery case study](/showcases/shopwired-queue-optimization), we reported that the backlog cleared and the recurring timeouts stopped.

The case study doesn't establish what time of day the recovery happened or how long it took. What it does show is why a stalled queue can jump ahead of planned work: once processing stops, work that the business depends on stops with it.

## What should you agree on before the next incident?

When WideFix takes over an existing Rails application, technical ownership means learning which workflows the business depends on, who has production access, and how to deploy or roll back safely. Ongoing maintenance keeps that knowledge current. If I see an urgent message and can act, I want to spend that time investigating, not hunting for a login or asking who can approve a rollback.

Agree on one channel for urgent reports, who can act or approve a rollback, and what should happen if nobody acknowledges the report within the agreed window. Decide whether you need coverage outside business hours and specify the time zone. A commitment to acknowledge an incident and an estimate for restoring service are two different things.

If you're handing over an app, bring one example of a failure your business couldn't leave until morning. Use it to [discuss response arrangements for Rails maintenance](/ruby-on-rails-maintenance#after-hours-support) before you need them.
