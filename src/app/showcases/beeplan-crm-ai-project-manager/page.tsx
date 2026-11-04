import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import LinkIndicator from '@/components/LinkIndicator';
import SituationIcon from '@/components/rails/SituationIcon';
import { RailsCall } from '@/components/rails/RailsOwnership';
import beeplan from '@/cases/beeplan';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';

const { slug, body, metadata: copy } = beeplan;
const url = `https://widefix.com/showcases/${slug}`;
const heroAlt = 'Beeplan web app on a laptop-sized window with sticky notes, pending tasks and the week ahead, next to the Beeplan mobile app showing the task list, under the headline “Your studio, in order”';
// The company behind Beeplan's development; the link renders once a name and URL are set.
const studio: { name: string; url: string } | null = null;
const paragraphs = { display: 'grid', gap: '16px' } as const;
const shot = { display: 'block', width: '100%', height: 'auto', borderRadius: '8px' } as const;

const gallery = [
  ['invoice.webp', 'Beeplan invoice editor with line items, tax per line and withholding on the total, plus notes explaining that invoices add themselves up and always show whether they were issued, sent or paid', 'Invoices calculate tax per line and withholding on the total, and show whether each one was issued, sent or paid'],
  ['calendar.webp', 'Beeplan weekly calendar with appointments and tasks, with notes on Meet links and guests per event, a band for what is due that day and dragging an event to reschedule it', 'A calendar where each appointment carries its Meet link and guests, and dragging an event reschedules it'],
  ['task-board.webp', 'Beeplan task board with To do, In progress, In review and Done columns, showing a task being dragged from To do to In progress', 'A task board where moving work forward is a drag and drop'],
  ['content-plan.webp', 'Beeplan project calendar for a client’s monthly content plan next to a phone preview showing how the client will see the posts', 'A client’s monthly content plan, previewed the way the client will see it on their phone'],
] as const;

const modules = [
  ['communication', 'Clients', 'Contacts, projects and what each client owes on one card, with Beevo summarizing how the relationship is going.'],
  ['handover', 'Team', 'Bring collaborators into the studio’s workspace and hand out tasks, with role-based permissions for each person.'],
  ['priorities', 'Projects and tasks', 'Plan projects on a drag-and-drop board, track pending and overdue work, and set recurring tasks such as weekly client calls.'],
  ['production', 'Calendar and whiteboards', 'A calendar next to tasks and projects with two-way Google Calendar sync, Meet links per appointment and whiteboards for planning.'],
  ['payments', 'Invoices and bookkeeping', 'Invoices drafted from projects and rates when they are due, with taxes calculated per line, sent in one click and tracked until paid.'],
] as const;

const beevoSteps = [
  ['01', 'Ask in plain language', 'Questions like “How’s Onne going?” or requests like “Prepare Yourlay’s invoice” go to Beevo from the top of any screen.'],
  ['02', 'Review what Beevo proposes', 'Direct requests are carried out. Anything inferred, such as a project plan pulled from a PDF or an invoice, arrives as a proposal to approve.'],
  ['03', 'Approve or undo', 'Every change Beevo makes can be undone in one click, and the rest of Beeplan works fully without the assistant.'],
] as const;

const integrations = [
  ['payments', 'Subscriptions and trials', 'Stripe handles the Solo, Teams and Lifetime plans and a 14-day trial with no card. RevenueCat manages App Store and Google Play subscriptions for the apps.'],
  ['handover', 'Sign-in and notifications', 'Sign in with Google or Apple, and push notifications through APNs and Firebase Cloud Messaging.'],
  ['upgrades', 'Google Calendar sync', 'Events sync both ways and stay private to their owner. Access keys are stored encrypted, following Google’s Limited Use requirements.'],
  ['ownership', 'Privacy by design', 'Role-based permissions in each workspace, no financial data sent to the AI provider and no customer content used for training, under Colombian data law and GDPR.'],
] as const;

export const metadata: Metadata = {
  ...copy,
  alternates: { canonical: url },
  openGraph: { ...copy, url, siteName: 'WideFix', type: 'article', images: [socialPreview(body.bannerTopImageSrc, heroAlt)] },
  twitter: socialTwitter(body.bannerTopImageSrc, heroAlt),
};

export default function BeeplanShowcase() {
  return (
    <main className="actual-db-schema-page">
      <section className="schema-section schema-hero">
        <div className="schema-inner schema-hero-grid">
          <div className="schema-hero-copy">
            <Link className="schema-text-link" href="/showcases">All case studies <LinkIndicator /></Link>
            <Image src="/img/showcases/clients/beeplan.png" alt="Beeplan logo" width={146} height={36} style={{ display: 'block', margin: '20px 0' }} />
            <p className="schema-eyebrow">Beeplan / SaaS MVP with AI built in</p>
            <h1>{beeplan.preview.title}</h1>
            <p className="schema-lead">Beeplan brings clients, projects, tasks, calendar and invoicing together for creatives and studios, with Beevo, an AI assistant that handles the admin. We built it on Ruby on Rails, made AI part of the core product and are developing its Flutter apps for iOS and Android.</p>
            <div className="schema-actions"><a className="schema-button" href="https://www.beeplan.app/" target="_blank" rel="noopener noreferrer">Visit Beeplan <LinkIndicator /></a><a className="schema-text-link" href="#beevo-ai">See how Beevo works <LinkIndicator /></a></div>
          </div>
          <Image src={body.bannerTopImageSrc} alt={heroAlt} width={2000} height={1250} sizes="(max-width: 900px) 100vw, 50vw" priority style={shot} />
        </div>
      </section>

      <section className="schema-section schema-install">
        <div className="schema-inner schema-install-grid">
          <div><p className="schema-eyebrow">The problem</p><h2>{body.description}</h2><div style={paragraphs}>{body.descriptionText}{body.problemText}</div></div>
          <div className="schema-workflow"><div className="schema-capability-heading"><SituationIcon kind="priorities" /><h3>{body.detailsTitle}</h3></div><div style={paragraphs}>{body.detailsText}<p>The product is bilingual from the start, in English and Spanish, and works in a phone&apos;s browser while the native apps are in development.</p></div></div>
        </div>
      </section>

      <section className="schema-section schema-capabilities" aria-labelledby="beeplan-modules-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">What creatives get</p>
          <h2 id="beeplan-modules-title">Five connected modules on one Rails backend</h2>
          {body.solutionFirstText}
          <figure style={{ margin: '32px 0' }}>
            <Image src="/img/showcases/beeplan/connected-views.webp" alt="Stacked Beeplan screens for tasks, projects and calendar in perspective, under the headline “All your work, at a glance”" width={2000} height={1250} sizes="(max-width: 1228px) 100vw, 1188px" style={shot} />
            <figcaption className="schema-workflow-note">Tasks, projects and calendar stay connected: a change in one shows up in the others.</figcaption>
          </figure>
          <div className="schema-capability-list">{modules.map(([icon, heading, text]) => (
            <article key={heading}><div className="schema-capability-heading"><SituationIcon kind={icon} /><h3>{heading}</h3></div><p>{text}</p></article>
          ))}</div>
        </div>
      </section>

      <section className="schema-section schema-services" aria-labelledby="beeplan-gallery-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">Inside Beeplan</p>
          <h2 id="beeplan-gallery-title">Details that save a creative&apos;s week</h2>
          <p>Each of these screens removes a small piece of admin from a creative&apos;s day. The whole product is available in English and Spanish.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '32px 24px', marginTop: '32px' }}>{gallery.map(([file, alt, caption]) => (
            <figure key={file} style={{ margin: 0 }}>
              <Image src={`/img/showcases/beeplan/${file}`} alt={alt} width={2000} height={1250} sizes="(max-width: 900px) 100vw, 580px" style={shot} />
              <figcaption className="schema-workflow-note">{caption}</figcaption>
            </figure>
          ))}</div>
        </div>
      </section>

      <section className="schema-section schema-install" id="beevo-ai" aria-labelledby="beeplan-beevo-title">
        <div className="schema-inner schema-install-grid">
          <div><p className="schema-eyebrow">AI integration</p><h2 id="beeplan-beevo-title">An assistant that works on the studio&apos;s real data</h2><div style={paragraphs}>{body.solutionSecondText}<p>The integration is designed around trust. People stay in control of what the assistant creates, and the AI provider receives only what Beevo needs to answer, without financial data.</p></div></div>
          <div className="schema-workflow">
            <ol className="schema-workflow-steps">{beevoSteps.map(([number, heading, text]) => (
              <li key={number}><span>{number}</span><div><strong>{heading}</strong><small>{text}</small></div></li>
            ))}</ol>
          </div>
        </div>
      </section>

      <section className="schema-section schema-stats" aria-labelledby="beeplan-stats-title">
        <div className="schema-inner schema-stats-layout">
          <div className="schema-stats-intro">
            <p className="schema-eyebrow">Product at a glance</p>
            <h2 id="beeplan-stats-title">A paid SaaS product from the first release</h2>
            <p className="schema-stats-note">Live on the web with a 14-day free trial, monthly and yearly billing, and a one-time Lifetime plan.</p>
          </div>
          <dl className="schema-stats-values">
            {body.resultBoxes.map(box => <div key={box.message}><dt>{box.message}</dt><dd>{box.number}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="schema-section schema-capabilities" aria-labelledby="beeplan-integrations-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">Integrations and infrastructure</p>
          <h2 id="beeplan-integrations-title">The parts a SaaS MVP needs to earn trust</h2>
          <p>Beyond the core features, a product people pay for needs billing, sign-in, notifications, calendar sync and clear data handling. We connected Beeplan to proven services for each of them.</p>
          <div className="schema-capability-list">{integrations.map(([icon, heading, text]) => (
            <article key={heading}><div className="schema-capability-heading"><SituationIcon kind={icon} /><h3>{heading}</h3></div><p>{text}</p></article>
          ))}</div>
        </div>
      </section>

      <section className="schema-section schema-install" aria-labelledby="beeplan-mobile-title">
        <div className="schema-inner schema-install-grid">
          <div><p className="schema-eyebrow">Cross-platform mobile app</p><h2 id="beeplan-mobile-title">iPhone and Android apps on the same backend</h2><p>We are developing Beeplan&apos;s mobile apps in Flutter, so one codebase covers iOS and Android. They sync with the web app through the same Rails backend, with in-app subscriptions and push notifications already part of the architecture.</p></div>
          <div className="schema-workflow"><div className="schema-capability-heading"><SituationIcon kind="momentum" /><h3>Built for the full release cycle</h3></div><p>The apps are planned through build, App Store and Google Play review, publication and ongoing releases. Until they launch, Beeplan works in any phone&apos;s browser.</p></div>
        </div>
        <div className="schema-inner">
          <figure style={{ margin: '40px 0 0' }}>
            <Image src="/img/showcases/beeplan/mobile-apps.webp" alt="Three phones running the Beeplan mobile app in development, showing the home screen with pending tasks, the task list and the monthly calendar, under the headline “In your pocket, too”" width={2000} height={1250} sizes="(max-width: 1228px) 100vw, 1188px" style={shot} />
            <figcaption className="schema-workflow-note">The Flutter app in development: home, tasks and calendar on the phone.</figcaption>
          </figure>
        </div>
      </section>

      <section className="schema-section schema-capabilities">
        <div className="schema-inner">
          <p className="schema-eyebrow">Product ownership</p>
          <h2>Shipping the MVP was the beginning</h2>
          <div className="schema-capability-list">
            <article><div className="schema-capability-heading"><SituationIcon kind="ownership" /><h3>Long-term Rails ownership</h3></div><p>A subscription product keeps changing after launch. We continue developing the Rails application, keeping billing, integrations and data models healthy as new features and the mobile apps ship.</p></article>
            <article><div className="schema-capability-heading"><SituationIcon kind="expertise" /><h3>AI that keeps up with the product</h3></div><p>Each new module has to be readable by Beevo. Building both the product and its AI integration means the assistant evolves together with the features it works on.</p></article>
            <article><div className="schema-capability-heading"><SituationIcon kind="review" /><h3>Experience we bring to your MVP</h3></div><p>Building Beeplan meant combining scope, subscriptions, third-party integrations, AI and mobile in one product. That experience helps us plan a first version that can grow into a business.</p></article>
          </div>
          {studio && <p>Beeplan&apos;s development is led by <a className="schema-text-link" href={studio.url} target="_blank" rel="noopener noreferrer">{studio.name} <LinkIndicator /></a>.</p>}
        </div>
      </section>

      <section className="schema-section schema-services">
        <div className="schema-inner"><p className="schema-eyebrow">Build with WideFix</p><h2>{body.helpTitle}</h2><p>Tell us who the product is for, which integrations it depends on and the budget you have in mind. We can help define a focused first version, build the Rails application and its AI features, and keep it maintained after launch.</p><div className="schema-actions"><RailsCall>Discuss your MVP</RailsCall><Link className="schema-text-link" href="/mvp-development">Explore MVP development <LinkIndicator /></Link><Link className="schema-text-link" href="/ruby-on-rails-maintenance">Plan ongoing Rails maintenance <LinkIndicator /></Link></div></div>
      </section>
    </main>
  );
}
