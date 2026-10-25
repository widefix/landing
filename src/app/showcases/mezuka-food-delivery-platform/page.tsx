import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import LinkIndicator from '@/components/LinkIndicator';
import mezuka from '@/cases/mezuka';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import shared from '../worshiponline-paperclip-activestorage/worshiponline.module.scss';
import styles from './mezuka.module.scss';

const { body, metadata: copy } = mezuka;
const hero = body.bannerTopImageSrc;
export const metadata: Metadata = {
  ...copy,
  alternates: { canonical: 'https://widefix.com/showcases/mezuka-food-delivery-platform' },
  openGraph: { ...copy, type: 'article', siteName: 'WideFix', url: 'https://widefix.com/showcases/mezuka-food-delivery-platform', images: [socialPreview(hero, 'Mezuka customer ordering interface')] },
  twitter: socialTwitter(hero, 'Mezuka customer ordering interface'),
};
const delivery = [
  ['Product and team ownership', body.detailsText],
  ['An ambitious homepage for a 2014–2016 MVP', <>
    <p>The homepage brought together several demanding features for an MVP built in 2014–2016: a map of stores, Elasticsearch full-text search scoped to ZIP-code areas, and visual highlighting of those areas on the map, including on mouseover. Customers could see which area they were searching.</p>
    <p>The application identified the customer’s location and loaded the relevant stores, helping customers find restaurants serving their area.</p>
    <p>In the backoffice, uploading a store’s hero background image automatically generated a distinct UI color palette for that store. Store teams could give their storefront a coordinated appearance through a single image upload.</p>
  </>],
  ['Ordering, payments and restaurant integrations', body.solutionFirstText],
  ['Deployment, testing and application architecture', body.solutionSecondText],
] as const;

const openSourceGroups = [
  {
    title: 'Tools we built',
    projects: [
      { name: 'enum', repo: 'enum', description: 'A safe enum implementation for Ruby.', icon: 'M9 5H5v14h4M15 5h4v14h-4M10 9l-3 3 3 3M14 9l3 3-3 3' },
      { name: 'static_struct', repo: 'static_struct', description: 'Converts Ruby hashes into static Ruby objects.', icon: 'm12 3 9 5-9 5-9-5 9-5ZM3 8v8l9 5 9-5V8M12 13v8' },
    ],
  },
  {
    title: 'Dependencies we fixed',
    projects: [
      { name: 'Active Merchant', repo: 'active_merchant', description: 'Payment gateway integrations.', icon: 'M3 8h18M3 11h18M6 16h4M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z' },
      { name: 'wkhtmltopdf-binary', repo: 'wkhtmltopdf-binary', description: 'PDF generation from HTML.', icon: 'M14 3H5v18h14V8l-5-5ZM14 3v5h5M8 12h8M8 16h6' },
      { name: 'watir-rails', repo: 'watir-rails', description: 'Browser testing support for Rails.', icon: 'M3 8h18M6 5h.01M9 5h.01M12 5h.01M3 3h18v18H3V3ZM8 14l3 3 5-6' },
      { name: 'Puma', repo: 'puma', description: 'The Ruby web server behind the application.', icon: 'M4 3h16v7H4V3ZM4 14h16v7H4v-7ZM7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6' },
    ],
  },
  {
    title: 'Experience we shared',
    projects: [
      { name: 'Mezuka developer blog', repo: 'mezuka.github.com', description: 'Development lessons and experience from the team.', icon: 'M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1ZM12 5v15M6 8h3M6 12h3M15 8h3M15 12h3' },
    ],
  },
];

export default function MezukaShowcase() {
  return <main className={shared.page}>
    <section className={shared.hero}><div className={shared.container}>
      <div className={shared.topline}><Link className={shared.backLink} href="/showcases">All case studies</Link><Image src={mezuka.preview.companyImageSrc} alt="Mezuka" width={138} height={35} /></div>
      <div className={shared.heroGrid}>
        <div className={shared.heroCopy}>
          <p className={shared.eyebrow}>MEZUKA / MVP DEVELOPMENT + TECHNICAL LEADERSHIP</p>
          <h1>A food delivery MVP <span>built from scratch</span></h1>
          <p className={shared.heroLead}>From business requirements to a working minimum viable product (MVP), integrated restaurant workflows and a team of 10 developers.</p>
          <p className={shared.heroLead}>Built December 2014–June 2016. The product did not launch because of a market-fit mismatch.</p>
          <a className={shared.primaryLink} href="#delivery">Explore the work delivered <LinkIndicator /></a>
        </div>
        <div className={shared.heroVisual}><Image src={hero} alt="Mezuka customer interface with account registration, restaurant search and a map" width={500} height={350} priority sizes="(max-width: 860px) 100vw, 52vw" /></div>
      </div>
      <div className={shared.factBar}><div><span>Role</span><strong>CTO + engineering team lead</strong></div><div><span>Technology</span><strong>Ruby on Rails · PostgreSQL · Elasticsearch</strong></div><div><span>Project status</span><strong>MVP built · Not commercially launched</strong></div></div>
    </div></section>
    <section className={shared.intro}><div className={shared.container}>
      <div className={shared.introHeading}><p className={shared.sectionTag}>THE PRODUCT</p><h2>{body.description}</h2></div>
      <div className={`${shared.introBody} ${styles.lessonsCopy}`}>{body.descriptionText}{body.problemText}</div>
    </div></section>
    <section className={shared.timeline} id="delivery"><div className={shared.container}>
      <div className={shared.sectionHeader}><p className={shared.sectionTag}>THE WORK DELIVERED</p><h2>Own the application from requirements to implementation</h2></div>
      <ol className={shared.phaseList}>{delivery.map(([heading, detail], index) => <li className={shared.phase} key={heading}><span className={shared.phaseDate}>0{index + 1}</span><div className={shared.phaseContent}><h3>{heading}</h3>{detail}</div></li>)}</ol>
      <figure className={`${styles.figure} ${styles.homepage}`}><Image src="/img/showcases/mezuka/customer-homepage.png" alt="Mezuka homepage with a pizza hero background, account registration, location and restaurant search, a store map and nearby restaurant results" width={500} height={350} sizes="(max-width: 700px) 100vw, 700px" /><figcaption>The MVP homepage combined store discovery on a map, location-based results and search by ZIP-code area. Each store’s UI colors were generated automatically from its uploaded hero image.</figcaption></figure>
    </div></section>
    <section className={shared.adaptations}><div className={shared.container}>
      <div className={shared.adaptationsHeading}><p className={shared.sectionTag}>PRODUCT DESIGN</p><h2>A backoffice for restaurant menus</h2><p>The supplied backoffice design shows menu categories, dishes and pricing. It is presented as a design artifact, rather than evidence of a live restaurant deployment.</p></div>
      <figure className={`${styles.figure} ${styles.design}`}><Image src="/img/showcases/mezuka/backoffice-design.png" alt="Supplied restaurant backoffice design with menu categories, item prices and editing controls" width={1687} height={2048} sizes="(max-width: 860px) 100vw, 52vw" /><figcaption>Restaurant menu backoffice design supplied with the project materials.</figcaption></figure>
    </div></section>
    <section className={styles.openSource} aria-labelledby="open-source-title"><div className={shared.container}>
      <div className={shared.sectionHeader}><p className={shared.sectionTag}>OPEN SOURCE</p><h2 id="open-source-title">Tools built and dependencies fixed along the way</h2></div>
      <p className={styles.openSourceLead}>Building Mezuka meant taking ownership of the supporting tools, too. We created reusable Ruby libraries, fixed issues in our dependencies through Mezuka forks, and shared our experience.</p>
      {openSourceGroups.map(group => <div className={styles.projectGroup} key={group.title}>
        <h3>{group.title}</h3>
        <ul className={styles.projectGrid}>{group.projects.map(project => <li key={project.repo}>
          <a className={styles.projectCard} href={`https://github.com/mezuka/${project.repo}`} target="_blank" rel="noopener noreferrer">
            <span className={styles.projectIcon} aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false"><path d={project.icon} /></svg></span>
            <div className={styles.projectCopy}><h4>{project.name}</h4><p>{project.description}</p><span className={styles.projectLink}>View on GitHub <LinkIndicator /></span></div>
          </a>
        </li>)}</ul>
      </div>)}
    </div></section>
    <section className={shared.intro} id="outcome"><div className={shared.container}>
      <div className={shared.introHeading}><p className={shared.sectionTag}>DELIVERY AND COMMERCIAL OUTCOME</p><h2>A working MVP with an unlaunched business</h2></div>
      <div className={shared.introBody}>{body.resultText}</div>
    </div></section>
    <section className={shared.intro} aria-labelledby="lessons-title"><div className={shared.container}>
      <div className={shared.introHeading}><p className={shared.sectionTag}>LESSONS LEARNED</p><h2 id="lessons-title">Strong technology is only part of a successful business</h2></div>
      <div className={`${shared.introBody} ${styles.lessonsCopy}`}>
        <p>Mezuka reinforced a lasting lesson for us: even strong engineering and a working product with complex features are not enough to establish a successful, profitable business. Technical delivery and commercial success are different milestones.</p>
        <p>A business also needs product-market fit, a clear business strategy, marketing, sales and effective communication with customers, partners and the team. Those efforts need to develop alongside the product; adding more features cannot substitute for understanding demand and finding a viable way to reach and serve customers.</p>
        <p>For founders and application owners, the practical lesson is to validate demand early, test how customers will discover and buy the offering, and keep product priorities connected to what those conversations reveal. Engineering should support that business strategy, with clear communication between the people building the product and those bringing it to market.</p>
      </div>
    </div></section>
    <section className={shared.intro} aria-labelledby="clutch-title"><div className={shared.container}>
      <div className={shared.introHeading}><p className={shared.sectionTag}>FOUNDER REVIEW + PROJECT PORTFOLIO</p><h2 id="clutch-title">Read more about Mezuka on Clutch</h2></div>
      <div className={shared.introBody}>
        <p><a href="https://clutch.co/go-to-review/3daf5bc9-5fe7-40a7-9984-91d4b884ea25/67459" target="_blank" rel="noopener noreferrer">Read the Mezuka founder’s review on Clutch <LinkIndicator /></a></p>
        <p><a href="https://clutch.co/profile/widefix#portfolio-and-awards&portfolioId=1340658" target="_blank" rel="noopener noreferrer">View the Mezuka portfolio item on Clutch <LinkIndicator /></a></p>
      </div>
    </div></section>
    <section className={shared.outcome}><div className={shared.container}>
      <p className={shared.sectionTag}>BUILD WITH MAINTENANCE IN MIND</p><h2>Planning a new Rails application?</h2>
      <p>We also build applications from scratch. Our experience maintaining existing Rails products informs architecture, automated testing, integrations and deployment decisions from the start, giving future developers a clearer foundation to work with.</p>
      <Link href="https://calendly.com/andrei-kaleshka/30min" target="_blank" rel="noopener noreferrer" className={shared.outcomeLink}>Discuss your application <LinkIndicator /></Link>
    </div></section>
  </main>;
}
