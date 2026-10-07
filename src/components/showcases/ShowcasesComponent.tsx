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
              <h1>Software built for the work that matters</h1>
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
                src="/img/showcases/technology-cloud.svg"
                alt="Technology cloud connecting Ruby, Rails, PostgreSQL, React Native, Next.js, React, AWS, GraphQL, Stripe and C"
                width={800}
                height={640}
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

      <section className="showcases-experience">
        <div className="inner">
          <h2><span className="showcases-experience-number">15+ years</span><span>of software development experience</span></h2>
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
