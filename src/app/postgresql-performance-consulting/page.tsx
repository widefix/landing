import ServiceRecognition from '@/components/rails/ServiceRecognition';
import FocusedServicePage, { serviceMetadata, type FocusedService } from '@/components/rails/FocusedServicePage';

const service: FocusedService = {
  "slug": "postgresql-performance-consulting",
  "title": "PostgreSQL Performance Consulting & Query Optimization | WideFix",
  "description": "PostgreSQL performance consulting for slow SQL, execution plans, indexes, locks and connection pressure. Get a measured investigation and prioritized optimization plan.",
  "heading": "PostgreSQL performance consulting for your existing application",
  "intro": "Slow SQL, blocked transactions and connection pressure can hold back a working product. We connect database bottlenecks to customer workflows, investigate the workload and agree which changes to make first.",
  "image": "/img/rails-services-hero.svg",
  "imageAlt": "Database investigation and optimization for existing applications",
  "cta": "Discuss your PostgreSQL bottleneck",
  "evidencePosition": "after-hero",
  "sections": [
    {
      "id": "investigation",
      "title": "Investigate the workload behind the slowdown",
      "items": [
        {
          "title": "Slow SQL and execution plans",
          "icon": "review",
          "detail": "Identify expensive and frequently executed statements. Review row estimates, scans, joins and buffer usage under representative conditions, then connect the findings to application workflows."
        },
        {
          "title": "Indexes and locking",
          "icon": "production",
          "detail": "Review query patterns, index selectivity and write costs. Investigate blocking transactions and long-running updates before proposing changes."
        },
        {
          "title": "Connection pressure",
          "icon": "expertise",
          "detail": "Review application pools, worker concurrency and active sessions. Distinguish database saturation from slow application work before adding capacity."
        }
      ]
    },
    {
      "id": "deliverables",
      "title": "A measured investigation and practical optimization plan",
      "items": [
        {
          "title": "Baseline and findings",
          "icon": "review",
          "detail": "Agree the affected workflow and representative workload. Record query timings, plans and relevant workload conditions, then prioritize findings by impact, effort and risk."
        },
        {
          "title": "Implementation and validation",
          "icon": "ownership",
          "detail": "Agree diagnosis-only or implementation scope. Compare delivered changes under the same workload, check correctness and document rollout, rollback and monitoring steps."
        },
        {
          "title": "Clear access and scope",
          "icon": "communication",
          "detail": "Agree database access and handling of sensitive data before starting. Use anonymized queries or a representative environment when appropriate; agree production investigation steps with your team."
        }
      ]
    }
  ],
  "evidenceEyebrow": "Client work and engineering evidence",
  "evidenceHeading": "SQL optimization for Kajabi Experts",
  "evidence": [
    {
      "title": "Kajabi Experts: Rails and SQL optimization",
      "detail": "When slow pages were effectively unusable, we moved expensive Ruby-side processing into SQL and checked that the page returned the expected data. WideFix measured 79.74× higher processing throughput and separately reported page loads falling from over 30 seconds to 300 ms. These are project-specific results, not Core Web Vitals measurements.",
      "href": "/showcases/kajabi-experts-performance",
      "icon": "momentum",
      "linkLabel": "Read the Kajabi Experts case study"
    },
    {
      "title": "How the Ruby and SQL benchmark was run",
      "detail": "Read WideFix’s write-up for the benchmark setup, query changes and measurements behind the Kajabi Experts case study.",
      "href": "/blog/importance-sql-for-rails-experts/",
      "icon": "review",
      "linkLabel": "Read the engineering article"
    },
    {
      "title": "Public Ruby and SQL benchmark demo",
      "detail": "Inspect WideFix’s example implementations and run your own comparison. The demo is not the client application or an independent measurement of its page speed.",
      "href": "https://github.com/widefix/demo-fast-sql",
      "icon": "expertise",
      "linkLabel": "Inspect the benchmark demo on GitHub"
    },
    {
      "title": "PostgreSQL work listed on Clutch",
      "detail": "WideFix’s company overview on Clutch lists PostgreSQL, performance and architecture work. This is a service description, not independent verification of the Kajabi results.",
      "href": "https://clutch.co/profile/widefix",
      "icon": "review",
      "linkLabel": "See the Clutch company overview"
    }
  ],
  "reading": [
    {
      "title": "Ruby on Rails performance audit",
      "detail": "Investigate requests, queues, memory and database access together when the bottleneck crosses application boundaries.",
      "href": "/ruby-on-rails-performance",
      "icon": "momentum"
    },
    {
      "title": "Production rescue and stabilization",
      "detail": "Restore an unreliable application and document recovery steps.",
      "href": "/ruby-on-rails-rescue",
      "icon": "production"
    }
  ]
};

export const metadata = serviceMetadata(service);

export default function Page() {
  return <FocusedServicePage service={service}><ServiceRecognition kind="database" /></FocusedServicePage>;
}
