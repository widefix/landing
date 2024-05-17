'use client'

import React from 'react';
import Image from 'next/image'
import { useParams } from 'next/navigation';
import categories from '@/showcases';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export default function ShowcasePage() {
  const params = useParams();
  const { slug } = params;

  if (!slug) {
    return <p>Loading...</p>;
  }

  const category = categories.find(category => 
    category.showcases.some(showcase => showcase.slug === slug)
  );

  if (!category) {
    return <p>Showcase not found</p>;
  }

  const showcase = category.showcases.find(showcase => showcase.slug === slug);

  if (!showcase) {
    return <p>Showcase not found</p>;
  }

  return (
    <body className='showcases-case'>
      <Header />
      <section className="case-banner-top">
        <div className="inner">
          <div className="banner-content">
            {showcase.body.bannerTopTitle}
          </div>
          <div className="img-wrapper">
            <Image src={`${showcase.body.bannerTopImageSrc}`} alt="Banner Image" width={687} height={377} />
          </div>
        </div>
      </section>
      <section className="case-description gray">
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
            <Image src="/img/showcases/case/laptop.png" alt="Laptop" width="1156" height="513" />
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
            <Image src="/img/showcases/case/slack.png" alt="Solution" width="549" height="473" />
          </div>
        </div>
      </section>
      <section className="case-results gray" id="results">
        <div className="inner p-vertical">
          <h2 className="results">
            Results
          </h2>
          <div className="results-boxes">
            {showcase.body.resultBoxes}
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
            <SwiperSlide className={`${showcase.body.related.wrapperColor}`}>
              <h4 className='company-name'>{showcase.body.related.companyName}:</h4>
                <h4>{showcase.body.related.solution}</h4>
                <p>{showcase.body.related.results}</p>
                <div>
                  <button type="button" className={`tag ${showcase.body.related.buttonColor}`}>
                    {showcase.body.related.solution}
                  </button>
                </div>
                <div className="slide-footer">
                  <div className="client-img">
                    <a href={showcase.body.related.url} target="_blank"><Image src={showcase.body.related.companyImageSrc} alt="Client" width="104" height="25" /></a>
                  </div>
                  <a href={showcase.body.related.url} target="_blank" className="slide-learn-more">
                    Learn more
                  </a>
                </div>
            </SwiperSlide>
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
      <Footer />
    </body>
  );
};
