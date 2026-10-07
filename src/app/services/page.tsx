import { socialPreview, socialTwitter } from '@/lib/socialPreview';

import LinkIndicator from '@/components/LinkIndicator';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { OwnershipCTA, OwnershipProcess, RailsCall } from '@/components/rails/RailsOwnership';

const title = 'Ruby on Rails Maintenance, Development & Modernization - WideFix';
const description = 'Services for existing Rails applications: takeover, maintenance, production support, Ruby and Rails upgrades, feature development, infrastructure and integrations.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://widefix.com/services' },
  twitter: socialTwitter('/img/rails-services-hero.svg', 'Rails maintenance, development and modernization'),
  openGraph: {
    images: [socialPreview('/img/rails-services-hero.svg', 'Rails maintenance, development and modernization')],
    title, description, url: 'https://widefix.com/services', siteName: 'WideFix',
    locale: 'en_US', type: 'website',
  },
};

const coreServices = [
  {
    id: 'application-takeover', title: 'Rails application takeover', icon: 'system.svg',
    description: 'Give your existing product a technical owner. We learn the codebase, map the infrastructure and plan the transition with your team.',
    items: ['Codebase and dependency review', 'Hosting, access and deployment handover', 'Risk assessment and first priorities', 'Documentation and ownership responsibilities'],
    href: '/ruby-on-rails-application-takeover', link: 'Explore the takeover service',
  },
  {
    id: 'maintenance-support', title: 'Maintenance & production support', icon: 'what-we-do/icon-devops-and-maintenance.svg',
    description: 'Keep the application dependable while the business keeps moving. We handle recurring problems and the ongoing work that makes changes safer.',
    items: ['Production bug diagnosis and fixes', 'Application and job monitoring', 'Dependency and security updates', 'Tests, operational documentation and support'],
  },
  {
    id: 'rails-upgrades', title: 'Ruby & Rails upgrades', icon: 'what-we-do/icon-quality-assurance.svg',
    description: 'Bring an aging stack forward through manageable steps. We review compatibility and protect existing behavior as dependencies change.',
    items: ['Ruby, Rails and gem upgrades', 'Deprecated code and dependency fixes', 'Regression tests for critical workflows', 'Staged releases and rollback planning'],
    href: 'https://widefix.com/blog/ruby-and-rails-upgrade-personal-experience/', link: 'Read our Rails upgrade experience',
  },
  {
    id: 'performance-reliability', title: 'Performance & reliability', icon: 'what-we-do/icon-optimization.svg',
    description: 'Find what is slowing your application down or interrupting your customers. Address the underlying bottlenecks and measure the result.',
    items: ['PostgreSQL queries and database tuning', 'Background queues and failed jobs', 'Memory usage, caching and response times', 'Timeouts, error handling and observability'],
    href: '/showcases/shopwired-queue-optimization', link: 'See a production queue recovery',
  },
  {
    id: 'development-modernization', title: 'Feature development & modernization', icon: 'web-dev-icon.svg',
    description: 'Keep improving the product your customers already use. We deliver new features and evolve the architecture through incremental changes.',
    items: ['Rails features, APIs and business workflows', 'React and Next.js interfaces', 'Refactoring and automated tests', 'Gradual redesigns and legacy modernization'],
    href: '/showcases/ruby-on-rails-redesign', link: 'See a redesign with zero downtime',
  },
  {
    id: 'infrastructure', title: 'Infrastructure & deployment', icon: 'what-we-do/icon-development-and-design.svg',
    description: 'Make the path from code to production easier to trust. We look after the infrastructure and tooling around your Rails application.',
    items: ['AWS, Heroku and Docker environments', 'CI/CD pipelines and deployment workflows', 'PostgreSQL, Redis and job infrastructure', 'Monitoring, backups and recovery planning'],
  },
];

const supportingServices = [
  {
    id: 'payments-accounting', title: 'Payment & accounting integrations', icon: 'credit-card.svg',
    description: 'Connect your Rails application to the systems your business depends on, with reliable data flow and visibility into failures.',
    items: ['Stripe and PayPal payment workflows', 'Subscriptions and webhook processing', 'Xero, QuickBooks, Sage and Clearbooks', 'Data reconciliation and integration monitoring'],
    href: '/showcases/stripe-integration', link: 'See how we fixed Stripe consistency',
  },
  {
    id: 'mobile-development', title: 'Mobile application development', icon: 'mobile-phone.svg',
    description: 'Extend your product to mobile while keeping the Rails backend and existing integrations working together.',
    items: ['React Native applications', 'Native iOS and Android development', 'Rails API integration and authentication', 'Product releases and ongoing maintenance'],
    href: '/showcases/build-crossplatform-mobile-application', link: 'See the Worship Online mobile app',
  },
  {
    id: 'ai-integrations', title: 'AI integrations', icon: 'what-we-do/icon-systems-integration.svg',
    description: 'Add AI where it serves a clear product or workflow need. Connect agents, assistants and chatbots to your existing application.',
    items: ['OpenAI and Claude integrations', 'Assistants connected to business data', 'Workflow automation and customer support', 'Integration with your APIs and permissions'],
  },
  {
    id: 'new-products', title: 'New products & MVPs', icon: 'productboard-icon.svg',
    description: 'Have a new product or an adjacent idea to launch? We can build a focused first version and continue developing it after release.',
    items: ['Scope and product priorities', 'Rails backends and web interfaces', 'Mobile experiences where needed', 'Testing, deployment and ongoing development'],
    href: 'https://github.com/widefix/pocketmoney/', link: 'Explore our BudgetingKid source code',
  },
];

type Service = (typeof coreServices)[number];
function ServiceCards({ services }: { services: Service[] }) {
  return (
    <div className="rails-card-grid rails-service-grid">
      {services.map(service => (
        <article className="rails-card" id={service.id} key={service.id}>
          <Image src={`/img/${service.icon}`} alt="" width={48} height={48} />
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <ul className="rails-service-list">{service.items.map(item => <li key={item}>{item}</li>)}</ul>
          {service.href && <Link href={service.href}>{service.link} <LinkIndicator /></Link>}
        </article>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="rails-home rails-services">
      <section className="rails-section rails-hero">
        <div className="inner rails-hero-grid">
          <div>
            <p className="rails-eyebrow">Services for the whole application</p>
            <h1>Maintain, modernize and develop your <span>Rails application</span></h1>
            <p className="rails-intro">From taking over an existing codebase to shipping the next feature, we handle the work that keeps your product dependable and moving forward. Rails is our specialty; the rest of your stack is part of the job.</p>
            <div className="rails-actions"><RailsCall /><Link href="#our-services">Explore our services <LinkIndicator /></Link></div>
          </div>
          <div className="rails-hero-aside">
            <Image src="/img/rails-services-hero.svg" alt="Rails services: maintenance, upgrades, performance, development, infrastructure and integrations" width={560} height={490} priority />
            <p>Technical ownership from handover to ongoing development</p>
          </div>
        </div>
      </section>

      <section className="rails-section rails-tinted" id="our-services">
        <div className="inner">
          <p className="rails-eyebrow">Core Rails services</p>
          <h2>The work your existing application needs</h2>
          <p className="rails-intro">Start with the priority in front of you: a handover, production issue, overdue upgrade or feature backlog. We can take on a focused project or provide ongoing maintenance and development.</p>
          <ServiceCards services={coreServices} />
        </div>
      </section>

      <section className="rails-section">
        <div className="inner">
          <p className="rails-eyebrow">Connected to your product</p>
          <h2>Capabilities beyond the Rails backend</h2>
          <p className="rails-intro">Your application is part of a larger system. We also build the interfaces, integrations and new experiences your customers and team need.</p>
          <ServiceCards services={supportingServices} />
        </div>
      </section>

      <OwnershipProcess />

      <section className="rails-section" id="technical-consulting">
        <div className="inner rails-advisory-grid">
          <div>
            <p className="rails-eyebrow">Technical consulting & leadership</p>
            <h2>A practical plan for the next stage of your product</h2>
            <p className="rails-intro">Need help deciding what to fix, upgrade or build first? We review your architecture and delivery process, explain the tradeoffs and connect technical decisions to your business priorities.</p>
            <ul className="rails-service-list"><li>Architecture reviews and modernization roadmaps</li><li>Performance audits and upgrade planning</li><li>Fractional CTO and solutions architecture support</li><li>Technical guidance alongside hands-on development</li></ul>
            <Link className="rails-text-link" href="/contact">Discuss your technical priorities <LinkIndicator /></Link>
          </div>
          <aside className="rails-card rails-founder-card">
            <Image src="/img/andrei-kaleshka.webp" alt="Andrei Kaleshka, WideFix founder" width={120} height={120} />
            <h3>Led by Andrei Kaleshka</h3>
            <p>WideFix&apos;s founder is a Toptal-verified engineer, published author and contributor to the Ruby ecosystem. Our open-source tools include Migration Data and Actual DB Schema.</p>
            <Link href="https://www.toptal.com/resume/andrei-kaleshka" target="_blank" rel="noopener noreferrer">View Andrei&apos;s experience <LinkIndicator /></Link>
            <Link href="/showcases">Explore our client work <LinkIndicator /></Link>
          </aside>
        </div>
      </section>
      <OwnershipCTA />
    </main>
  );
}
