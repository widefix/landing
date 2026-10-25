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
  ['Ordering, search and restaurant integrations', body.solutionFirstText],
  ['Deployment, testing and application architecture', body.solutionSecondText],
] as const;

export default function MezukaShowcase() {
  return <main className={shared.page}>
    <section className={shared.hero}><div className={shared.container}>
      <div className={shared.topline}><Link className={shared.backLink} href="/showcases">All case studies</Link><Image src={mezuka.preview.companyImageSrc} alt="Mezuka" width={138} height={35} /></div>
      <div className={shared.heroGrid}>
        <div className={shared.heroCopy}>
          <p className={shared.eyebrow}>MEZUKA / PRODUCT DEVELOPMENT + TECHNICAL LEADERSHIP</p>
          <h1>A food delivery platform <span>built from scratch</span></h1>
          <p className={shared.heroLead}>From business requirements to a working application, integrated restaurant workflows and a team of 10 developers.</p>
          <p className={shared.heroLead}>Built December 2014–June 2016. The product did not launch because of a market-fit mismatch.</p>
          <a className={shared.primaryLink} href="#delivery">Explore the work delivered <LinkIndicator /></a>
        </div>
        <div className={shared.heroVisual}><Image src={hero} alt="Mezuka customer interface with account registration, restaurant search and a map" width={500} height={350} priority sizes="(max-width: 860px) 100vw, 52vw" /></div>
      </div>
      <div className={shared.factBar}><div><span>Role</span><strong>CTO + engineering team lead</strong></div><div><span>Technology</span><strong>Ruby on Rails · PostgreSQL · Elasticsearch</strong></div><div><span>Project status</span><strong>Built · Not commercially launched</strong></div></div>
    </div></section>
    <section className={shared.intro}><div className={shared.container}>
      <div className={shared.introHeading}><p className={shared.sectionTag}>THE PRODUCT</p><h2>{body.description}</h2></div>
      <div className={shared.introBody}>{body.descriptionText}{body.problemText}</div>
    </div></section>
    <section className={shared.timeline} id="delivery"><div className={shared.container}>
      <div className={shared.sectionHeader}><p className={shared.sectionTag}>THE WORK DELIVERED</p><h2>Own the application from requirements to implementation</h2></div>
      <ol className={shared.phaseList}>{delivery.map(([heading, detail], index) => <li className={shared.phase} key={heading}><span className={shared.phaseDate}>0{index + 1}</span><div className={shared.phaseContent}><h3>{heading}</h3>{detail}</div></li>)}</ol>
      <figure className={styles.figure}><Image src="/img/showcases/mezuka/project-overview.png" alt="Archived Mezuka portfolio overview showing its customer interface and documented ordering, payment and search functionality" width={2048} height={845} sizes="(max-width: 860px) 100vw, 1160px" /><figcaption>Archived project overview and customer-facing interface.</figcaption></figure>
    </div></section>
    <section className={shared.adaptations}><div className={shared.container}>
      <div className={shared.adaptationsHeading}><p className={shared.sectionTag}>PRODUCT DESIGN</p><h2>A backoffice for restaurant menus</h2><p>The supplied backoffice design shows menu categories, dishes and pricing. It is presented as a design artifact, rather than evidence of a live restaurant deployment.</p></div>
      <figure className={`${styles.figure} ${styles.design}`}><Image src="/img/showcases/mezuka/backoffice-design.png" alt="Supplied restaurant backoffice design with menu categories, item prices and editing controls" width={1687} height={2048} sizes="(max-width: 860px) 100vw, 52vw" /><figcaption>Restaurant menu backoffice design supplied with the project materials.</figcaption></figure>
    </div></section>
    <section className={shared.intro} id="outcome"><div className={shared.container}>
      <div className={shared.introHeading}><p className={shared.sectionTag}>DELIVERY AND COMMERCIAL OUTCOME</p><h2>Working software with an unlaunched business</h2></div>
      <div className={shared.introBody}>{body.resultText}<p>The distinction matters: completing an application and finding product-market fit are separate milestones. A new product needs demand validation alongside engineering delivery.</p></div>
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
