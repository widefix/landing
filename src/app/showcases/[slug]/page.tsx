'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { renderToString } from 'react-dom/server';
import showcases from '@/showcases';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import NotFoundPage from '@/app/not-found';
import Link from 'next/link';
import ShowcaseToPDF from '@/components/showcases/ShowcaseToPDF';

export default function ShowcasePage() {
  const params = useParams();
  const showcase = showcases.find(showcase => showcase.slug === params.slug);
  const [isLoading, setIsLoading] = useState(false);

  if (!showcase) {
    return <NotFoundPage />;
  }

  const generatePDF = () => {
    setIsLoading(true);
    import('html2pdf.js').then(module => {
      const html2pdf = module.default;
      const element = document.createElement('div');
      const elementString = renderToString(<ShowcaseToPDF {...showcase.body} />);
      element.innerHTML = elementString;

      html2pdf()
      .set({
        filename: `${showcase.slug}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
          scale: 2,
          dpi: 300,
          letterRendering: true,
          useCORS: true,
        },
        margin: 10,
        jsPDF: {
          unit: 'mm',
          format: [230, 326],
          orientation: 'landscape',
          userUnit: 2,
          precision: 32
        },
        pagebreak: { mode: 'avoid-all', before: '.page-break' }
      })
      .from(element)
      .save()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    });
  };

  return (
    <main className="showcases-case">
      <section className="case-banner-top">
        <div className="inner">
          <div className="banner-content">
            {showcase.body.bannerTopTitle}
          </div>
          <div className="img-wrapper">
            <picture>
              <source srcSet={showcase.body.bannerTopImageWebpSrc} type="image/webp" />
              <Image
                src={`${showcase.body.bannerTopImageSrc}`}
                priority
                alt="Banner Image"
                quality={100}
                width={687}
                height={377}
              />
            </picture>
          </div>
        </div>
      </section>
      <section className="case-description gray">
        <div className="inner p-vertical">
          <div className="description">
            <a type="button" onClick={generatePDF} className='download-pdf-button'>
              {isLoading ? (
                <Image src="../img/icons/loader.svg" alt="Loading..." width="64" height="64" className='spinner' />
              ) : (
                <Image src="../img/icons/download-pdf.svg" alt="Download as PDF" width="64" height="64" />
              )}
            </a>
            <h2>{showcase.body.description}</h2>
            {showcase.body.descriptionText}
          </div>
          <div className="menu">
            <ul>
              <li><a className="active" href="#what">{showcase.body.detailsTitle}</a></li>
              <li><a href="#problem">Problem</a></li>
              <li><a href="#solution">Solution</a></li>
              <li><a href="#results">Results</a></li>
              <li><a href="#help">Help</a></li>
              <li><a href="#other">Other Issues</a></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="case-details" id="what">
        <div className="inner p-vertical">
          <div className="case-details-title">
            <h2 className="with-crown">
              {showcase.body.detailsTitle}
            </h2>
            {showcase.body.detailsText}
          </div>
          <div>
            <Image src={`${showcase.body.detailsImageSrc}`} alt="Puzzle" width="670" height="325"/>
          </div>
        </div>
      </section>
      <section className="case-problem gray" id="problem">
        <div className="inner p-vertical">
          <h2 className="problem">Problem</h2>
          {showcase.body.problemText}
          <div className="curvy-image">
            <picture>
              <source srcSet="/img/showcases/case/laptop.webp" type="image/webp" />
              <Image
                src="/img/showcases/case/laptop.png"
                priority
                alt="Laptop"
                quality={100}
                width="1156"
                height="513"
              />
            </picture>
          </div>
        </div>
      </section>
      <section className="case-solution" id="solution">
        <div className="inner p-vertical">
          <div>
            <h2 className="solution">Solution</h2>
            {showcase.body.solutionFirstText}
            {showcase.body.solutionSecondText}
          </div>
          <div>
            <picture>
              <source srcSet="/img/showcases/case/slack.webp" type="image/webp" />
              <Image src="/img/showcases/case/slack.png" alt="Solution" width="549" height="473" />
            </picture>
          </div>
        </div>
      </section>
      <section className="case-results gray" id="results">
        <div className="inner p-vertical">
          <h2 className="results">
            Results
          </h2>
          <div className="results-boxes">
            {showcase.body.resultBoxes.map((box, index) => (
              <div className={`result-box ${box.color}`} key={index}>
                <Image src={box.imageSrc} alt="icon" aria-hidden="true" width="35" height="35" />
                <div className="result-message"><strong>{box.message}</strong></div>
                <div className="result-number">{box.number}</div>
              </div>
            ))}
          </div>
          {showcase.body.resultText}
        </div>
      </section>
      <section className="case-need-help" id="help">
        <div className="inner p-vertical wrapper">
          <h2>
            {showcase.body.helpTitle}
          </h2>
          <div className="button-container">
            <a type="button" className="button primary" href="https://calendly.com/andrei-kaleshka/30min" target="_blank"
              rel="nofollow">
              Get a free consultation
            </a>
          </div>
        </div>
      </section>
      <section className="case-related">
        <div className="inner p-vertical">
          <h2 className="h2-stripe">Related Articles</h2>
          <Swiper
            modules={[Navigation]}
            spaceBetween={39}
            slidesPerView={'auto'}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            className={'case-swiper'}
          >
            {showcase.body.related.map((showcase, index) => (
              <SwiperSlide key={index} className={`${showcase.wrapperColor}`}>
                <h3 className='company-name'>{showcase.companyName}:</h3>
                <h3>{showcase.solution}</h3>
                <p>{showcase.results}</p>
                <div>
                  <button type="button" className={`tag ${showcase.buttonColor}`}>
                    {showcase.solution}
                  </button>
                </div>
                <div className="slide-footer">
                  <div className="client-img">
                    <Link href={showcase.url} target="_blank">
                      <Image src={showcase.companyImageSrc} alt="Client" width="104" height="25" />
                    </Link>
                  </div>
                  <Link href={showcase.url} target="_blank" className="slide-learn-more">
                    More about
                  </Link>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-prev-next">
              <button type="button" className="swiper-button-prev" aria-label="Previous slide" />
              <button type="button" className="swiper-button-next" aria-label="Next slide" />
            </div>
          </Swiper>
        </div>
      </section>
      <section className="case-other-issues" id="other">
        <div className="inner p-vertical">
          <div className="fixed-issues">
            <div>
              <h2>Other issues fixed</h2>

              <a className="fixed-issue" href="">
                <span className="fixed-issue-title">
                  <span className="fixed-issue-title-h">Stripe Integration</span>
                  <Image aria-hidden="true" alt="icon" src="/img/showcases/case/icons/link.svg" width="50" height="50" />
                </span>
                <picture>
                  <source srcSet="/img/showcases/case/phone.webp" type="image/webp" />
                  <Image src="/img/showcases/case/phone.png" alt="Case" width="396" height="264" />
                </picture>
              </a>
            </div>
            <div>
              <a className="fixed-issue" href="">
                <span className="fixed-issue-title">
                  <span className="fixed-issue-title-h">Database Fix</span>
                  <Image aria-hidden="true" alt="icon" src="/img/showcases/case/icons/link.svg" width="50" height="50" />
                </span>
                <picture>
                  <source srcSet="/img/showcases/case/db.webp" type="image/webp" />
                  <Image src="/img/showcases/case/db.png" alt="Case" width="396" height="264" />
                </picture>
              </a>
            </div>
            <div>
              <a className="fixed-issue" href="">
                <span className="fixed-issue-title">
                  <span className="fixed-issue-title-h">Ruby on Rails Error</span>
                  <Image aria-hidden="true" alt="icon" src="/img/showcases/case/icons/link.svg" width="50" height="50" />
                </span>
                <picture>
                  <source srcSet="/img/showcases/case/html.webp" type="image/webp" />
                  <Image src="/img/showcases/case/html.png" alt="Case" width="396" height="264" />
                </picture>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
