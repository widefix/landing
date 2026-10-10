import Link from 'next/link';
import type { Metadata } from 'next';
import LinkIndicator from '@/components/LinkIndicator';
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
    images: [socialPreview('/img/rails-services-hero.svg', 'Your Ruby on Rails technical partner')],
  },
  twitter: socialTwitter('/img/rails-services-hero.svg', 'Your Ruby on Rails technical partner'),
};

const challenges = [
  ['Your developer has left', 'You need someone to understand the existing system, take over responsibly, and keep it moving.'],
  ['Technical debt is slowing delivery', 'Every change feels risky, and the backlog keeps growing.'],
  ['Production problems keep returning', 'Performance issues, failed jobs, and unreliable deployments demand attention.'],
  ['Your team needs experienced guidance', 'You need someone who can evaluate options and help decide what matters most.'],
];

const principles = [
  ['Ownership', 'We stay accountable for engineering outcomes, not just completed tickets.'],
  ['Proactive problem solving', 'We investigate root causes, explain alternatives, and recommend practical next steps.'],
  ['Transparent communication', 'We surface progress, blockers, risks, and trade-offs before they become surprises.'],
  ['Business-oriented engineering', 'We prioritize the work that matters to your customers and business, without unnecessary rewrites.'],
  ['Continuous improvement', 'We make incremental improvements to reliability, maintainability, performance, and delivery.'],
];

const steps = [
  ['Understand', 'Learn your product, codebase, business goals, and immediate concerns.'],
  ['Assess', 'Identify technical risks, constraints, and opportunities for improvement.'],
  ['Prioritize', 'Agree on what needs attention now and what can wait.'],
  ['Deliver', 'Fix issues, maintain production, modernize safely, and ship useful features.'],
  ['Improve', 'Revisit priorities and strengthen the application as your needs evolve.'],
];

const cases = [
  {
    title: 'Production queue optimization',
    detail: 'A practical example of investigating bottlenecks and restoring dependable background processing.',
    href: '/showcases/shopwired-queue-optimization',
  },
  {
    title: 'Ruby on Rails redesign',
    detail: 'Evolving an existing application while protecting the product already in use.',
    href: '/showcases/ruby-on-rails-redesign',
  },
  {
    title: 'Stripe integration reliability',
    detail: 'Improving consistency in a business-critical payment integration.',
    href: '/showcases/stripe-integration',
  },
];

export default function TechnicalPartnerPage() {
  return (
    <main className="rails-home rails-services">
      <section className="rails-section rails-hero">
        <div className="inner">
          <p className="rails-eyebrow">Long-term technical partnership</p>
          <h1>Your Technical Partner for <span>Ruby on Rails Applications</span></h1>
          <p className="rails-intro">More than developers who implement tickets. We take ownership of your application's technical challenges, identify risks, recommend solutions, and help you make engineering decisions that serve your business.</p>
          <div className="rails-actions"><RailsCall /><Link href="#how-we-work">How we work <LinkIndicator /></Link></div>
        </div>
      </section>

      <section className="rails-section rails-tinted">
        <div className="inner">
          <p className="rails-eyebrow">Challenges we help solve</p>
          <h2>Your application needs more than someone who writes code</h2>
          <p className="rails-intro">Whether your Rails application needs a new technical owner or an experienced partner alongside your team, we work with what you already have.</p>
          <div className="rails-card-grid">{challenges.map(([heading, detail]) => (
            <article className="rails-card" key={heading}><h3>{heading}</h3><p>{detail}</p></article>
          ))}</div>
        </div>
      </section>

      <section className="rails-section">
        <div className="inner">
          <p className="rails-eyebrow">What partnership means to us</p>
          <h2>We think beyond the ticket</h2>
          <p className="rails-intro">Good engineering starts with understanding the problem, not simply following instructions. We combine hands-on Rails expertise with judgment and clear communication.</p>
          <div className="rails-card-grid">{principles.map(([heading, detail]) => (
            <article className="rails-card" key={heading}><h3>{heading}</h3><p>{detail}</p></article>
          ))}</div>
        </div>
      </section>

      <section className="rails-section rails-tinted" id="how-we-work">
        <div className="inner">
          <p className="rails-eyebrow">A practical working relationship</p>
          <h2>Built around your product, not a rigid playbook</h2>
          <p className="rails-intro">We can start with an urgent production issue, a focused improvement, or a longer-term engagement. The process adapts to what your application needs.</p>
          <div className="rails-card-grid">{steps.map(([heading, detail], index) => (
            <article className="rails-card" key={heading}><p className="rails-eyebrow">Step {index + 1}</p><h3>{heading}</h3><p>{detail}</p></article>
          ))}</div>
        </div>
      </section>

      <section className="rails-section">
        <div className="inner">
          <p className="rails-eyebrow">Relevant experience</p>
          <h2>Real work on existing applications</h2>
          <p className="rails-intro">Our work spans Rails maintenance, performance, infrastructure, integrations, and gradual modernization. Here are examples from our existing case studies.</p>
          <div className="rails-card-grid">{cases.map(item => (
            <article className="rails-card" key={item.href}><h3>{item.title}</h3><p>{item.detail}</p><Link href={item.href}>Read the case study <LinkIndicator /></Link></article>
          ))}</div>
          <p className="rails-intro">Explore our <Link href="/services">services</Link>, meet the <Link href="/team">team</Link>, or browse more <Link href="/showcases">client work</Link>.</p>
        </div>
      </section>

      <OwnershipCTA />
    </main>
  );
}
