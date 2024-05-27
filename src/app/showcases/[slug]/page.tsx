'use client'

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { renderToString } from 'react-dom/server';
import showcases from '@/showcases';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import NotFoundPage from '@/app/not-found';
import Link from 'next/link';
import html2pdf from 'html2pdf.js';
import ContactComponent from '@/components/contact/ContactComponent';

export default function ShowcasePage() {
  const params = useParams();
  const showcase = showcases.find(showcase => showcase.slug === params.slug);

  if (!showcase) {
    return <NotFoundPage />;
  }

  const generatePDF = () => {
    const element = document.getElementById('element-to-pdf');
    if (element) {
      const fixedHeightElements = element.getElementsByClassName('fixed-height');
      const noPrintElements = element.getElementsByClassName('no-print');

      const scaleImagesSize = (scaleFactor: number) => {
        ['what', 'problem', 'solution', 'contact'].forEach(id => {
          const section = document.getElementById(id);
          if (section) {
            const images = section.getElementsByTagName('img');
            Array.from(images).forEach(img => {
              img.dataset.originalWidth = img.width.toString();
              img.dataset.originalHeight = img.height.toString();
              img.width /= scaleFactor;
              img.height /= scaleFactor;
            });
          }
        });
      };
  
      const revertImagesSize = () => {
        ['what', 'problem', 'solution', 'contact'].forEach(id => {
          const section = document.getElementById(id);
          if (section) {
            const images = section.getElementsByTagName('img');
            Array.from(images).forEach(img => {
              if (img.dataset.originalWidth && img.dataset.originalHeight) {
                img.width = parseInt(img.dataset.originalWidth);
                img.height = parseInt(img.dataset.originalHeight);
              }
            });
          }
        });
      };

      const contactComponentHTML = renderToString(<ContactComponent />);
      const contactComponentContainer = document.createElement('div');
      contactComponentContainer.innerHTML = contactComponentHTML;
  
      element.appendChild(contactComponentContainer);

      Array.from(fixedHeightElements).forEach(el => {
        (el as HTMLElement).style.maxHeight = `715px`;
      });

      Array.from(noPrintElements).forEach(el => {
        (el as HTMLElement).style.display = `none`;
      });

      scaleImagesSize(1.5);

      html2pdf().from(element).set({
        filename: `${showcase.slug}.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2 },
        margin: 10,
        jsPDF: { format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: 'avoid-all', before: '.page-break' }
      }).save().then(() => {
        element.removeChild(contactComponentContainer);
        Array.from(fixedHeightElements).forEach(el => {
          (el as HTMLElement).style.maxHeight = ``;
        });

        Array.from(noPrintElements).forEach(el => {
          (el as HTMLElement).style.display = `block`;
        });
        revertImagesSize();
      });
    }
  }

  return (
    <main className="showcases-case">
      <div id="element-to-pdf">
        <section className="case-banner-top fixed-height">
          <div className="inner">
            <div className="banner-content">
              {showcase.body.bannerTopTitle}
            </div>
            <div className="img-wrapper">
              <Image src={`${showcase.body.bannerTopImageSrc}`} alt="Banner Image" width={687} height={377} />
            </div>
          </div>
        </section>
        <section className="no-print case-description gray">
          <div className="inner p-vertical">
            <div className="description">
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
              <div className="button-container">
                <a type="button" className="button primary" onClick={generatePDF} style={{ marginTop: '20px' }}>
                  Download as PDF
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="page-break case-details" id="what">
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
        <section className="page-break case-problem gray fixed-height" id="problem">
          <div className="inner p-vertical">
            <h2 className="problem">Problem</h2>
            {showcase.body.problemText}
            <div className="curvy-image">
              <Image src="/img/showcases/case/laptop.webp" alt="Laptop" width="1156" height="513" />
            </div>
          </div>
        </section>
        <section className="page-break case-solution" id="solution">
          <div className="inner p-vertical">
            <div>
              <h2 className="solution">Solution</h2>
              {showcase.body.solutionFirstText}
              {showcase.body.solutionSecondText}
            </div>
            <div>
              <Image src="/img/showcases/case/slack.png" alt="Solution" width="549" height="473" />
            </div>
          </div>
        </section>
        <section className="page-break case-results gray" id="results">
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
      </div>
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
                <Image src="/img/showcases/case/phone.png" alt="Case" width="396" height="264" />
              </a>
            </div>
            <div>
              <a className="fixed-issue" href="">
                <span className="fixed-issue-title">
                  <span className="fixed-issue-title-h">Database Fix</span>
                  <Image aria-hidden="true" alt="icon" src="/img/showcases/case/icons/link.svg" width="50" height="50" />
                </span>
                <Image src="/img/showcases/case/db.png" alt="Case" width="396" height="264" />
              </a>
            </div>
            <div>
              <a className="fixed-issue" href="">
                <span className="fixed-issue-title">
                  <span className="fixed-issue-title-h">Ruby on Rails Error</span>
                  <Image aria-hidden="true" alt="icon" src="/img/showcases/case/icons/link.svg" width="50" height="50" />
                </span>
                <Image src="/img/showcases/case/html.png" alt="Case" width="396" height="264" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
