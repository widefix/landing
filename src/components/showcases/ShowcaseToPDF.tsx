import React from 'react';
import Image from 'next/image';
import { ShowcaseBody } from '@/showcases';
import Link from 'next/link';

export default function ShowcaseToPDF({
  bannerTopTitle,
  bannerTopImageSrc,
  bannerTopImageWebpSrc,
  detailsTitle,
  detailsText,
  detailsImageSrc,
  problemText,
  solutionFirstText,
  solutionSecondText,
  resultBoxes,
  resultText,
 } : Partial<ShowcaseBody>) {
  return (
    <main className="showcases-case">
      <section className="case-banner-top" style={{maxHeight: "770px"}}>
        <div className="inner">
          <div className="banner-content">
            {bannerTopTitle}
          </div>
          <div className="img-wrapper">
            <picture>
              { bannerTopImageWebpSrc &&
                <source srcSet={bannerTopImageWebpSrc} type="image/webp" />
              }
              <Image
                src={`${bannerTopImageSrc}`}
                alt="Banner Image"
                quality={100}
                width={687}
                height={377}
              />
            </picture>
            <Image src={`${bannerTopImageSrc}`} alt="Banner Image" width={687} height={377} />
          </div>
        </div>
      </section>
      <section className="page-break case-details">
        <div className="inner" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: "40px"}}>
          <div className="case-details-title">
            <h2 className="with-crown">
              {detailsTitle}
            </h2>
            {detailsText}
          </div>
          <div style={{marginTop: '10%'}}>
            <Image src={`${detailsImageSrc}`} alt="Puzzle" width="670" height="325"/>
          </div>
        </div>
      </section>
      <section className="page-break case-problem">
        <div className="inner" style={{paddingTop: "40px"}}>
          <h2 className="problem">Problem</h2>
          {problemText}
          <div className="curvy-image">
            <picture>
              <source srcSet="/img/showcases/case/laptop.webp" type="image/webp" />
              <Image
                src="/img/showcases/case/laptop.png"
                alt="Laptop"
                quality={100}
                width="1156"
                height="513"
              />
            </picture>
          </div>
        </div>
      </section>
      <section className="page-break case-solution">
        <div className="inner" style={{paddingTop: "40px"}}>
          <div>
            <h2 className="solution">Solution</h2>
            <div style={{fontSize: "28px"}}>
              {solutionFirstText}
              {solutionSecondText}
            </div>
          </div>
          <div>
            <picture>
              <source srcSet="/img/showcases/case/slack.webp" type="image/webp" />
              <Image src="/img/showcases/case/slack.png" alt="Solution" width="549" height="473" />
            </picture>
          </div>
        </div>
      </section>
      <section className="page-break case-results">
        <div className="inner" style={{paddingTop: "40px"}}>
          <h2 className="results" style={{marginLeft: "30px"}}>
            Results
          </h2>
          <div className="results-boxes">
            {resultBoxes && resultBoxes.map((box, index) => (
              <div className={`result-box ${box.color}`} key={index}>
                <Image src={box.imageSrc} alt="icon" aria-hidden="true" width="35" height="35" />
                <div className="result-message"><strong>{box.message}</strong></div>
                <div className="result-number">{box.number}</div>
              </div>
            ))}
          </div>
          {resultText}
        </div>
      </section>
      <section className="page-break hero has-vertical-paddings">
        <div className="inner">
          <div className="hero-block-left">
            <h1>Contact us for <span>cost-effective</span> tech solutions for <span>your</span> business challenges</h1>
          </div>
          <div className="hero-block-right">
            <picture>
              <source srcSet="/img/contact.webp" type="image/webp" />
              <Image
                src="/img/contact.jpg"
                alt="Optimise your app to get more customers"
                quality={100}
                width="434"
                height="379"
              />
            </picture>
          </div>
        </div>
      </section>
      <section className="banner-bottom has-vertical-paddings" style={{marginTop: "40px"}}>
        <div className="inner">
          <h2></h2>
          <p style={{fontSize: "22px"}}>Optimise your app and get underlying issues fixed. You deserve an app customers will love to use.<br />If you
            would like to discuss your needs further, you can schedule a consultation with one of our experts</p>
          <div className="contacts">
            <div className="contact">
              <Image src="/img/icons/email.svg" alt="Icon for email" width="40" height="40" />
              <p style={{fontSize: "28px"}}>Email: <Link href="mailto:call@widefix.com">call@widefix.com</Link></p>
            </div>
            <div className="contact">
              <Image src="/img/icons/phone.svg" alt="Icon for phone" width="40" height="40" />
              <p style={{fontSize: "28px"}}>Phone: <Link href="tel:+48516295359">+48516295359</Link></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
