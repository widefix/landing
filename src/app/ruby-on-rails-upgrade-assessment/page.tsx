import FocusedServicePage, { serviceMetadata, type FocusedService } from '@/components/rails/FocusedServicePage';

const service: FocusedService = {
  slug: 'ruby-on-rails-upgrade-assessment',
  title: 'Ruby and Rails Upgrade Assessment | WideFix',
  description: 'Understand the blockers, business risks and first delivery milestone before upgrading your Rails application. Get a scoped assessment and staged upgrade plan.',
  heading: 'Know what your Rails upgrade will take before committing to it',
  intro: 'Turn an overdue Ruby or Rails upgrade into a decision you can budget for. WideFix reviews your existing application, investigates the main blockers and delivers a staged plan around the workflows your business depends on.',
  image: '/img/showcases/palladium-rails-upgrade.svg',
  imageWidth: 687,
  imageHeight: 377,
  imageAlt: 'Palladium Rails upgrade: bringing an existing application forward',
  cta: 'Discuss your upgrade assessment',
  sections: [
    { id: 'when-to-start', title: 'A focused first step when the upgrade is hard to estimate', intro: 'For founders and engineering teams with a live Rails product. Agree the assessment scope, fee, access and delivery date before work begins.', items: [
      { title: 'An overdue upgrade', icon: 'upgrades', detail: 'You know the stack needs attention, but incompatible gems, custom code or missing tests make the effort uncertain.' },
      { title: 'A deadline to plan around', icon: 'priorities', detail: 'An approaching support deadline or hosting restriction needs a delivery plan that accounts for dependencies and your release schedule.' },
      { title: 'A roadmap that keeps slipping', icon: 'momentum', detail: 'Your team needs an outside Rails specialist to investigate blockers and define a first milestone alongside ongoing feature work.' },
    ] },
    { id: 'deliverables', title: 'What you receive', intro: 'A written decision document and walkthrough. Findings distinguish verified behavior, assumptions and questions that need further investigation.', items: [
      { title: 'Production stack and blocker inventory', icon: 'review', detail: 'Ruby, Rails, key gems and relevant hosting dependencies, their support status, compatible target options and the main upgrade constraints. Production details are verified where agreed access allows.' },
      { title: 'Critical workflow verification plan', icon: 'ownership', detail: 'A map of the business behavior to preserve, current test gaps and checks needed for payments, permissions, jobs and integrations relevant to your product.' },
      { title: 'A staged plan and first-step estimate', icon: 'priorities', detail: 'An ordered backlog with acceptance checks, release and recovery considerations, plus an estimate for the first implementation milestone. Wider estimates state assumptions and unresolved blockers.' },
    ] },
    { id: 'how-it-works', title: 'How the assessment works', items: [
      { title: 'Agree a bounded investigation', icon: 'communication', detail: 'Share your business priorities, known versions, deadlines and current concerns. Together we define the systems and questions included, access arrangements, budget and delivery date.' },
      { title: 'Inspect and test the uncertain parts', icon: 'expertise', detail: 'Review code, dependencies, CI and deployment configuration. Where included, use an isolated branch or staging environment to investigate a compatibility blocker. Record what was actually tested.' },
      { title: 'Choose the next delivery milestone', icon: 'handover', detail: 'Walk through the findings, tradeoffs and priorities. Your team can use the plan, or WideFix can separately scope implementation and ongoing maintenance.' },
    ] },
    { id: 'scope', title: 'Clear boundaries before work starts', items: [
      { title: 'An assessment has its own outcome', icon: 'review', detail: 'The deliverable is the agreed investigation and plan. A completed upgrade, full security audit, exhaustive dependency review and production changes require their own explicit scope.' },
      { title: 'Access matched to the review', icon: 'ownership', detail: 'Usually we need repository and dependency files, test and CI instructions, deployment configuration and a technical contact. Agree any staging, logs or read-only production access separately; avoid sharing secrets in an enquiry.' },
      { title: 'No invented certainty', icon: 'communication', detail: 'Price and timing depend on the application and investigation scope. A short compatibility experiment may be needed before a reliable implementation estimate is possible.' },
    ] },
  ],
  evidence: [
    { title: 'Palladium: a documented Rails upgrade', icon: 'upgrades', detail: 'Explore an existing-application upgrade from our client work and the engineering context behind it.', href: '/showcases/palladium-rails-upgrade' },
    { title: 'Dependency modernization in a live product', icon: 'production', detail: 'Our Paperclip to ActiveStorage account explains staged migration, preserving existing files and checking the cutover.', href: '/blog/migrate-paperclip-to-activestorage-without-downtime/', linkLabel: 'Read the engineering account' },
  ],
  articles: [
    { title: 'Planning a Rails upgrade', detail: 'What a useful assessment should resolve before implementation starts.', href: '/blog/planning-a-rails-upgrade/' },
    { title: 'Is your working Rails app still supported?', detail: 'Check Ruby, Rails and hosting support to understand upgrade risks and prioritize the next steps.', href: '/blog/your-rails-app-still-works-is-it-still-supported/' },
  ],
  reading: [
    { title: 'Legacy Rails maintenance', detail: 'Carry the plan into incremental modernization of an aging application.', href: '/legacy-ruby-on-rails-maintenance' },
    { title: 'Ongoing Rails maintenance', detail: 'Keep dependencies, production support and product development on a shared roadmap.', href: '/ruby-on-rails-maintenance' },
  ],
};

export const metadata = serviceMetadata(service);

export default function Page() {
  return <FocusedServicePage service={service} />;
}
