# PostgreSQL performance consulting — unpublished draft

Status: hold publication. This file is outside `src/app`; there is no public route or sitemap entry yet.
Planned route: `/postgresql-performance-consulting`
Title: PostgreSQL Performance Consulting & Query Optimization | WideFix
Description: Diagnose slow SQL, execution plans, indexes, locks and connection pressure with a measured PostgreSQL investigation and prioritized optimization plan.

## Buyer problem

Slow SQL, blocked transactions and connection pressure can make a Rails application unreliable even when adding workers or larger servers appears to help. We investigate the database workload and agree which bottlenecks to address first.

## Investigation scope

- Slow SQL: identify expensive and frequently executed statements and connect them to customer workflows.
- Execution plans: review estimated and actual row counts, scan and join choices and buffer usage under representative conditions.
- Indexes: assess query patterns, selectivity, redundant indexes and the write cost of proposed changes.
- Locks: inspect blocking transactions, transaction duration and contention around updates and migrations.
- Connections: review application pools, worker concurrency, active sessions and saturation.

## Deliverables

An agreed baseline and representative workload; query and plan evidence; prioritized findings with effort, risk and expected impact; implementation scope; and a before-and-after report for delivered changes. Record dataset size, PostgreSQL version, hardware, concurrency and cache conditions so comparisons can be assessed. Include rollout, rollback and monitoring instructions.

## Evidence required before publishing

Add a real, attributable database investigation with permission to disclose its details. Document the original SQL or anonymized query shape, plan evidence, the diagnosed cause, actual intervention and measured results under comparable conditions. Include tradeoffs and limitations. Do not substitute a demo benchmark or an application-level page-load result for production database evidence.

CostaDelHome documents a search page improvement from 10 seconds to 100ms, but the current case study does not identify a PostgreSQL intervention. It can link to related Rails performance work after this page is published; it cannot serve as the database proof.

Related technical reading: `/blog/importance-sql-for-rails-experts/` and `/blog/financial-plan-on-postgresql/`. These show SQL knowledge and demonstrations, not a measured client PostgreSQL investigation.

## Enquiry CTA

Discuss your PostgreSQL bottleneck. Share the affected workflow, observed latency, workload and current hosting setup. Agree access, investigation scope and success criteria before starting.

## Publication steps once evidence is ready

Use the existing focused-service page layout, with distinct canonical and social metadata. Link from the services overview, the documented database case study, Rails performance, and relevant SQL articles. Check generated HTML and sitemap before release.
