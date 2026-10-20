---
layout: post
title: "Kamal Rails deployments: run migrations from the incoming release"
headline: "Kamal Rails deployments: run migrations from the incoming release"
description: "A Rails deployment needs the right migration code, runtime configuration, and failure behavior. Learn why the container running the command matters in a Kamal release."
tags: ["rails", "kamal", "deployment", "maintenance"]
comments: true
share: true
toc: true
---

A deployment builds a new image. Before starting it, a script runs `db:migrate` inside a container that is already serving requests.

The command succeeds. But that running container contains the previous release. The new migration files may not be there at all.

The new application then starts against a schema it expected the deployment to prepare.

This is a release-orchestration risk: the individual command is familiar, while the release containing that command is wrong. Maintaining a Rails application includes inspecting that connection.

## Name the release that performs the work

A pre-deploy hook we reviewed passes the incoming release version into a migration helper and selects the primary web host. Its stated intention is to use a fresh container from the incoming image rather than reuse an already running application container.

That gives the migration step a specific identity: these migration files, from this image, for this deployment.

The [Kamal hooks documentation](https://kamal-deploy.org/docs/hooks/overview/) describes lifecycle integration. The application's own hook and helper determine the actual command and execution context. Review both; the hook name alone does not prove the behavior.

## Configuration must arrive before the migration needs it

The helper in the reviewed repository handles another ordering detail: it uploads role secrets before executing the Rails migration command.

Its comments explain why. In this deployment path, the execution command reads a remote environment file, while the usual application boot uploads current secrets later. A pre-deploy migration cannot depend on configuration that has not yet reached its execution environment.

This is a good example of the work hidden behind “deploy with Kamal.” The maintainers must understand when the image, credentials, database endpoint, and runtime environment become available.

Copying the helper into another project is not a substitute for that review. It subclasses Kamal CLI behavior, so compatibility with the project's pinned Kamal version also needs attention.

## One target is useful, but not the whole concurrency policy

Selecting the primary host avoids deliberately running the same migration command on every web host in that invocation.

It does not by itself prove that two deployment pipelines cannot overlap. Deployment serialization, database migration locking, and operator-triggered commands need their own checks.

Likewise, shell fail-fast settings express the intended failure behavior, but release logs or a staging exercise should establish that a nonzero migration exit actually prevents the next application rollout in the configured deployment path.

## The old application is still a participant

During a rolling deployment, old processes may continue serving traffic while migrations run and new processes start. Background workers may be replaced on another schedule.

A pre-deploy migration must therefore be compatible with the application versions that can still access the database. Adding a new optional field is a different operation from renaming a field that the old release still reads.

When compatibility requires it, split the change across releases: expand the schema, move readers and writers, verify the transition, then remove obsolete structures later.

A correct incoming image does not make a destructive migration safe. Rolling application code back also does not automatically reverse schema changes or recover discarded data.

## Evidence to request before relying on the procedure

Use staging to introduce a harmless pending migration and verify the reported image version, applied schema change, destination database, and resulting application behavior.

Then deliberately fail a migration and confirm the release stops at the intended boundary. Check that logs are useful without exposing credentials. Test the intended application rollback against the resulting schema.

The repository review establishes an explicit deployment design. These operational exercises were not run as part of that review, so no successful deployment or downtime claim follows from it.

## What ongoing maintenance provides

AI can write a hook quickly. Release ownership means tracing its execution context, checking compatibility as tools change, rehearsing failure, and investigating the actual deployment when it stalls.

That is part of [WideFix's Rails maintenance service](https://widefix.com/ruby-on-rails-maintenance/): making the path from a code change to a running application understandable and repeatable.

Before the next deployment, ask which image runs migrations and which configuration it receives. A precise answer is more useful than “the deploy script handles it.”
