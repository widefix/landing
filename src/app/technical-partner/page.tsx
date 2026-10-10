import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import LinkIndicator from '@/components/LinkIndicator';
import SituationIcon from '@/components/rails/SituationIcon';
import { RailsCall, OwnershipCTA } from '@/components/rails/RailsOwnership';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';

const title = 'Ruby on Rails Technical Partner | WideFix';
const description = 'A long-term technical partner for existing Ruby on Rails applications. WideFix takes ownership of maintenance, modernization, reliability, and ongoing development.';

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: 'https://widefix.com/technical-partner' },
  openGraph: {
    title, description, url: 'https://widefix.com/technical-partner',
    siteName: 'WideFix', locale: 'en_US', type: 'website',
    images: [socialPreview('/img/rails-technical-partner-hero.svg', 'Your Ruby on Rails technical partner')],
  },
  twitter: socialTwitter('/img/rails-technical-partner-hero.svg', 'Your Ruby on Rails technical partner'),
};

const challenges = [
  ['handover', 'Your developer has left', 'You need someone to understand the existing system, take over responsibly, and keep it moving.'],
  ['upgrades', 'Technical debt is slowing delivery', 'Every change feels risky, and the backlog keeps growing.'],
  ['production', 'Production problems keep returning', 'Performance issues, failed jobs, and unreliable deployments demand attention.'],
  ['expertise', 'Your team needs experienced guidance', 'You need someone who can evaluate options and help decide what matters most.'],
] as const;

const principles = [
  ['ownership', 'Ownership', 'We stay accountable for engineering outcomes, not just completed tickets.'],
  ['review', 'Proactive problem solving', 'We investigate root causes, explain alternatives, and recommend practical next steps.'],
  ['communication', 'Transparent communication', 'We surface progress, blockers, risks, and trade-offs before they become surprises.'],
  ['priorities', 'Business-oriented engineering', 'We prioritize the work that matters to your customers and business, without unnecessary rewrites.'],
  ['upgrades', 'Continuous improvement', 'We make incremental improvements to reliability, maintainability, performance, and delivery.'],
] as const;

const steps = [
  ['expertise', 'Understand', 'Learn your product, codebase, business goals, and immediate concerns.'],
  ['review', 'Assess', 'Identify technical risks, constraints, and opportunities for improvement.'],
  ['priorities', 'Prioritize', 'Agree on what needs attention now and what can wait.'],
  ['production', 'Deliver', 'Fix issues, maintain production, modernize safely, and ship useful features.'],
  ['momentum', 'Improve', 'Revisit priorities and strengthen the application as your needs evolve.'],
] as const;

const cases = [
  {
    title: 'Production queue optimization', icon: 'momentum' as const,
    detail: 'A practical example of investigating bottlenecks and restoring dependable background processing.',
    href: '/showcases/shopwired-queue-optimization',
  },
  {
    title: 'Ruby on Rails redesign', icon: 'upgrades' as const,
    detail: 'Evolving an existing application while protecting the product already in use.',
    href: '/showcases/ruby-on-rails-redesign',
  },
  {
    title: 'Stripe integration reliability', icon: 'payments' as const,
    detail: 'Improving consistency in a business-critical payment integration.',
    href: '/showcases/stripe-integration',
  },
];

export default function TechnicalPartnerPage() {
  return (
    <main className="rails-home rails-services rails-technical-partner">
      <section className="rails-section rails-hero">
        <div className="inner rails-hero-grid">
          <div>
          <p className="rails-eyebrow">Long-term technical partnership</p>
          <h1>Your Technical Partner for <span>Ruby on Rails Applications</span></h1>
          <p className="rails-intro">More than developers who implement tickets. We take ownership of your application&apos;s technical challenges, identify risks, recommend solutions, and help you make engineering decisions that serve your business.</p>
          <div className="rails-actions"><RailsCall /><Link href="#how-we-work">How we work <LinkIndicator /></Link></div>
          </div>
          <div className="rails-hero-aside">
            <Image src="/img/rails-technical-partner-hero.svg" alt="Your existing Rails product supported by technical ownership, shared priorities and ongoing delivery" width={560} height={490} priority />
            <p>A shared roadmap. An accountable technical partner.</p>
          </div>
        </div>
      </section>

      <section className="rails-section rails-tinted">
        <div className="inner">
          <p className="rails-eyebrow">Challenges we help solve</p>
          <h2>Your application needs more than someone who writes code</h2>
          <p className="rails-intro">Whether your Rails application needs a new technical owner or an experienced partner alongside your team, we work with what you already have.</p>
          <div className="rails-card-grid">{challenges.map(([icon, heading, detail]) => (
            <article className="rails-card" key={heading}><div className="rails-situation-heading"><SituationIcon kind={icon} /><h3>{heading}</h3></div><p>{detail}</p></article>
          ))}</div>
        </div>
      </section>

      <section className="rails-section">
        <div className="inner">
          <p className="rails-eyebrow">What partnership means to us</p>
          <h2>We think beyond the ticket</h2>
          <p className="rails-intro">Good engineering starts with understanding the problem, not simply following instructions. We combine hands-on Rails expertise with judgment and clear communication.</p>
          <div className="rails-card-grid">{principles.map(([icon, heading, detail]) => (
            <article className="rails-card" key={heading}><div className="rails-situation-heading"><SituationIcon kind={icon} /><h3>{heading}</h3></div><p>{detail}</p></article>
          ))}</div>
        </div>
      </section>

      <section className="rails-section rails-tinted" id="how-we-work">
        <div className="inner">
          <p className="rails-eyebrow">A practical working relationship</p>
          <h2>Built around your product, not a rigid playbook</h2>
          <p className="rails-intro">We can start with an urgent production issue, a focused improvement, or a longer-term engagement. The process adapts to what your application needs.</p>
          <div className="rails-card-grid">{steps.map(([icon, heading, detail], index) => (
            <article className="rails-card" key={heading}><p className="rails-eyebrow">Step {index + 1}</p><div className="rails-situation-heading"><SituationIcon kind={icon} /><h3>{heading}</h3></div><p>{detail}</p></article>
          ))}</div>
        </div>
      </section>

      <section className="rails-section">
        <div className="inner">
          <p className="rails-eyebrow">Relevant experience</p>
          <h2>Real work on existing applications</h2>
          <p className="rails-intro">Our work spans Rails maintenance, performance, infrastructure, integrations, and gradual modernization. Here are examples from our existing case studies.</p>
          <div className="rails-card-grid">{cases.map(item => (
            <article className="rails-card" key={item.href}><div className="rails-situation-heading"><SituationIcon kind={item.icon} /><h3>{item.title}</h3></div><p>{item.detail}</p><Link href={item.href}>Read the case study <LinkIndicator /></Link></article>
          ))}</div>
          <p className="rails-intro">Explore our <Link href="/services">services</Link>, meet the <Link href="/team">team</Link>, or browse more <Link href="/showcases">client work</Link>.</p>
        </div>
      </section>

      <OwnershipCTA />
    </main>
  );
}
