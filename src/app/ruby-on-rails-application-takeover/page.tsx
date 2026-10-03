
import LinkIndicator from '@/components/LinkIndicator';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SituationIcon from '@/components/rails/SituationIcon';
import { OwnershipProcess, OwnershipCTA, RailsCall } from '@/components/rails/RailsOwnership';

const title = 'Ruby on Rails Application Takeover - WideFix';
const description = 'Need a team to take over your existing Rails application? WideFix handles the handover, production stability, maintenance, upgrades and ongoing feature development.';
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: 'https://widefix.com/ruby-on-rails-application-takeover' },
  openGraph: { title, description, url: 'https://widefix.com/ruby-on-rails-application-takeover' },
};

export default function RailsTakeoverPage() {
  return (
    <main className="rails-home rails-takeover">
      <section className="rails-section rails-hero">
        <div className="inner rails-hero-grid">
          <div>
            <p className="rails-eyebrow">A dependable handover for a live product</p>
            <h1>Need someone to take over your existing <span>Rails application?</span></h1>
            <p className="rails-intro">Whether your developer has left, your agency is moving on or your team needs Rails expertise, WideFix can take technical ownership of your application. We learn the system, keep it running and continue developing the product.</p>
            <div className="rails-actions"><RailsCall /><Link href="#handover">What happens during a handover? <LinkIndicator /></Link></div>
          </div>
          <div className="rails-hero-aside">
            <Image src="/img/rails-ownership-hero.svg"
              alt="Your Rails application supported through takeover, stabilization, maintenance and ongoing development"
              width={560} height={490} priority />
            <p>A clear path from handover to ongoing ownership</p>
          </div>
        </div>
      </section>
      <section className="rails-section" id="handover">
        <div className="inner">
          <h2>A handover starts with understanding your application</h2>
          <p className="rails-intro">We begin with your business priorities and the current state of the product. Together, we agree on access, responsibilities and the first work to tackle.</p>
          <div className="rails-card-grid">
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="review" /><h3>Review the existing system</h3></div><p>Walk through the codebase, Ruby and Rails versions, database, tests, background jobs and third-party integrations. Identify the parts your customers depend on most.</p></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="handover" /><h3>Plan the operational handover</h3></div><p>Map hosting, deployments, monitoring and access with your outgoing developer or team where available. Document how the application runs and how changes reach production.</p></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="priorities" /><h3>Agree on the first priorities</h3></div><p>Turn the findings into a practical plan: urgent production issues, upgrade risks, maintenance needs and your feature backlog. Set a clear scope and communication rhythm.</p></article>
          </div>
        </div>
      </section>
      <OwnershipProcess />
      <section className="rails-section">
        <div className="inner">
          <h2>Keep the product running. Keep the product growing.</h2>
          <p className="rails-intro">Application ownership includes ongoing development. We can improve performance, upgrade dependencies, maintain infrastructure, connect payment and accounting systems, and ship new web and mobile features around your Rails backend.</p>
          <div className="rails-card-grid">
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="production" /><h3>Production recovery</h3></div><p>See how we restored a stalled background queue and eliminated recurring Heroku errors for ShopWired.</p><Link href="/showcases/shopwired-queue-optimization">Read the case study <LinkIndicator /></Link></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="upgrades" /><h3>Incremental modernization</h3></div><p>See how we redesigned Worship Online&apos;s Rails application with zero downtime and preserved its mobile integrations.</p><Link href="/showcases/ruby-on-rails-redesign">Read the case study <LinkIndicator /></Link></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="expertise" /><h3>Practical Rails expertise</h3></div><p>Read our founder&apos;s experience upgrading Ruby and Rails in an existing application, including dependencies and deployment challenges.</p><Link href="https://widefix.com/blog/ruby-and-rails-upgrade-personal-experience/">Read the upgrade article <LinkIndicator /></Link></article>
          </div>
        </div>
      </section>
      <section className="rails-section rails-tinted">
        <div className="inner rails-faq">
          <h2>Questions about taking over a Rails application</h2>
          <details><summary>Can you help if the original developer is unavailable?</summary><p>Yes. We can begin with the repository, documentation and access you have. We identify missing information and agree with you on how to recover it before making changes.</p></details>
          <details><summary>Will you need to rewrite the application?</summary><p>A takeover starts with reviewing what already works. We favor targeted fixes and incremental improvements. If a larger change is justified, we explain the tradeoffs and agree on the approach with you.</p></details>
          <details><summary>Can you maintain the application and build new features?</summary><p>Yes. Ongoing maintenance, upgrades and feature development are part of the same engagement. Priorities are based on the state of your application and your business goals.</p></details>
          <details><summary>What should I bring to the first call?</summary><p>Tell us what the application does, who currently maintains it and what is most urgent. You do not need to prepare a technical audit before talking to us.</p></details>
        </div>
      </section>
      <OwnershipCTA />
    </main>
  );
}
