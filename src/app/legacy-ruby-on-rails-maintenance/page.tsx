import FocusedServicePage, { serviceMetadata, type FocusedService } from '@/components/rails/FocusedServicePage';

const service: FocusedService = {
  "slug": "legacy-ruby-on-rails-maintenance",
  "title": "Legacy Ruby on Rails Maintenance & Modernization | WideFix",
  "description": "Maintain an aging Rails application with outdated dependencies, weak tests and unsupported versions. Plan incremental upgrades and migrations around live workflows.",
  "heading": "Legacy Ruby on Rails maintenance without losing the working product",
  "intro": "An older Rails application can still serve your business well. We assess outdated dependencies, unsupported versions and gaps in tests, then plan incremental modernization while maintaining the features your customers depend on.",
  "image": "/img/showcases/worshiponline-storage-migration.svg",
  "imageAlt": "Incremental storage migration for a live Rails application",
  "cta": "Discuss your legacy Rails application",
  "sections": [
    {
      "id": "assessment",
      "title": "Understand the inherited system first",
      "items": [
        {
          "title": "Version and dependency inventory",
          "detail": "Map Ruby, Rails, gems and services, identify unsupported components and compatibility constraints, and prioritize exposure alongside business-critical workflows.",
          "icon": "review"
        },
        {
          "title": "Tests where they reduce risk",
          "detail": "Identify important flows with weak coverage. Add regression checks around the parts being changed, including payments, jobs and integrations.",
          "icon": "ownership"
        },
        {
          "title": "Operational knowledge",
          "detail": "Review deployments, backups, access and recovery procedures. Document assumptions and gaps before committing to an upgrade path.",
          "icon": "expertise"
        }
      ]
    },
    {
      "id": "modernization",
      "title": "Modernize through planned, reviewable stages",
      "items": [
        {
          "title": "Incremental upgrades",
          "detail": "Separate Ruby and Rails changes where practical, resolve deprecations and incompatible dependencies, and validate each stage before the next release.",
          "icon": "upgrades"
        },
        {
          "title": "Safe data and storage migrations",
          "detail": "Plan compatibility periods, backfills, validation and rollback. Preserve existing URLs, uploads and integrations while old and new implementations coexist.",
          "icon": "handover"
        },
        {
          "title": "Maintenance alongside delivery",
          "detail": "Continue fixing defects and shipping needed features. Prioritize modernization against the available budget instead of allowing an open-ended rewrite to absorb it.",
          "icon": "momentum"
        }
      ]
    },
    {
      "id": "deliverables",
      "title": "A practical maintenance and modernization plan",
      "items": [
        {
          "title": "Risk register and upgrade roadmap",
          "detail": "Receive an inventory of the stack, test and operational gaps, sequenced upgrade steps and the assumptions that affect scope and estimates.",
          "icon": "priorities"
        },
        {
          "title": "Validated changes and handover",
          "detail": "For agreed implementation work, receive compatibility fixes, regression coverage, release and rollback notes, and a record of remaining risks.",
          "icon": "handover"
        }
      ]
    }
  ],
  "evidence": [
    {
      "title": "Palladium: Ruby and Rails upgrade",
      "detail": "Upgraded Ruby and Rails in separate stages, addressed compatibility and loading issues and preserved background job class names.",
      "href": "/showcases/palladium-rails-upgrade",
      "icon": "upgrades"
    },
    {
      "title": "Worship Online: storage modernization",
      "detail": "Migrated Paperclip to ActiveStorage in stages while preserving production uploads and public URLs.",
      "href": "/showcases/worshiponline-paperclip-activestorage",
      "icon": "handover"
    }
  ],
  "reading": [
    {
      "title": "Ruby and Rails upgrade: personal experience",
      "href": "/blog/ruby-and-rails-upgrade-personal-experience/",
      "icon": "review",
      "detail": "Read our Ruby and Rails upgrade experience, including compatibility fixes and background job loading issues."
    },
    {
      "title": "Migrate Paperclip to ActiveStorage without downtime",
      "href": "/blog/migrate-paperclip-to-activestorage-without-downtime/",
      "icon": "review",
      "detail": "Follow a staged storage migration that preserves existing uploads and public URLs."
    },
    {
      "title": "Ongoing Rails maintenance",
      "href": "/ruby-on-rails-maintenance",
      "icon": "ownership",
      "detail": "Keep production support, dependency updates and continued feature development in one prioritized backlog."
    },
    {
      "title": "Need to restore an unreliable application first? Rails rescue",
      "href": "/ruby-on-rails-rescue",
      "icon": "production",
      "detail": "Diagnose recurring failures, stabilize production and document a recovery plan."
    }
  ]
};

export const metadata = serviceMetadata(service);

export default function Page() {
  return <FocusedServicePage service={service} />;
}
