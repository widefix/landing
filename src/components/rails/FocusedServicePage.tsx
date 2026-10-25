import LinkIndicator from '@/components/LinkIndicator';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { ComponentProps } from 'react';
import SituationIcon from './SituationIcon';

import { RailsCall } from './RailsOwnership';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';

type ServiceIcon = ComponentProps<typeof SituationIcon>['kind'];

export interface FocusedService {
  slug: string; title: string; description: string; heading: string; intro: string;
  image: string; imageAlt: string; cta: string;
  imageWidth?: number; imageHeight?: number;
  evidenceHeading?: string; evidenceEyebrow?: string;
  sections: { id: string; title: string; intro?: string; items: { title: string; detail: string; icon?: ServiceIcon }[] }[];
  evidence: { title: string; detail: string; href: string; icon?: ServiceIcon; linkLabel?: string }[];
  reading: { title: string; href: string; detail?: string; icon?: ServiceIcon }[];
  articles?: { title: string; href: string; detail?: string; icon?: ServiceIcon }[];
}

export function serviceMetadata(service: FocusedService): Metadata {
  const url = `https://widefix.com/${service.slug}`;
  return { title: service.title, description: service.description, alternates: { canonical: url },
    openGraph: { title: service.title, description: service.description, url, siteName: 'WideFix', locale: 'en_US', type: 'website', images: [socialPreview(service.image, service.imageAlt)] },
    twitter: socialTwitter(service.image, service.imageAlt) };
}

export default function FocusedServicePage({ service, children }: { service: FocusedService; children?: React.ReactNode }) {
  return <main className="rails-home rails-services">
    <section className="rails-section rails-hero"><div className="inner rails-hero-grid">
      <div><p className="rails-eyebrow">Services for existing applications</p><h1>{service.heading}</h1><p className="rails-intro">{service.intro}</p><div className="rails-actions"><RailsCall>{service.cta}</RailsCall><Link href="#evidence">See supporting work <LinkIndicator /></Link></div></div>
      <div className="rails-hero-aside"><Image src={service.image} alt={service.imageAlt} width={service.imageWidth ?? 560} height={service.imageHeight ?? 490} sizes="(max-width: 900px) 100vw, 45vw" priority /></div>
    </div></section>
    {service.sections.map((section, index) => <section key={section.id} id={section.id} className={`rails-section ${index % 2 === 0 ? 'rails-tinted' : ''}`}><div className="inner">
      <h2>{section.title}</h2>{section.intro && <p className="rails-intro">{section.intro}</p>}
      <div className="rails-card-grid">{section.items.map(item => <article className="rails-card" key={item.title}><div className="rails-situation-heading">{item.icon && <SituationIcon kind={item.icon} />}<h3>{item.title}</h3></div><p>{item.detail}</p></article>)}</div>
    </div></section>)}
    <section className="rails-section" id="evidence"><div className="inner"><p className="rails-eyebrow">{service.evidenceEyebrow || 'Documented client work'}</p><h2>{service.evidenceHeading || 'Evidence behind the offer'}</h2><div className="rails-card-grid">{service.evidence.map(item => <article className="rails-card" key={item.href}><div className="rails-situation-heading">{item.icon && <SituationIcon kind={item.icon} />}<h3>{item.title}</h3></div><p>{item.detail}</p><Link href={item.href}>{item.linkLabel || 'Read the case study'} <LinkIndicator /></Link></article>)}</div></div></section>
    {children}
    {service.articles && service.articles.length > 0 && <section className="rails-section" aria-labelledby="upgrade-articles-title">
      <div className="inner">
        <p className="rails-eyebrow">Further reading</p>
        <h2 id="upgrade-articles-title">Articles to help plan your Rails upgrade</h2>
        <div className="rails-card-grid rails-resource-grid">{service.articles.map(item => <article className="rails-card rails-resource-card" key={item.href}>
          <p className="rails-eyebrow">Engineering article</p>
          <div className="rails-situation-heading"><SituationIcon kind={item.icon || 'review'} /><h3>{item.title}</h3></div>
          {item.detail && <p>{item.detail}</p>}
          <Link href={item.href}>Read the engineering article <LinkIndicator /></Link>
        </article>)}</div>
      </div>
    </section>}
    <section className="rails-section rails-tinted" aria-labelledby="related-services-title">
      <div className="inner">
        <p className="rails-eyebrow">Explore the next step</p>
        <h2 id="related-services-title">{service.articles ? 'Related services' : 'Engineering details and related services'}</h2>
        <p className="rails-intro">{service.articles ? 'Explore focused services to carry your upgrade plan forward.' : 'Explore focused services for your application and the technical experience behind our work.'}</p>
        <div className="rails-card-grid rails-resource-grid">{service.reading.map(item => {
          const isArticle = item.href.includes('/blog/');
          return <article className="rails-card rails-resource-card" key={item.href}>
            <p className="rails-eyebrow">{isArticle ? 'Engineering article' : 'Related service'}</p>
            <div className="rails-situation-heading"><SituationIcon kind={item.icon || (isArticle ? 'review' : 'expertise')} /><h3>{item.title}</h3></div>
            {item.detail && <p>{item.detail}</p>}
            <Link href={item.href}>{isArticle ? 'Read the engineering article' : 'Explore the service'} <LinkIndicator /></Link>
          </article>;
        })}</div>
        <div className="rails-actions"><Link href="/services">All WideFix services <LinkIndicator /></Link></div>
      </div>
    </section>
    <section className="rails-section rails-final-cta"><div className="inner"><h2>{service.cta}</h2><p>Tell us about your application, the current problem and your priorities. We will agree on the scope, access needed and a practical first step.</p><div className="rails-actions"><RailsCall>{service.cta}</RailsCall><Link href="/contact">Send your project details <LinkIndicator /></Link></div></div></section>
  </main>;
}

