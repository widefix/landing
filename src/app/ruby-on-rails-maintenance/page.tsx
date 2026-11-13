import LinkIndicator from '@/components/LinkIndicator';
import ServiceRecognition from '@/components/rails/ServiceRecognition';
import FocusedServicePage, { serviceMetadata, type FocusedService } from '@/components/rails/FocusedServicePage';
import ClutchWidget from '@/components/ClutchWidget';
import SituationIcon from '@/components/rails/SituationIcon';
import MaintenancePricing from '@/components/rails/MaintenancePricing';

const service: FocusedService = {
  "slug": "ruby-on-rails-maintenance",
  "title": "Ruby on Rails Maintenance & Support Company | WideFix",
  "description": "Ongoing Ruby on Rails maintenance for live SaaS products: production fixes, updates, monitoring and continued development, with agreed support hours and budget.",
  "heading": "Ruby on Rails maintenance and support for existing applications",
  "intro": "For founders and teams running an existing Rails product: resolve production problems, keep dependencies maintained and deliver the next useful change. WideFix takes technical ownership of inherited applications, with scope, support hours and budget agreed before work begins.",
  evidencePosition: 'after-hero',
  evidenceEyebrow: 'Client work and independent reviews',
  evidenceHeading: 'Experience maintaining existing Rails applications',
  finalIntro: 'Send your Ruby and Rails versions, hosting provider, current problem and desired support. Include your time zone and any business deadline so we can discuss access, assessment scope and the first delivery milestone.',
  "image": "/img/showcases/worshiponline-ownership.svg",
  imageWidth: 960,
  imageHeight: 560,
  "imageAlt": "Worship Online: ongoing Rails support and technical ownership",
  "cta": "Discuss Rails maintenance",
  "sections": [
    {
      "id": "getting-started",
      "title": "What you receive at the start of maintenance",
      "intro": "Bring your next business priority and the problems affecting customers. We agree the initial review scope and price before work begins. The review needs repository and dependency information, deployment documentation and relevant error logs; hosting or monitoring access is agreed as needed. Use scoped access rather than sharing credentials in an enquiry.",
      "items": [
        { "title": "A shared delivery plan", "icon": "priorities", "detail": "Receive one prioritized backlog covering product changes and application risks. Agree the first outcome, acceptance checks and the decisions that need your input." },
        { "title": "Clear operating responsibilities", "icon": "ownership", "detail": "Document included systems, technical contacts, support hours, spending limits and escalation arrangements. Identify access or monitoring gaps before relying on the support process. Keep a shared record of repositories, releases and integrations so teammates can find what they need without repeatedly interrupting the original developer." },
        { "title": "A verified first change", "icon": "review", "detail": "Carry the agreed change through investigation, implementation and release. Receive a summary of checks, observed results and remaining risks. Select a suitable production observation period and business metric together where relevant." }
      ]
    },
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
      "title": "ShopWired: production reliability and integrations",
      "icon": "production",
      "detail": "Recovered a stalled DelayedJob queue, cleared the stuck backlog and repaired third-party integrations. Read the case for the reported outcomes and measurement limits.",
      "href": "/showcases/shopwired-queue-optimization"
    },
    {
      title: '4.9/5 across 13 Clutch reviews',
      icon: 'review',
      detail: 'Read individual client engagements and feedback on delivery. Clutch profile checked November 7, 2026.',
      href: 'https://clutch.co/profile/widefix#reviews',
      linkLabel: 'Read the reviews',
    }
  ],
  articlesHeading: 'Guides for choosing and budgeting Rails maintenance',
  articles: [
    { title: 'Compare Rails maintenance companies', href: '/blog/ruby-on-rails-maintenance-companies/', detail: 'Compare published offers, entry steps, continuity and coverage, with a production handover checklist.', icon: 'review' },
    { title: 'Plan your Rails maintenance budget', href: '/blog/ruby-on-rails-maintenance-cost/', detail: 'Separate onboarding, recurring upkeep, incidents and feature delivery before comparing quotes.', icon: 'priorities' },
  ],
  "reading": [
    {
      "title": "Ruby and Rails upgrade assessment",
      "icon": "review",
      "detail": "Identify compatibility blockers, critical workflow checks and a first delivery milestone before committing to an upgrade.",
      "href": "/ruby-on-rails-upgrade-assessment"
    },
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
    <FocusedServicePage service={service} className="rails-maintenance-page">
      <MaintenancePricing />
      <section className="rails-section" aria-labelledby="maintenance-questions-title">
        <div className="inner">
          <h2 id="maintenance-questions-title">Questions before handing over your application</h2>
          <div className="rails-card-grid">
            {[
              ['Can you take over an app built by someone else?', 'Yes. We start with the existing code, access and business workflows. Missing documentation or an unavailable previous developer changes the investigation needed; we agree that scope before ongoing support.'],
              ['Can you support unsupported Ruby or Rails versions?', 'We assess compatibility, security exposure and the upgrade path. Maintenance cannot restore vendor security support to an unsupported version. Agree immediate mitigations and a staged upgrade separately where needed.'],
              ['What if our workload changes?', 'Choose maintenance only or maintenance plus feature delivery. Agree recurring capacity and spending limits; extra hours need approval, and unused hours are credited proportionally. Starting prices and plan terms are in the pricing section above.'],
              ['Who makes technical decisions and covers absence?', 'Andrei Kaleshka leads technical direction and delivery. Agree workstream owners, escalation contacts and absence cover at onboarding. Shared deployment notes and business-owned accounts let another engineer get oriented; cover depends on the agreed team and availability.'],
              ['Are security work and emergency response included?', 'Define included systems, dependency review and incident work in the agreement. Confirm support hours and time zone, acknowledgement targets and escalation. An acknowledgement is not a resolution deadline. Continuous out-of-hours coverage and a full security audit are not implied by routine maintenance.'],
              ['How do notice and handover work?', 'Agree notice, any remaining work and handover scope before starting. Keep source code, hosting and integration accounts under business control. Plan transfer of deployment notes, access, known risks and outstanding priorities to your next engineer.'],
            ].map(([title, detail]) => <article className="rails-card" key={title}><div className="rails-situation-heading"><SituationIcon kind="review" /><h3>{title}</h3></div><p>{detail}</p></article>)}
          </div>
        </div>
      </section>
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
            <div className="rails-actions"><a href="https://clutch.co/profile/widefix#reviews" target="_blank" rel="noopener noreferrer">Read all WideFix reviews on Clutch <LinkIndicator /></a></div>
          </div>
        </div>
      </section>
    </FocusedServicePage>
  );
}

