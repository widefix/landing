import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import LinkIndicator from '@/components/LinkIndicator';
import SituationIcon from '@/components/rails/SituationIcon';
import { RailsCall } from '@/components/rails/RailsOwnership';
import budgetingkid from '@/cases/budgetingkid';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';

const { body, metadata: copy } = budgetingkid;
const reportUrl = 'https://budgetingkid.com/public_accounts/xXU8jg6QmFM3wjQZ9jv3f6c9l58yLBDo7SHj-6K9AAg';
const resources = [
  ['production', 'Use the live application', 'Explore the parent and child account experience in the working product.', 'https://budgetingkid.com/'],
  ['communication', 'Visit the landing page', 'See how we explain the allowance workflow to families.', 'https://get.budgetingkid.com/'],
  ['expertise', 'Explore the Rails application code', 'The pocketmoney repository contains the BudgetingKid application.', 'https://github.com/widefix/pocketmoney/'],
  ['review', 'Explore the landing page code', 'The separate budgetingkid-landing repository contains the Next.js website.', 'https://github.com/widefix/budgetingkid-landing'],
] as const;

export const metadata: Metadata = {
  ...copy,
  alternates: { canonical: 'https://widefix.com/showcases/budgetingkid' },
  openGraph: { ...copy, url: 'https://widefix.com/showcases/budgetingkid', siteName: 'WideFix', type: 'article', images: [socialPreview(body.bannerTopImageSrc, 'BudgetingKid family allowance workflow illustration')] },
  twitter: socialTwitter(body.bannerTopImageSrc, 'BudgetingKid family allowance workflow illustration'),
};

export default function BudgetingKidShowcase() {
  return (
    <main className="actual-db-schema-page">
      <section className="schema-section schema-hero">
        <div className="schema-inner schema-hero-grid">
          <div className="schema-hero-copy">
            <Link className="schema-text-link" href="/showcases">All case studies <LinkIndicator /></Link>
            <Image src="/img/showcases/clients/budgetingkid.svg" alt="BudgetingKid logo" width={88} height={80} style={{ display: 'block', margin: '20px 0' }} />
            <p className="schema-eyebrow">BudgetingKid / Our own MVP</p>
            <h1>A family budgeting MVP kept free for everyone</h1>
            <p className="schema-lead">We built BudgetingKid to manage pocket money in our own family, explored a commercial launch and chose to keep the product public and free. It is a working example of taking an everyday problem through implementation and a business decision.</p>
            <div className="schema-actions"><a className="schema-button" href="https://budgetingkid.com/" target="_blank" rel="noopener noreferrer">Try BudgetingKid <LinkIndicator /></a><a className="schema-text-link" href="#live-report">See a report in action <LinkIndicator /></a></div>
          </div>
          <Image src="/img/showcases/budgetingkid/account-dashboard.png" alt="BudgetingKid account dashboard with balance controls, transaction history, savings goals, recurring allowance settings and a monthly balance chart" width={2068} height={1718} sizes="(max-width: 900px) 100vw, 40vw" priority style={{ width: '100%', height: 'auto' }} />
        </div>
      </section>

      <section className="schema-section schema-install">
        <div className="schema-inner schema-install-grid">
          <div><p className="schema-eyebrow">A personal starting point</p><h2>{body.description}</h2>{body.descriptionText}<p>The product gives parents and children a shared starting point for conversations about allowances, expenses and saving.</p></div>
          <div className="schema-workflow"><div className="schema-capability-heading"><SituationIcon kind="payments" /><h3>From allowance to a shared view</h3></div>{body.solutionFirstText}<p>Both the application and the landing page have public source repositories, so the implementation can be explored alongside the live product.</p></div>
        </div>
      </section>

      <section className="schema-section schema-services" id="live-report" aria-labelledby="budgetingkid-report-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">The product in everyday use</p>
          <h2 id="budgetingkid-report-title">See a real financial report in action</h2>
          <p>Andrei has shared a public view of his child&apos;s financial report as an example of BudgetingKid in use. Open it to explore the reporting experience with a real account.</p>
          <figure style={{ margin: '32px 0' }}>
            <a href="/img/showcases/budgetingkid/accounts-overview.png" target="_blank" rel="noopener noreferrer" aria-label="Open the full-size BudgetingKid accounts overview screenshot">
              <Image src="/img/showcases/budgetingkid/accounts-overview.png" alt="BudgetingKid accounts overview listing family accounts with balances, increase and decrease controls, and an Add account button" width={2784} height={1718} sizes="(max-width: 1228px) 100vw, 1188px" style={{ display: 'block', width: '100%', height: 'auto', border: '1px solid #d7e4df', borderRadius: '8px' }} />
            </a>
            <figcaption className="schema-workflow-note">The accounts overview brings family balances and quick adjustments into one place. Select the screenshot to view it at full size.</figcaption>
          </figure>
          <figure style={{ margin: '32px 0' }}>
            <a href="/img/showcases/budgetingkid/account-dashboard.png" target="_blank" rel="noopener noreferrer" aria-label="Open the full-size BudgetingKid dashboard screenshot">
              <Image src="/img/showcases/budgetingkid/account-dashboard.png" alt="Real BudgetingKid account screen showing account sharing and editing, balance adjustments, transaction history, goals, recurring allowance controls and a monthly balance chart" width={2068} height={1718} sizes="(max-width: 1228px) 100vw, 1188px" style={{ display: 'block', width: '100%', height: 'auto', border: '1px solid #d7e4df', borderRadius: '8px' }} />
            </a>
            <figcaption className="schema-workflow-note">The account dashboard in use: balance, transactions, goals, recurring allowance settings and balance history. Select the screenshot to view it at full size.</figcaption>
          </figure>
          <a className="schema-text-link" href={reportUrl} target="_blank" rel="noopener noreferrer">Open the public financial report <LinkIndicator /></a>
        </div>
      </section>

      <section className="schema-section schema-capabilities">
        <div className="schema-inner">
          <p className="schema-eyebrow">Product learning</p>
          <h2>A working MVP and a deliberate business decision</h2>
          <div className="schema-capability-list">
            <article><div className="schema-capability-heading"><SituationIcon kind="expertise" /><h3>Startup school for social projects</h3></div><div>{body.solutionSecondText}</div></article>
            <article><div className="schema-capability-heading"><SituationIcon kind="priorities" /><h3>Why we chose a noncommercial future</h3></div><div>{body.detailsText}<p>The application is available to everyone now. We are keeping it public rather than investing in a broader commercial rollout.</p></div></article>
            <article><div className="schema-capability-heading"><SituationIcon kind="ownership" /><h3>Experience we bring to your MVP</h3></div><p>Building our own product meant making decisions about scope, implementation, operating costs and distribution together. That experience helps us discuss what your first version needs and how the work fits your budget. Our ongoing Rails maintenance work also informs how we structure applications for later changes.</p></article>
          </div>
        </div>
      </section>

      <section className="schema-section schema-install" aria-labelledby="budgetingkid-resources-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">Public product and source code</p>
          <h2 id="budgetingkid-resources-title">Explore what we built</h2>
          <div className="schema-capability-list">{resources.map(([icon, heading, text, href]) => (
            <article key={href}><div className="schema-capability-heading"><SituationIcon kind={icon} /><h3>{heading}</h3></div><div><p>{text}</p><a className="schema-text-link" href={href} target="_blank" rel="noopener noreferrer">{heading} <LinkIndicator /></a></div></article>
          ))}</div>
        </div>
      </section>

      <section className="schema-section schema-services">
        <div className="schema-inner"><p className="schema-eyebrow">Build with WideFix</p><h2>{body.helpTitle}</h2><p>Tell us who the product is for, what they need to do and the budget you have in mind. We can help define a focused first version and carry the work through implementation.</p><div className="schema-actions"><RailsCall>Discuss your MVP</RailsCall><Link className="schema-text-link" href="/mvp-development">Explore MVP development <LinkIndicator /></Link><Link className="schema-text-link" href="/ruby-on-rails-maintenance">Plan ongoing Rails maintenance <LinkIndicator /></Link></div></div>
      </section>
    </main>
  );
}
