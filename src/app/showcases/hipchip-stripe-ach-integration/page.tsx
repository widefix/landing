import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import DownloadPDF from '../worshiponline-paperclip-activestorage/DownloadPDF';
import shared from '../worshiponline-paperclip-activestorage/worshiponline.module.scss';
import styles from './hipchip.module.scss';

const title = 'HipChip: Legacy Rails App Takeover, Stripe & ACH - WideFix';
const description = 'Existing Rails app takeover for HipChip: ownership after its Rails developer left, automated tests, Stripe and ACH integration, and legacy Rails maintenance.';
const hero = '/img/showcases/hipchip-stripe-ach.svg';

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: 'https://widefix.com/showcases/hipchip-stripe-ach-integration' },
  twitter: socialTwitter(hero, 'HipChip Stripe and ACH payment integration'),
  openGraph: {
    title, description, siteName: 'WideFix', type: 'article',
    url: 'https://widefix.com/showcases/hipchip-stripe-ach-integration',
    images: [socialPreview(hero, 'HipChip Stripe and ACH payment integration')],
  },
};

const steps = [
  ['01', 'Take ownership and add tests', 'We took ownership of the legacy Ruby on Rails application after its previous developer left. Before making changes, we added automated tests to protect existing behavior and reduce the risk of breaking the app during upgrades and new integrations.'],
  ['02', 'Move payment processing to Stripe', 'We implemented the requested major payment upgrade, switching primary processing from Braintree to Stripe while retaining Braintree as a backup.'],
  ['03', 'Enable ACH bank payments', 'After the Stripe integration, we added Stripe ACH payments, extending the application’s payment options to include bank account payments.'],
];
const improvements = [
  ['01', 'Rails performance consultants', 'We addressed performance problems in the existing Rails app alongside the payment work, with priorities agreed with the client.'],
  ['02', 'Fix bugs and stabilize the app', 'We resolved bugs in the inherited application and made it more stable as we introduced the new integrations.'],
  ['03', 'Refine the existing UI', 'We made targeted interface improvements where they helped the product, discussing scope and priorities with the client throughout the work.'],
];

export default function HipChipShowcase() {
  return (
    <main className={`${shared.page} ${styles.page}`}>
      <section className={`${shared.hero} ${styles.hero}`}>
        <div className={shared.container}>
          <div className={shared.topline}>
            <Link className={shared.backLink} href="/showcases">All case studies</Link>
            <Image src="/img/showcases/clients/hipchip.svg" alt="HipChip" width={138} height={35} priority />
          </div>
          <div className={shared.heroGrid}>
            <div className={shared.heroCopy}>
              <p className={shared.eyebrow}>HIPCHIP / RUBY ON RAILS + PAYMENT ENGINEERING</p>
              <h1>A Rails app we took over<br /><span>Payments we upgraded</span><br />A stronger foundation</h1>
              <p className={shared.heroLead}>We took ownership of a legacy Rails application after its developer left, migrated payments to Stripe, and enabled ACH while improving the app&apos;s reliability</p>
              <div className={shared.heroActions}>
                <a href="#delivery" className={shared.primaryLink}>Explore the integration <span aria-hidden="true">↓</span></a>
                <DownloadPDF filename="hipchip-stripe-ach-integration.pdf" />
              </div>
            </div>
            <div className={`${shared.heroVisual} ${styles.heroVisual}`}>
              <Image src={hero} alt="HipChip payment setup with Stripe as the primary provider, ACH bank payments, and Braintree retained as a backup" width={960} height={640} priority sizes="(max-width: 860px) 100vw, 52vw" />
            </div>
          </div>
          <div className={shared.factBar}>
            <div><span>Application + ownership</span><strong>Ruby on Rails · Takeover</strong></div>
            <div><span>Payments</span><strong>Stripe + ACH · Braintree backup</strong></div>
            <div><span>Foundation</span><strong>Automated tests · Coverband</strong></div>
          </div>
        </div>
      </section>

      <section className={shared.intro}>
        <div className={shared.container}>
          <div className={shared.introHeading}><p className={shared.sectionTag}>EXISTING RAILS APP TAKEOVER</p><h2>The Rails developer left. We took ownership</h2></div>
          <div className={shared.introBody}>
            <p>HipChip came to us after its Rails developer left, with a legacy Ruby on Rails application and a major functionality upgrade to deliver. Our existing Rails app takeover included taking ownership of the codebase, protecting its existing behavior, and working with the client to move the product forward.</p>
            <p>The client wanted to migrate from Braintree to Stripe because Stripe was less expensive for their particular payment needs. They also valued its mature platform, broader charging options, and technical capabilities, including ACH. We implemented Stripe first, then enabled ACH bank payments.</p>
          </div>
        </div>
      </section>

      <section className={styles.delivery} id="delivery">
        <div className={shared.container}>
          <div className={styles.sectionHeading}><p className={shared.sectionTag}>THE PAYMENT UPGRADE</p><h2>Build confidence before changing payments</h2><p>Taking over a live Ruby on Rails application meant understanding and protecting its existing behavior before introducing new payment capabilities.</p></div>
          <ol className={styles.steps}>{steps.map(([number, heading, detail]) => <li key={number}><div className={styles.stepHeading}><span>{number}</span><h3>{heading}</h3></div><p>{detail}</p></li>)}</ol>
          <div className={styles.note}><strong>Tests before changes</strong><p>The automated tests reduced the risk of regressions during our upgrades and integrations, giving us a safer foundation for the work that followed.</p></div>
        </div>
      </section>

      <section className={shared.adaptations}>
        <div className={shared.container}>
          <div className={shared.adaptationsHeading}><p className={shared.sectionTag}>LEGACY RAILS MAINTENANCE</p><h2>Keep the Rails app stable as it evolves</h2><p>Payment integration was the major upgrade. We also improved the application around it, aligning each area of work with the client through discussion and prioritization.</p></div>
          <ol className={shared.adaptationList}>{improvements.map(([number, heading, detail]) => <li key={number}><span className={shared.adaptationIndex}>{number}</span><div><h3>{heading}</h3><p>{detail}</p></div></li>)}</ol>
        </div>
      </section>

      <section className={styles.cleanup}>
        <div className={`${shared.container} ${styles.cleanupGrid}`}>
          <div><p className={shared.eyebrow}>UNDERSTAND BEFORE REMOVING</p><h2>Use production evidence to identify dead code</h2><p>The inherited Rails codebase contained a substantial amount of unused code. It made the application harder to understand and maintain. Even AI assistance struggled with the noise, producing too many hallucinations while trying to work through the code.</p></div>
          <div className={styles.cleanupPanel}><h3>A cleanup guided by actual usage</h3><p>We agreed with the client to analyze the unused code before removing it. We enabled the Coverband gem in production to track which code was being used and inform that analysis.</p><p>This gave the agreed cleanup a basis in observed production activity, helping us assess what could be removed before making further changes.</p><span>Monitor usage → Analyze candidates → Guide removal</span></div>
        </div>
      </section>

      <section className={styles.results}>
        <div className={shared.container}>
          <p className={shared.sectionTag}>THE OUTCOME</p><h2>More payment options. A more stable application</h2>
          <div className={styles.resultGrid}>
            <article><Image className={styles.resultIcon} src="/img/credit-card.svg" alt="" aria-hidden="true" width={40} height={40} /><span>Primary processing</span><h3>Stripe</h3><p>Migration delivered, with Braintree retained as a backup.</p></article>
            <article><Image className={styles.resultIcon} src="/img/showcases/case/icons/money.svg" alt="" aria-hidden="true" width={40} height={40} /><span>Bank account payments</span><h3>ACH enabled</h3><p>Added after Stripe to expand the application&apos;s payment options.</p></article>
            <article><Image className={styles.resultIcon} src="/img/showcases/case/icons/stock.svg" alt="" aria-hidden="true" width={40} height={40} /><span>Safer ongoing development</span><h3>A stronger foundation</h3><p>Automated tests, better performance, bug fixes, targeted UI improvements, and production code usage monitoring.</p></article>
          </div>
        </div>
      </section>

      <section className={`${shared.outcome} ${styles.outcome}`}>
        <div className={shared.container}>
          <p className={shared.sectionTag}>OLD RAILS APP RESCUE</p><h2>Need an existing Rails app takeover?</h2>
          <p>If your Rails developer left or your legacy Rails application needs attention, we can take ownership, add automated tests, and prioritize maintenance, performance improvements, and new integrations with you.</p>
          <p>Looking for a fractional CTO for Rails? Discuss the technical direction, priorities, and ongoing ownership your application needs.</p>
          <Link href="https://calendly.com/andrei-kaleshka/30min" target="_blank" rel="noopener noreferrer" className={shared.outcomeLink}>Discuss your application <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
