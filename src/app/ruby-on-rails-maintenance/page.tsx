import ServiceRecognition from '@/components/rails/ServiceRecognition';
import FocusedServicePage, { serviceMetadata, type FocusedService } from '@/components/rails/FocusedServicePage';
import ClutchWidget from '@/components/ClutchWidget';
import SituationIcon from '@/components/rails/SituationIcon';

const service: FocusedService = {
  "slug": "ruby-on-rails-maintenance",
  "title": "Ruby on Rails Maintenance & SaaS Support | WideFix",
  "description": "Ongoing Ruby on Rails maintenance for live SaaS products: production fixes, updates, monitoring and continued development, with agreed support hours and budget.",
  "heading": "Ruby on Rails maintenance for your live SaaS",
  "intro": "Keep your Rails application running and keep shipping useful changes. WideFix provides ongoing maintenance and production support for founders and teams who need experienced engineers to own the existing product.",
  "image": "/img/showcases/worshiponline-ownership.svg",
  "imageAlt": "Worship Online: ongoing Rails support and technical ownership",
  "cta": "Discuss Rails maintenance",
  "sections": [
    {
      "id": "support-scope",
      "title": "What ongoing maintenance covers",
      "items": [
        {
          "title": "Production support",
          "icon": "production",
          "detail": "Diagnose bugs, failed jobs and integration errors. Improve monitoring and error handling so recurring incidents become visible and actionable."
        },
        {
          "title": "Dependencies and safe releases",
          "icon": "upgrades",
          "detail": "Review Ruby, Rails and gem updates, address security fixes and add regression coverage for important workflows. Keep deployment and rollback instructions usable."
        },
        {
          "title": "Continued product development",
          "icon": "momentum",
          "detail": "Deliver features, APIs and integration changes alongside maintenance. Use one prioritized backlog so product delivery and application health compete openly for the same budget."
        }
      ]
    },
    {
      "id": "small-saas",
      "title": "Support for founders without an internal engineering team",
      "intro": "You do not need a full-time engineering department to support an existing SaaS. Start with a part-time engagement and a clear owner for technical decisions.",
      "items": [
        {
          "title": "Priorities you can understand",
          "icon": "priorities",
          "detail": "Review customer problems, technical risks and feature requests together. Explain the options and agree which work to do first."
        },
        {
          "title": "Communication and budget control",
          "icon": "communication",
          "detail": "Agree on a regular progress update, one shared backlog and a spending limit. Estimate larger changes before committing and flag scope changes for a decision."
        },
        {
          "title": "Access and continuity",
          "icon": "ownership",
          "detail": "Document the application, deployment and essential integrations. Keep business-owned accounts and repository access clear so support does not depend on one person."
        }
      ]
    },
    {
      "id": "ways-to-work",
      "title": "Engagement options and response arrangements",
      "intro": "Availability and response targets are agreed before support begins, based on your product needs and the engagement scope.",
      "items": [
        {
          "title": "Part-time maintenance",
          "icon": "review",
          "detail": "Agree a recurring allocation for fixes, dependency work and monitoring follow-up. Define included systems, the backlog and how unused or additional time is handled."
        },
        {
          "title": "Maintenance plus development",
          "icon": "expertise",
          "detail": "Reserve capacity for both support and new features. Review priorities regularly and agree a budget for the next delivery period."
        },
        {
          "title": "Incident handling",
          "icon": "production",
          "detail": "Agree support hours, time zone, communication channel, severity levels, acknowledgement targets and escalation contacts. Response and resolution are separate expectations; out-of-hours coverage requires an explicit arrangement."
        }
      ]
    }
  ],
  "evidence": [
    {
      "title": "Worship Online: ongoing application ownership",
          "icon": "ownership",
      "detail": "Took over after a developer handover, fixed defects, expanded automated testing and continued maintenance and feature delivery while coordinating specialists around the budget.",
      "href": "/showcases/worshiponline-application-support-maintenance"
    },
    {
      "title": "HipChip: inherited Rails application",
          "icon": "payments",
      "detail": "Added automated tests and improved stability while delivering Stripe and ACH payments for a legacy application.",
      "href": "/showcases/hipchip-stripe-ach-integration"
    }
  ],
  "reading": [
    {
      "title": "Legacy Rails maintenance and incremental modernization",
      "icon": "upgrades",
      "detail": "Plan dependency upgrades, strengthen tests and modernize an aging application in manageable stages.",
      "href": "/legacy-ruby-on-rails-maintenance"
    },
    {
      "title": "Rails rescue for an unreliable application",
      "icon": "production",
      "detail": "Diagnose recurring failures, stabilize production and document a recovery plan.",
      "href": "/ruby-on-rails-rescue"
    },
    {
      "title": "Fractional CTO and technical partnership",
      "icon": "ownership",
      "detail": "Connect your technical roadmap, architecture decisions and delivery team with business priorities.",
      "href": "/technical-partner"
    },
    {
      "title": "Ruby and Rails upgrade: our documented experience",
      "icon": "review",
      "detail": "Read our account of upgrading Ruby and Rails, including compatibility issues and lessons from the process.",
      "href": "/blog/ruby-and-rails-upgrade-personal-experience/"
    }
  ]
};

export const metadata = serviceMetadata(service);

export default function Page() {
  return (
    <FocusedServicePage service={service}>
      <ServiceRecognition kind="maintenance" />
      <section className="rails-section rails-client-reviews" aria-labelledby="maintenance-reviews-title">
        <div className="inner">
          <p className="rails-eyebrow">Client feedback</p>
          <h2 id="maintenance-reviews-title">Independent client reviews</h2>
          <p className="rails-intro">Read attributed client reviews on Clutch, including the engagement context and feedback on delivery.</p>
          <figure className="rails-card">
            <blockquote cite="https://clutch.co/profile/widefix#reviews">
              <p>&ldquo;WideFix really takes ownership of the process and is not just a group of robots.&rdquo;</p>
            </blockquote>
            <figcaption>Shalon Palmer, CEO of Worship Online · <a href="https://clutch.co/profile/widefix#reviews" target="_blank" rel="noopener noreferrer">Verified Clutch review, September 23, 2026</a></figcaption>
          </figure>
          <div className="rails-review-panel">
            <div className="rails-situation-heading"><SituationIcon kind="communication" /><h3>What clients say about working with WideFix</h3></div>
            <div className="rails-review-widget"><ClutchWidget /></div>
            <div className="rails-actions"><a href="https://clutch.co/profile/widefix#reviews" target="_blank" rel="noopener noreferrer">Read all WideFix reviews on Clutch ↗</a></div>
          </div>
        </div>
      </section>
    </FocusedServicePage>
  );
}
