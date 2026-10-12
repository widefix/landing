import FocusedServicePage, { serviceMetadata, type FocusedService } from '@/components/rails/FocusedServicePage';

const service: FocusedService = {
  "slug": "ruby-on-rails-performance",
  "title": "Ruby on Rails Performance Audit & Optimization | WideFix",
  "description": "Rails performance consulting for slow requests, N+1 queries, queues, memory and timeouts. A measured audit, prioritized fixes and before-and-after validation.",
  "heading": "Ruby on Rails performance: find the bottleneck, measure the improvement",
  "intro": "CostaDelHome’s search pages went from 10 seconds to 100ms after our performance work. If slow requests or background processing are holding your product back, we investigate the cause and validate changes against an agreed baseline.",
  "image": "/img/showcases/costa-del-home-search.svg",
  "imageAlt": "CostaDelHome search performance: 10 seconds to 100ms",
  "cta": "Discuss a Rails performance audit",
  "sections": [
    {
      "id": "bottlenecks",
      "title": "Where we investigate",
      "items": [
        {
          "title": "Slow requests and database access",
          "detail": "Trace slow endpoints, repeated queries and N+1 loading. Review SQL, execution plans, indexes and caching when the database is involved; separate database time from Ruby work and external calls.",
          "icon": "review"
        },
        {
          "title": "Queues and timeouts",
          "detail": "Inspect queue age, throughput, retries and worker contention. Trace long-running jobs and third-party calls that can block processing or exhaust request time limits.",
          "icon": "production"
        },
        {
          "title": "Memory and application work",
          "detail": "Profile object allocation, memory growth and expensive Ruby processing. Review payload size and rendering work before deciding whether more infrastructure is justified.",
          "icon": "expertise"
        }
      ]
    },
    {
      "id": "audit-deliverables",
      "title": "What you receive from the audit",
      "items": [
        {
          "title": "Reproducible baseline",
          "detail": "Agree the slow workflows, representative dataset and load conditions. Record request timings, query counts, queue delay or memory use as appropriate, together with the measurement method.",
          "icon": "review"
        },
        {
          "title": "Findings and prioritized fixes",
          "detail": "Receive traced bottlenecks with supporting evidence, proposed changes, expected impact, effort and risk. Distinguish quick fixes from changes that need a separate implementation scope.",
          "icon": "priorities"
        },
        {
          "title": "Implementation and validation",
          "detail": "Agree whether the engagement covers diagnosis only or delivery too. For implemented changes, compare the same workload before and after, check correctness and document monitoring and rollback steps.",
          "icon": "ownership"
        }
      ]
    },
    {
      "id": "measurement",
      "title": "How improvement is measured",
      "intro": "Success criteria belong to your application. The CostaDelHome result is a documented client outcome, not a guaranteed result for every project.",
      "items": [
        {
          "title": "Comparable workloads",
          "detail": "Use the same workflow, dataset and environment for before-and-after comparisons. Record cache state and concurrency so a faster result can be explained.",
          "icon": "review"
        },
        {
          "title": "Customer and operational metrics",
          "detail": "Track median and tail request latency where traffic allows, error and timeout rates, queue wait time and worker throughput. Confirm that faster processing preserves the expected behavior.",
          "icon": "momentum"
        }
      ]
    }
  ],
  "evidence": [
    {
      "title": "CostaDelHome: 100× faster search",
      "detail": "Documented search page loading fell from 10 seconds to 100ms, a 99% reduction. The case study reports an application-level result; it does not identify a PostgreSQL-specific intervention.",
      "href": "/showcases/costa-del-home-search-performance",
      "icon": "momentum"
    },
    {
      "title": "ShopWired: queue recovery",
      "detail": "Redesigned DelayedJob handling and dispatching to unblock a stalled queue and eliminate recurring daily Heroku H12 errors.",
      "href": "/showcases/shopwired-queue-optimization",
      "icon": "production"
    }
  ],
  "reading": [
    {
      "title": "PostgreSQL performance consulting",
      "href": "/postgresql-performance-consulting",
      "icon": "review",
      "detail": "Investigate slow SQL, execution plans, indexes, locks and connection pressure with a focused database engagement."
    },
    {
      "title": "Why SQL knowledge matters for Rails performance",
      "href": "/blog/importance-sql-for-rails-experts/",
      "icon": "review",
      "detail": "Explore how SQL knowledge helps identify bottlenecks and improve Rails application performance."
    },
    {
      "title": "Measuring Rails optimization with Ruby and SQL",
      "href": "/blog/optimize-performance-of-rails-app-with-chatgpt/",
      "icon": "review",
      "detail": "Read a practical comparison of Ruby and SQL approaches, with measurements of optimization results."
    },
    {
      "title": "Rails rescue and production stabilization",
      "href": "/ruby-on-rails-rescue",
      "icon": "production",
      "detail": "Diagnose recurring failures, stabilize production and document a recovery plan."
    },
    {
      "title": "Ongoing Rails maintenance",
      "href": "/ruby-on-rails-maintenance",
      "icon": "ownership",
      "detail": "Keep production support, dependency updates and continued feature development in one prioritized backlog."
    }
  ]
};

export const metadata = serviceMetadata(service);

export default function Page() {
  return <FocusedServicePage service={service} />;
}
