import LinkIndicator from '@/components/LinkIndicator';
import Link from 'next/link';
import { RailsCall } from '@/components/rails/RailsOwnership';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import type { Metadata } from "next";
import TeamSection from '@/components/TeamSection';
import FounderPublications from '@/components/rails/FounderPublications';
import SituationIcon from '@/components/rails/SituationIcon';

export const metadata: Metadata = {
  title: "Small Rails Engineering Team | WideFix",
  description: "Meet the engineers behind WideFix: Rails development, web and mobile interfaces, platform maintenance and founder-led technical delivery for existing SaaS products.",
  alternates: {
    canonical: "https://widefix.com/team"
  },
  twitter: socialTwitter(undefined, 'The WideFix team'),
  openGraph: {
    images: [socialPreview(undefined, 'The WideFix team')],
    title: "Small Rails Engineering Team | WideFix",
    description: "Meet the engineers behind WideFix: Rails development, web and mobile interfaces, platform maintenance and founder-led technical delivery for existing SaaS products.",
    url: "https://widefix.com/team",
    siteName: "WideFix",
    locale: "en_US",
    type: "website"
  }
};

export default function TeamPage() {
  return (
    <main className="rails-home rails-services">
      <section className="rails-section rails-hero"><div className="inner"><p className="rails-eyebrow">A small team for an existing product</p><h1>Rails engineering with clear delivery ownership</h1><p className="rails-intro">Andrei Kaleshka leads technical direction and delivery. We choose the engineers and specialist skills needed for your SaaS, work alongside your existing team or provide the engineering capacity you are missing, and keep maintenance and feature development in one prioritized backlog.</p><div className="rails-actions"><RailsCall>Discuss the team your SaaS needs</RailsCall><Link href="/technical-partner#fractional-cto">Fractional CTO and technical partnership <LinkIndicator /></Link></div></div></section>
      <TeamSection />
      <FounderPublications />
      <section className="rails-section rails-tinted"><div className="inner"><h2>How a small team supports your SaaS</h2><div className="rails-card-grid">
        <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="expertise" /><h3>Technical lead and Rails engineers</h3></div><p>Andrei leads application assessment, architecture and priorities. Rails engineers investigate production bugs, deliver backend features and maintain tests and dependencies. We agree who owns each workstream at the start.</p></article>
        <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="production" /><h3>Interfaces, operations and coordination</h3></div><p>Bring in web, mobile or delivery expertise when the scope calls for it. Keep API contracts, deployment steps and progress updates connected to the Rails work.</p></article>
        <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="communication" /><h3>Work alongside your team</h3></div><p>Agree repository access, code review, release responsibilities, communication cadence and available capacity. Keep the backlog and documentation visible to your internal engineers and founders.</p></article>
      </div>
        <div className="rails-actions"><Link href="/ruby-on-rails-maintenance#small-saas">Part-time support for a small SaaS <LinkIndicator /></Link></div>
      </div></section>
      <section className="rails-section" aria-labelledby="team-work-title">
        <div className="inner">
          <p className="rails-eyebrow">Documented client work</p>
          <h2 id="team-work-title">Examples of the work we deliver</h2>
          <p className="rails-intro">See how we support existing products through ongoing maintenance, focused performance improvements and delivery across teams.</p>
          <div className="rails-card-grid">
            <article className="rails-card">
              <div className="rails-situation-heading"><SituationIcon kind="ownership" /><h3>Worship Online</h3></div>
              <p className="rails-eyebrow">Maintenance and specialist coordination</p>
              <p>Took over an inherited Rails application, repaired defects and expanded test coverage while delivering a redesign. Coordinated specialist expertise around project needs and budget, then continued maintenance and development.</p>
              <Link href="/showcases/worshiponline-application-support-maintenance">Read the maintenance case study <LinkIndicator /></Link>
            </article>
            <article className="rails-card">
              <div className="rails-situation-heading"><SituationIcon kind="momentum" /><h3>CostaDelHome</h3></div>
              <p className="rails-eyebrow">Rails performance improvement</p>
              <p>Supported a busy development team and reduced search page loading from 10 seconds to 100ms. The documented result is 100× faster loading and a 99% reduction in wait time.</p>
              <Link href="/showcases/costa-del-home-search-performance">Read the performance case study <LinkIndicator /></Link>
            </article>
            <article className="rails-card">
              <div className="rails-situation-heading"><SituationIcon kind="communication" /><h3>Palladium</h3></div>
              <p className="rails-eyebrow">Rails and GraphQL delivery across teams</p>
              <p>Delivered an API and backoffice for a new portal while keeping the existing portal working. Refactored shared backend code, protected data integrity and coordinated dependencies with a third-party team.</p>
              <Link href="/showcases/public-api-development">Read the API delivery case study <LinkIndicator /></Link>
            </article>
          </div>
          <div className="rails-actions"><RailsCall>Discuss your SaaS engineering needs</RailsCall><Link href="/showcases">Explore all client work <LinkIndicator /></Link></div>
        </div>
      </section>
    </main>
  )
}
