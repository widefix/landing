'use client'

import ShowcaseItems from '@/components/showcases/ShowcaseItems'
import Image from 'next/image'
import categories from '@/categories.tsx';

export default function ShowcasesPage() {
  const activeCategories = categories.filter(category => category.active);

  return (
    <main className='showcases'>
      <section className="showcases-paddings">
        <div className="inner portfolio-inner">
          <div className="portfolio">
            <div className="portfolio-copy">
              <p className="portfolio-eyebrow">Selected work</p>
              <h1>Software built for the work that matters.</h1>
              <p className="portfolio-description">
                We partner with ambitious teams to improve established products, connect critical systems, and deliver software built to last.
              </p>
              <div className="portfolio-actions">
                <a className="portfolio-primary-link" href="#case-studies">Explore case studies</a>
                <a className="portfolio-secondary-link" href="mailto:call@widefix.com">Talk to our team</a>
              </div>
            </div>

            <figure className="portfolio-media">
              <Image
                src="/img/showcases/video.webp"
                alt="WideFix developer introducing JavaScript and Ruby on Rails"
                width={480}
                height={281}
                sizes="(max-width: 768px) 100vw, 560px"
                priority
              />
              <figcaption>
                <strong>WideFix</strong>
                <span>Product engineering, since 2009</span>
              </figcaption>
            </figure>
          </div>

        </div>
      </section>

      <section className="banner-top showcases-banner">
        <div className="inner">
          <h2><span className="green-path">15+ years</span> of software development experience</h2>

          <div className="showcase-banner-clients">
            <span className="showcase-banner-clients-img">
              <Image src="/img/showcases/clients/toptal.svg" alt="Toptal" width="125" height="34" />
            </span>
            <span className="showcase-banner-clients-img">
              <Image src="/img/showcases/clients/hubstaff.svg" alt="Hubstaff" width="150" height="33" />
            </span>
            <span className="showcase-banner-clients-img">
              <Image src="/img/showcases/clients/palladium.svg" alt="Palladium" width="202" height="25" />
            </span>
            <span className="showcase-banner-clients-img">
              <Image src="/img/showcases/clients/kajabi.svg" alt="Kajabi" width="181" height="21" />
            </span>
            <span className="showcase-banner-clients-img" style={{ background: 'black' }}>
              <Image src="/img/showcases/clients/wo.svg" alt="WorshipOnline" width="138" height="24" />
            </span>
            <span className="showcase-banner-clients-img">
              <Image src="/img/showcases/clients/shopwired.svg" alt="Shopwired" width="150" height="45" />
            </span>
          </div>
        </div>
      </section>

      <section className="case-studies">
        <div className="inner" id="case-studies">
          <h2 className="h2">Case Studies</h2>
          {activeCategories.map((category, index) => (
            <ShowcaseItems
              key={index}
              name={category.name}
              title={category.title}
              imageSrc={category.imageSrc}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
