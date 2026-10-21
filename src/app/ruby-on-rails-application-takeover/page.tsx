import { socialPreview, socialTwitter } from '@/lib/socialPreview';

import LinkIndicator from '@/components/LinkIndicator';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SituationIcon from '@/components/rails/SituationIcon';
import RailsFAQ from '@/components/rails/RailsFAQ';
import { OwnershipProcess, OwnershipCTA, RailsCall } from '@/components/rails/RailsOwnership';

const title = 'Ruby on Rails Application Takeover - WideFix';
const description = 'Need a team to take over your existing Rails application? WideFix handles the handover, production stability, maintenance, upgrades and ongoing feature development.';
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: 'https://widefix.com/ruby-on-rails-application-takeover' },
  twitter: socialTwitter('/img/rails-ownership-hero.svg', 'Rails application takeover'),
  openGraph: {
    images: [socialPreview('/img/rails-ownership-hero.svg', 'Rails application takeover')], title, description, url: 'https://widefix.com/ruby-on-rails-application-takeover' },
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
          <h2>What you receive from the initial takeover work</h2>
          <p className="rails-intro">Start with a walkthrough of your product and the handover situation. We agree the review scope, required access, budget and pace before starting. The initial work produces a shared technical picture and an actionable handover plan.</p>
          <div className="rails-card-grid">
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="review" /><h3>Review the existing system</h3></div><p>Receive a prioritized assessment of the codebase, dependencies, tests, jobs and integrations, tied to the customer workflows that matter most. Findings distinguish verified problems from risks that need further investigation.</p></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="handover" /><h3>Plan the operational handover</h3></div><p>Receive an access and responsibility map covering hosting, deployment, monitoring and essential accounts. Document the release and rollback paths, identify access gaps and agree incident contacts. Work with your outgoing team where available.</p></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="priorities" /><h3>Agree on the first priorities</h3></div><p>Receive a shared backlog of urgent fixes, upgrade risks and product work, with an agreed first change and acceptance checks. Confirm communication, budget and support expectations; verify the first release against the agreed checks.</p></article>
          </div>
        </div>
      </section>
      <section className="rails-section rails-tinted" id="ways-to-work">
        <div className="inner">
          <p className="rails-eyebrow">Support that fits your product</p>
          <h2>Start with the help you actually need</h2>
          <div className="rails-card-grid">
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="handover" /><h3>Application takeover</h3></div><p>For products left by a previous developer or agency. Establish the technical picture, access, priorities and a safer handover.</p></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="ownership" /><h3>Ongoing maintenance</h3></div><p>For live applications that need production fixes, updates, monitoring and an accountable technical partner.</p></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="expertise" /><h3>Maintenance + development</h3></div><p>For teams that need someone to look after reliability while continuing to deliver features and modernization.</p></article>
          </div>
          <p className="rails-intro rails-engagement-note">We define the work, availability and communication expectations together. An initial conversation is not a commitment to a full development engagement.</p>
          <RailsCall>Discuss the right starting point</RailsCall>
        </div>
      </section>
      <OwnershipProcess />
      <section className="rails-section">
        <div className="inner">
          <h2>Keep your product running and growing</h2>
          <p className="rails-intro">Application ownership includes ongoing development. We can improve performance, upgrade dependencies, maintain infrastructure, connect payment and accounting systems, and ship new web and mobile features around your Rails backend.</p>
          <div className="rails-card-grid">
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="production" /><h3>Production recovery</h3></div><p>See how we restored a stalled background queue and eliminated recurring Heroku errors for ShopWired.</p><Link href="/showcases/shopwired-queue-optimization">Read the case study <LinkIndicator /></Link></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="upgrades" /><h3>Incremental modernization</h3></div><p>See how we redesigned Worship Online&apos;s Rails application with zero downtime and preserved its mobile integrations.</p><Link href="/showcases/ruby-on-rails-redesign">Read the case study <LinkIndicator /></Link></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="expertise" /><h3>Practical Rails expertise</h3></div><p>Read our founder&apos;s experience upgrading Ruby and Rails in an existing application, including dependencies and deployment challenges.</p><Link href="https://widefix.com/blog/ruby-and-rails-upgrade-personal-experience/">Read the upgrade article <LinkIndicator /></Link></article>
          </div>
        </div>
      </section>
      <section className="rails-section" id="proven-work">
        <div className="inner">
          <p className="rails-eyebrow">Work with existing products</p>
          <h2>We have stepped into unfamiliar Rails codebases before</h2>
          <p className="rails-intro">A takeover is more than a technical review. These existing client stories show how we helped live applications keep moving after a handover or through complex changes.</p>
          <div className="rails-card-grid rails-case-grid">
            <article className="rails-card">
              <Image src="/img/showcases/clients/hipchip.svg" alt="HipChip" width={160} height={48} />
              <h3>HipChip: took over after the developer left</h3>
              <p>We took ownership of an existing legacy Rails application, added automated tests and delivered Stripe and ACH payments while improving stability and performance.</p>
              <Link href="/showcases/hipchip-stripe-ach-integration">Read the takeover story <LinkIndicator /></Link>
            </article>
            <article className="rails-card">
              <Image src="/img/showcases/clients/wo.svg" alt="Worship Online" width={160} height={48} />
              <h3>Worship Online: evolve a live application without a rewrite</h3>
              <p>We gradually redesigned an existing Rails product while keeping it available and preserving its existing mobile integrations.</p>
              <Link href="/showcases/worshiponline-application-support-maintenance">Read the long-term ownership story <LinkIndicator /></Link>
            </article>
            <article className="rails-card">
              <Image src="/img/showcases/clients/wo.svg" alt="Worship Online" width={160} height={48} />
              <h3>Worship Online: upgrade critical storage safely</h3>
              <p>A staged migration replaced Paperclip with ActiveStorage while keeping uploads and public media available during the transition.</p>
              <Link href="/showcases/worshiponline-paperclip-activestorage">Read the production migration story <LinkIndicator /></Link>
            </article>
          </div>
        </div>
      </section>
      <RailsFAQ detailed />
      <OwnershipCTA />
    </main>
  );
}
