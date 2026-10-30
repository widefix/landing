import FocusedServicePage, { serviceMetadata, type FocusedService } from '@/components/rails/FocusedServicePage';

const service: FocusedService = {
  "slug": "ruby-on-rails-performance",
  "title": "Ruby on Rails Performance Optimization & Tuning | WideFix",
  "description": "Ruby on Rails performance optimization for slow pages, PostgreSQL queries and stalled jobs. Get a measured audit, prioritized fixes and before-and-after validation.",
  "heading": "Ruby on Rails performance optimization for your existing application",
  "intro": "Slow pages, timeouts and delayed jobs make customers wait and interrupt your team. WideFix investigates the bottleneck, delivers agreed fixes and measures the result. Our Rails performance tuning covers Ruby code, ActiveRecord, PostgreSQL and background processing without starting with a rewrite.",
  "image": "/img/showcases/costa-del-home-search.svg",
  "imageWidth": 687,
  "imageHeight": 377,
  "imageAlt": "CostaDelHome search performance: 10 seconds to 100ms",
  "cta": "Discuss your Rails performance",
  "sections": [
    {
      "id": "when-to-start",
      "title": "When slow Rails performance becomes a business problem",
      "items": [
        {
          "title": "Customers wait for everyday tasks",
          "detail": "Search, dashboards or reports take too long to open. Start with the workflows customers actually use and a target response time, rather than optimizing code that is already fast enough.",
          "icon": "momentum"
        },
        {
          "title": "Jobs delay work and interrupt teammates",
          "detail": "Backed-up queues delay imports, notifications or integrations. Investigate the processing path so your team can spend less time retrying jobs and answering questions about missing updates.",
          "icon": "production"
        },
        {
          "title": "Your team needs specialist help",
          "detail": "A busy developer, inherited codebase or unclear bottleneck can leave performance work stuck. Bring in a Rails specialist for a bounded investigation, with findings your team can use or ask us to implement.",
          "icon": "expertise"
        }
      ]
    },
    {
      "id": "bottlenecks",
      "title": "Where we investigate",
      "items": [
        {
          "title": "Slow requests and database access",
          "detail": "Trace slow endpoints, repeated ActiveRecord queries and N+1 loading. Review PostgreSQL execution plans, indexes and caching when the database is involved; separate database time from Ruby work and external calls.",
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
        },
        {
          "title": "A handover your team can reuse",
          "detail": "Document the benchmark, changes and monitoring checks so teammates can investigate future slowdowns without depending on the original developer. Agree whether follow-up belongs with your team or ongoing WideFix maintenance.",
          "icon": "handover"
        }
      ]
    }
  ],
  "evidenceHeading": "Rails performance results from existing client applications",
  "evidence": [
    {
      "title": "CostaDelHome: 100× faster search",
      "detail": "Documented search page loading fell from 10 seconds to 100ms, a 99% reduction. The case study reports an application-level result; it does not identify a PostgreSQL-specific intervention.",
      "href": "/showcases/costa-del-home-search-performance",
      "icon": "momentum"
    },
    {
      "title": "Kajabi Experts: Ruby processing moved into SQL",
      "detail": "Made slow Rails pages usable by moving expensive Ruby-side processing into SQL. The published benchmark measured 79.74× higher processing throughput, not an end-to-end page speed guarantee.",
      "href": "/showcases/kajabi-experts-performance",
      "icon": "review"
    },
    {
      "title": "ShopWired: queue recovery",
      "detail": "Redesigned DelayedJob handling and dispatching to unblock a stalled queue and eliminate recurring daily Heroku H12 errors.",
      "href": "/showcases/shopwired-queue-optimization",
      "icon": "production"
    }
  ],
  "articlesHeading": "Rails and PostgreSQL performance articles from our engineering work",
  "articles": [
    {
      "title": "Why SQL knowledge matters for Rails performance",
      "href": "/blog/importance-sql-for-rails-experts/",
      "icon": "review",
      "detail": "Explore how SQL knowledge helps identify bottlenecks and improve Rails application performance."
    },
    {
      "title": "Optimizing Rails with ChatGPT, Ruby and SQL",
      "href": "/blog/optimize-performance-of-rails-app-with-chatgpt/",
      "icon": "review",
      "detail": "Compare measured Ruby and SQL implementations, and see why generated optimizations still need correctness checks."
    },
    {
      "title": "Select the latest records with PostgreSQL window functions",
      "href": "/blog/select-unique-latest-grouped-records-from-db/",
      "icon": "review",
      "detail": "Build a recent-records query in SQL and integrate it with ActiveRecord instead of grouping the data in Ruby."
    },
    {
      "title": "Benchmarking Rails URL generation",
      "href": "/blog/rails-url-for-helper-can-be-slow/",
      "icon": "expertise",
      "detail": "A historical Rails benchmark showing how helper choices affect rendering work. Re-measure on your current Rails version before applying its conclusions."
    }
  ],
  "relatedServicesIntro": "Start with a focused performance engagement, or connect the findings to database consulting, application rescue or ongoing maintenance.",
  "reading": [
    {
      "title": "PostgreSQL performance consulting",
      "href": "/postgresql-performance-consulting",
      "icon": "review",
      "detail": "Investigate slow SQL, execution plans, indexes, locks and connection pressure with a focused database engagement."
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
  return <FocusedServicePage service={service} className="rails-performance" />;
}
