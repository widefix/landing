---
layout: post
title: "Rails server migrations: validation and recovery before moving traffic"
headline: "Rails server migrations: validation and recovery before moving traffic"
description: "A new server responding is only one migration checkpoint. Learn how dependency validation, database cutover, backup restoration, and recovery decisions protect a Rails application."
tags: ["rails", "postgresql", "infrastructure", "maintenance"]
comments: true
share: true
toc: true
---

The new server responds. The Rails process is healthy. Someone changes the domain.

Only then does the team discover that sessions fail through the proxy, a background worker still points to the old database, or recently created records are missing from the destination.

Moving a Rails application is a transition between several connected systems. Treating it as a sequence of installation commands leaves the most important questions until customers encounter them.

## A runbook makes the decision points visible

A staging migration runbook we reviewed prepares the replacement stack in parallel, validates dependencies before moving traffic, and postpones cleanup until after a validation window.

It considers database synchronization, deployment, proxy routing, domain changes, off-server backups, and application checks. That is useful evidence of operational planning.

It is a staging document. Its presence does not establish a successful production migration, measured downtime, or a rehearsed recovery. Those require execution evidence.

The lesson is the structure: each transition needs a condition for proceeding and a response if that condition fails.

## Map dependencies through a real user action

A health endpoint is useful, but a customer action may traverse the CDN, proxy, web process, database, session store, background worker, and external service.

Use a validation matrix with named owners and observable results:

| Boundary | Example check |
|---|---|
| Routing and TLS | Intended hostname reaches the intended origin |
| Sessions | Login survives a subsequent authenticated request |
| Database | A controlled write is visible through the expected application path |
| Background work | A queued test job is consumed by the intended worker |
| Media delivery | Existing assets load through the public path |
| Recovery | A backup restores into an isolated environment |

These checks should use controlled data and account for side effects. A staging rehearsal should not unexpectedly send customer messages or charge payment methods.

Changing one dependency at a time helps isolate failures. It does not replace an end-to-end test after the full path is assembled.

## Replication and backup answer different questions

Replication helps keep a destination current. A backup provides a recovery point outside the live write path. A mistaken deletion can propagate through replication; having a replica does not establish that historical data can be recovered.

An off-server backup is only part of the evidence. A restore rehearsal establishes whether the team has the credentials, tools, time, and instructions needed to use it.

The reviewed runbook calls for backups and a documented restore path. It does not supply a measured restore result.

## A database cutover needs an explicit write boundary

An initial dump followed by logical replication requires a consistent snapshot and replication starting point. Simply restoring a dump and later subscribing to new changes can leave a gap. The reviewed top-level plan needs that detail validated in its database procedure before reuse.

[PostgreSQL's logical replication restrictions](https://www.postgresql.org/docs/current/logical-replication-restrictions.html) also matter: schema changes and sequence state require separate handling.

Before switching writers, decide how writes will be paused or coordinated, how replication catch-up will be verified, and how every writer—including workers and scheduled tasks—will be moved. Row counts alone cannot establish full consistency.

These are the details that make a database transition different from copying a folder.

## Rollback changes after the destination accepts writes

Before cutover, abandoning the new environment can be straightforward if the original is still authoritative.

After the new database accepts writes, pointing the application back at the old one can lose access to those new records. A safe recovery may require synchronization, reconciliation, a controlled outage, or repairing the destination instead.

The reviewed document's switch-back guidance must therefore be qualified by the write boundary. Retaining an old server is useful; it does not by itself create a safe rollback path.

Document who makes the recovery decision and what evidence they will use. During an incident, discovering that decision process is expensive.

## Why this is a maintenance service

AI can draft provisioning files and a migration checklist. Someone still has to reconcile those instructions with the actual architecture, rehearse them, observe the transition, and own the recovery decision.

[WideFix's Rails maintenance service](https://widefix.com/ruby-on-rails-maintenance/) includes that ongoing responsibility for the running system.

Before approving a server move, ask the team to show one successful user-flow rehearsal and one demonstrated restore. Those are concrete review artifacts for a change that affects the whole application.
