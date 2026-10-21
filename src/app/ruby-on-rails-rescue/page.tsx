import FocusedServicePage, { serviceMetadata, type FocusedService } from '@/components/rails/FocusedServicePage';

const service: FocusedService = {
  "slug": "ruby-on-rails-rescue",
  "title": "Ruby on Rails Rescue & Production Stabilization | WideFix",
  "description": "Rescue a troubled Rails application: diagnose recurring crashes, stalled jobs, broken integrations and unreliable deployments, then stabilize and document recovery.",
  "heading": "Ruby on Rails rescue for a troubled application",
  "intro": "Recurring crashes, stalled jobs and broken integrations can make every release feel risky. We diagnose the immediate failure, restore dependable processing and leave a recovery plan your team can use.",
  "image": "/img/showcases/shopwired-queue-rescue.svg",
  "imageAlt": "ShopWired: stalled queue recovery and production stabilization",
  "cta": "Discuss your Rails recovery priorities",
  "sections": [
    {
      "id": "diagnosis",
      "title": "Start with the failure affecting your business",
      "items": [
        {
          "title": "Crashes and timeouts",
          "detail": "Trace logs, exceptions and infrastructure signals to identify failing requests, resource pressure and recurring errors. Establish the incident scope and customer impact.",
          "icon": "production"
        },
        {
          "title": "Stalled jobs and broken integrations",
          "detail": "Inspect queue state, retries, external API failures and webhook processing. Check duplicate-processing and data consistency risks before retrying or replaying work.",
          "icon": "momentum"
        },
        {
          "title": "Unreliable deployments",
          "detail": "Review release steps, configuration, migrations and rollback options. Identify the changes that make production fail and the access needed to recover safely.",
          "icon": "upgrades"
        }
      ]
    },
    {
      "id": "recovery",
      "title": "Diagnosis, stabilization and recovery",
      "items": [
        {
          "title": "Diagnose and agree a recovery plan",
          "detail": "Document the likely root cause, affected workflows and immediate options. Agree the safest recovery steps, responsibilities and communication cadence.",
          "icon": "review"
        },
        {
          "title": "Stabilize production",
          "detail": "Implement the agreed fixes, restore processing and verify critical workflows. Make retries and recovery explicit so a restart does not conceal the underlying problem.",
          "icon": "production"
        },
        {
          "title": "Reduce repeat incidents",
          "detail": "Add targeted tests, monitoring and error handling. Separate immediate fixes from the larger upgrade, refactoring or infrastructure backlog.",
          "icon": "ownership"
        }
      ]
    },
    {
      "id": "deliverables",
      "title": "What recovery leaves behind",
      "intro": "We agree access, availability and response arrangements before starting. Start by describing the affected workflow, when failures began and the logs or monitoring available. The initial discussion establishes whether the required incident coverage fits our capacity.",
      "items": [
        {
          "title": "Incident findings and validated fixes",
          "detail": "Receive the diagnosis, changes delivered, checks performed and any unresolved risks. Compare the affected workflow before and after the fix using request errors, queue progress or integration consistency. Agree an observation period and document what the evidence does and does not establish.",
          "icon": "review"
        },
        {
          "title": "Recovery runbook and next priorities",
          "detail": "Document operational checks, escalation contacts, rollback and replay steps, plus a prioritized follow-up backlog. Agree ongoing maintenance separately when the application is stable.",
          "icon": "priorities"
        }
      ]
    }
  ],
  "evidence": [
    {
      "title": "ShopWired: a stalled queue restored",
      "detail": "Analyzed and redesigned DelayedJob handling and dispatching, unblocked the completely stalled queue and eliminated H12 errors that had occurred multiple times per day. Added monitoring and error handling.",
      "href": "/showcases/shopwired-queue-optimization",
      "icon": "momentum"
    },
    {
      "title": "Worship Online: inherited defects addressed",
      "detail": "Took ownership during a developer handover, repaired existing defects and added automated tests while continuing product delivery.",
      "href": "/showcases/worshiponline-application-support-maintenance",
      "icon": "ownership"
    }
  ],
  "reading": [
    {
      "title": "Rails performance audits and optimization",
      "href": "/ruby-on-rails-performance",
      "icon": "momentum",
      "detail": "Investigate slow requests, queries, queues and memory usage with a measured audit and prioritized fixes."
    },
    {
      "title": "Planned legacy Rails modernization",
      "href": "/legacy-ruby-on-rails-maintenance",
      "icon": "upgrades",
      "detail": "Plan incremental dependency upgrades and modernization while maintaining the working application."
    },
    {
      "title": "Ongoing support after recovery",
      "href": "/ruby-on-rails-maintenance",
      "icon": "ownership",
      "detail": "Keep production support, dependency updates and continued feature development in one prioritized backlog."
    },
    {
      "title": "Rails upgrade lessons: compatibility and job loading",
      "href": "/blog/ruby-and-rails-upgrade-personal-experience/",
      "icon": "review",
      "detail": "Read our Ruby and Rails upgrade experience, including compatibility fixes and background job loading issues."
    }
  ]
};

export const metadata = serviceMetadata(service);

export default function Page() {
  return <FocusedServicePage service={service} />;
}
