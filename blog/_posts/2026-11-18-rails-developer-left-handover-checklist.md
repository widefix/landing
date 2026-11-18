---
layout: post
title: "Your Rails developer left: a handover checklist for founders"
headline: "Recover access and give your Rails application a technical owner"
description: "A founder’s Rails handover checklist: accounts, critical workflows, first technical checks, business decisions and the deliverables to agree before takeover work."
tags: [rails, maintenance, technical-ownership]
featured_post: false
toc: true
image: rails-handover-checklist.svg
image_svg: rails-handover-checklist.svg
---

When a developer leaves, I would start with two questions: can the business still operate the application, and who can safely release the next change? A repository alone does not answer either one.

You do not need to become a Rails engineer to arrange a handover. You need a record of the accounts the business controls, the customer workflows that matter and the decisions a new technical owner can make. This is the checklist I would use to prepare that conversation.

## First, record what the business controls

List the account owner, who currently has access, where recovery goes and what is missing. Use company-controlled accounts and scoped invitations where possible. Do not put passwords, recovery codes, API keys or customer data into an enquiry or shared checklist.

| Area | What to locate | What an engineer needs to verify |
| --- | --- | --- |
| Source code | Repository organization, administrators and access to the current code | Which branch and commit are running in production; whether the app can be set up from the repository |
| Hosting and billing | Hosting provider, billing owner, administrator and recovery contact | Production services, background workers, scheduled tasks and deployment access |
| Domain and DNS | Registrar, DNS provider, renewal owner and recovery email | Where the domain points and which records support the app and email |
| Database and files | Database service, upload storage and backup provider | Backup age, retention, restore procedure and whether a restore has been tested |
| Payments and integrations | Payment accounts, email delivery and essential third-party services | Webhook destinations, failure handling and which credentials need rotation |
| Releases and monitoring | CI service, deployment instructions, error tracking and incident contacts | Whether a release and recovery path can be reproduced and who receives alerts |
| Mobile and other clients | App store accounts and teams consuming the Rails API, if relevant | Compatibility constraints and how changes reach those clients |

If an account belongs to the departing developer, ask for a documented transfer while they are available. If they are unavailable, use the provider’s legitimate business recovery process. Missing access belongs in the risk list; it is not something a new engineer can promise to recover immediately.

## Write down the workflows that pay the bills

Tell the incoming team what a customer must be able to do: sign up, pay, access a subscription, place an order or receive a notification. Include a known example of a failure and its business impact where you can share it safely.

Also list work already promised to customers, recurring incidents and upcoming deadlines. This gives the team a basis for priorities. It is more useful than asking them to make every dependency current before they understand the product.

## What WideFix checks first

At WideFix, we agree the investigation scope, access, budget and expected output before starting. The initial review connects your business priorities to the code and operating environment:

- Identify the deployed application, Ruby and Rails versions, key dependencies and essential integrations
- Review available tests and identify checks around the critical workflows being changed
- Inspect jobs, error reports and known incidents where access and scope allow
- Trace deployment, backups and recovery instructions, recording what was actually verified
- Separate urgent defects from risks that need further investigation and longer-term improvements

A missing test is a reason to choose the next check carefully. It is not evidence that every part of the application needs a rewrite. An initial review also does not automatically include an exhaustive security audit, a successful restore exercise or production changes; those activities need an agreed scope.

## What our existing work illustrates

In [HipChip’s takeover and payment work](/showcases/hipchip-stripe-ach-integration), WideFix inherited a legacy Rails application after its developer left. Our work included automated tests, continued maintenance and a move to Stripe, with ACH payments added and Braintree retained as a backup. For a founder, the lesson is to identify the payment accounts and the current payment behavior before changing the integration.

With [Worship Online](/showcases/worshiponline-application-support-maintenance), a redesign request coincided with a developer handover. The work extended to defects, test coverage, specialist coordination and continued delivery. That is why I would ask about mobile clients and other consumers of the Rails API early: a new interface is only one part of a working product.

These are examples from WideFix’s delivery account, not a promise that every inherited app needs the same work. Each case links to client feedback and explains which parts that feedback corroborates.

## Decisions the founder still owns

The technical team should investigate causes, organize implementation and explain trade-offs. You still decide:

- Which customer problems and deadlines come first
- Who can authorize account transfers, access and spending
- Which business behavior must remain compatible
- Whether to approve a larger scope, extra budget or a proposed release window
- What support availability, incident contacts and response expectations the business needs

Agree who can approve routine changes and what must come back to you. This reduces interruptions while keeping business decisions with the people responsible for them. Monitoring does not by itself mean an engineer is available around the clock.

## What to agree as the initial review’s output

Ask for a written record that a second engineer can use without repeatedly calling the outgoing developer:

1. **An access and responsibility map:** services, account owners, technical contacts and unresolved access gaps, without copying secrets into the document
2. **A prioritized assessment:** verified findings, assumptions, important unknowns and their business consequences
3. **Operating notes:** the documented release and recovery paths, which steps were tested and what remains unverified
4. **A first delivery milestone:** scope, estimate, acceptance checks, approvals and release considerations
5. **A continuity plan:** communication rhythm, support arrangements and where the team records decisions and completed work

Agree the output and price before the review rather than assuming a monthly budget includes unlimited investigation. WideFix’s monthly plans include the initial assessment within the first month’s hours up to $3,000; the work consumes that shared allocation. See the current [maintenance budgets and incident coverage terms](/ruby-on-rails-maintenance#maintenance-budgets).

## A practical next step

WideFix takes technical ownership of existing Ruby on Rails applications and provides ongoing maintenance after the handover. If your developer has left, send a short description of the product, the customer problem, the access gaps you know about and your priorities. We can agree a bounded first step through our [Rails application takeover service](/ruby-on-rails-application-takeover). If the handover is already complete, explore [ongoing Rails maintenance](/ruby-on-rails-maintenance) or [legacy Rails maintenance](/legacy-ruby-on-rails-maintenance) for continued care and incremental modernization.
