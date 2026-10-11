import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../worshiponline-paperclip-activestorage/worshiponline.module.scss';

const image = '/img/showcases/worshiponline-ownership.svg';
const title = 'Rails Application Support and Maintenance: Worship Online - WideFix';
const description = 'How WideFix took over an existing Ruby on Rails application after a developer handover, fixed defects, expanded test coverage, delivered a redesign and coordinated specialists around the project budget.';
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: 'https://widefix.com/showcases/worshiponline-application-support-maintenance' },
  twitter: socialTwitter(image, 'Worship Online: Rails application takeover, support and maintenance'),
  openGraph: {
    images: [socialPreview(image, 'Worship Online: Rails application takeover, support and maintenance')],
    title, description,
    url: 'https://widefix.com/showcases/worshiponline-application-support-maintenance',
    siteName: 'WideFix', locale: 'en_US', type: 'article',
  },
};

const stages = [
  { label: '01 / HANDOVER', title: 'Take ownership of an inherited Rails application', detail: 'The previous developer was leaving. Alongside the original redesign request, WideFix needed to understand the existing codebase and take responsibility for moving the product forward.' },
  { label: '02 / STABILIZATION', title: 'Fix defects and improve confidence in changes', detail: 'As we explored the system, we found and addressed existing bugs and defects and added automated tests. Supporting the live application was part of the work, not something postponed until after the redesign.' },
  { label: '03 / PRODUCT DELIVERY', title: 'Redesign without abandoning the working product', detail: 'We implemented the redesigned experience incrementally, keeping the production application running and maintaining compatibility with existing mobile clients. New product work and application maintenance moved forward together.' },
  { label: '04 / TEAM & BUDGET', title: 'Bring in the right expertise at the right time', detail: 'WideFix identified the competencies required for different parts of the project, found suitable specialists and coordinated their work with attention to delivery efficiency and the project budget.' },
  { label: '05 / CONTINUITY', title: 'Support and modernize the application over time', detail: 'The relationship went beyond an initial redesign. Ongoing work included application maintenance, additional features, production reliability and modernization of existing infrastructure and dependencies.' },
];

const related = [
  { title: 'Incremental Rails application redesign', desc: 'A redesigned product experience while keeping production available.', href: '/showcases/ruby-on-rails-redesign' },
  { title: 'Stripe subscription data consistency', desc: 'Fixing webhook processing, reconciling subscription records and adding monitoring.', href: '/showcases/stripe-integration' },
  { title: 'Paperclip to ActiveStorage migration', desc: 'Staged production media migration that preserved uploads and public URLs.', href: '/showcases/worshiponline-paperclip-activestorage' },
  { title: 'Cross-platform mobile development', desc: 'Specialized mobile engineering connected to the existing product.', href: '/showcases/build-crossplatform-mobile-application' },
];

export default function WorshipOnlineOwnershipShowcase() {
  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.topline}>
          <Link className={styles.backLink} href="/showcases">All case studies</Link>
          <Image src="/img/showcases/clients/wo.svg" alt="Worship Online" width={138} height={35} priority />
        </div>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>WORSHIP ONLINE / RUBY ON RAILS APPLICATION SUPPORT AND MAINTENANCE</p>
            <h1>From a redesign request to <span>long-term Rails ownership.</span></h1>
            <p className={styles.heroLead}>When the previous developer was leaving, WideFix took over an existing Rails application, repaired defects, built test coverage and delivered a redesign—while finding the right specialist skills for the work and budget.</p>
            <div className={styles.heroActions}>
              <Link href="#approach" className={styles.primaryLink}>Explore our approach <span aria-hidden="true">↓</span></Link>
              <Link href="/ruby-on-rails-application-takeover" className={styles.secondaryLink}>Our Rails takeover service</Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <Image src={image} alt="Worship Online application takeover from inherited Rails code through stabilization and team coordination to ongoing support and redesign" width={960} height={560} priority sizes="(max-width: 860px) 100vw, 52vw" />
          </div>
        </div>
        <div className={styles.factBar}>
          <div><span>Starting need</span><strong>Redesign + developer handover</strong></div>
          <div><span>Our role</span><strong>Rails application support &amp; maintenance</strong></div>
          <div><span>Approach</span><strong>Technical ownership + right-sized team</strong></div>
        </div>
      </div>
    </section>

    <section className={styles.intro}>
      <div className={styles.container}>
        <div className={styles.introHeading}>
          <p className={styles.sectionTag}>THE BUSINESS CHALLENGE</p>
          <h2>A redesign was only part of the problem.</h2>
        </div>
        <div className={styles.introBody}>
          <p>Worship Online already had a live Ruby on Rails application. The original request was to redesign it, but the previous developer was leaving. That created a broader need: take over an unfamiliar codebase, understand the risks of changing a production product, and keep it dependable while new work continued.</p>
          <p>We encountered existing bugs and gaps in automated test coverage along the way. Addressing those issues could not be separated from the redesign: the team needed a safe foundation for each new release.</p>
        </div>
      </div>
    </section>

    <section className={styles.timeline} id="approach">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <p className={styles.sectionTag}>APPLICATION TAKEOVER &amp; ONGOING SUPPORT</p>
          <h2>Support the existing app while building what comes next.</h2>
          <p>Taking ownership meant understanding the old system, fixing its problems and coordinating the capabilities needed for the next stage of the product.</p>
        </header>
        <ol className={styles.phaseList}>
          {stages.map(stage => <li className={styles.phase} key={stage.label}>
            <div className={styles.phaseDate}>{stage.label}</div>
            <div className={styles.phaseContent}><h3>{stage.title}</h3><p>{stage.detail}</p></div>
          </li>)}
        </ol>
      </div>
    </section>

    <section className={styles.adaptations}>
      <div className={styles.container}>
        <div className={styles.adaptationsHeading}>
          <p className={styles.sectionTag}>THE DELIVERY MODEL</p>
          <h2>Technical leadership, not just developer hours.</h2>
          <p>Application maintenance and product delivery call for different skills. WideFix coordinated expertise around actual project needs instead of leaving the client to recruit and manage every specialist.</p>
        </div>
        <ol className={styles.adaptationList}>
          <li><span className={styles.adaptationIndex}>01</span><div><h3>Own the existing system</h3><p>Understand the Rails codebase, resolve defects, improve tests and protect live workflows.</p></div></li>
          <li><span className={styles.adaptationIndex}>02</span><div><h3>Find the right competencies</h3><p>Identify and bring in specialists for the work at hand, including the redesign and continued development.</p></div></li>
          <li><span className={styles.adaptationIndex}>03</span><div><h3>Respect the product budget</h3><p>Match expertise and implementation choices to business priorities and available budget, rather than building a larger team by default.</p></div></li>
          <li><span className={styles.adaptationIndex}>04</span><div><h3>Maintain continuity</h3><p>Keep support, stabilization and new product development connected through ongoing technical ownership.</p></div></li>
        </ol>
      </div>
    </section>

    <section className={styles.timeline}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <p className={styles.sectionTag}>EVIDENCE FROM THE SAME PRODUCT</p>
          <h2>See the projects behind the partnership.</h2>
          <p>These existing case studies document individual parts of our work with Worship Online.</p>
        </header>
        <ol className={styles.phaseList}>
          {related.map(item => <li className={styles.phase} key={item.href}>
            <div className={styles.phaseDate}>WORSHIP ONLINE</div>
            <div className={styles.phaseContent}>
              <h3>{item.title}</h3><p>{item.desc}</p>
              <Link href={item.href}>Read the detailed case study →</Link>
            </div>
          </li>)}
        </ol>
      </div>
    </section>

    <section className={styles.outcome}>
      <div className={styles.container}>
        <p className={styles.sectionTag}>WHAT APPLICATION OWNERSHIP DELIVERED</p>
        <h2>More than a redesign: an ongoing technical partner.</h2>
        <p>WideFix took over the inherited Rails application, addressed accumulated defects, expanded automated testing and delivered redesign work while coordinating specialist expertise against project needs and budget. That engagement continued into application support, maintenance and technical modernization.</p>
        <Link href="/ruby-on-rails-application-takeover" className={styles.outcomeLink}>Discuss taking over your Rails application <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  </main>;
}
