'use client'

import ShowcaseItems from '@/components/showcases/ShowcaseItems'
import { useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import { metadata } from './metadata'
import Showcases from '@/showcases.tsx';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

export default function ShowcasesPage() {
  const showcases = Showcases

  useEffect(() => {
    const accordionButtons = document.querySelectorAll('.accordion-action');
  
    const handleClick = (event: any) => {
      const button = event.currentTarget as HTMLButtonElement;
      const accordion = button.closest('.accordion');
      if (accordion) {
        accordion.classList.toggle('expanded');
        const isExpanded = accordion.classList.contains('expanded');
        button.setAttribute('aria-expanded', isExpanded.toString());
      }
    };
  
    accordionButtons.forEach((button) => {
      button.addEventListener('click', handleClick);
    });
  
    return () => {
      accordionButtons.forEach((button) => {
        button.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <body className='showcases'>
      <Header />
      <section className="showcases-paddings">
        <div className="inner portfolio-inner">
          <div className="portfolio">
            <div className="we-are-widefix">
              <div>
                <Image src="/img/showcases/widefix.svg" alt="We are widefix" width="408" height="406" />
                <p>
                  <span>We are</span>
                </p>
                <p><strong>Widefix</strong></p>
                <p>
                  <a href="mailto:">
                    call@widefix.com
                    <Image src="/img/showcases/email.svg" alt="Email" width="18" height="14" />
                  </a>
                </p>
              </div>
            </div>

            <div className="portfilio-items">
              <h1>Portfolio</h1>
              <div className="portfolio-projects-video">
                <div>
                    <Image alt="Video" src="/img/showcases/video.png" width="480" height="281"  />
                </div>
                <div>
                  <div className="portfolio-projects-projects">
                    <strong>100+</strong>
                    <p>Projects</p>
                  </div>
                  <div className="portfolio-projects-services">
                    <strong>20+</strong>
                    <p>Services</p>
                  </div>
                </div>
              </div>
              <div className="portfolio-clients">
                <div className="clients-swiper-wrapper">
                  <div className="clients-swiper swiper">
                    <Swiper
                      modules={[Pagination]}
                      slidesPerView={1}
                      loop={true}
                      pagination={{ clickable: true, el: '.swiper-pagination' }}
                      autoplay={true}
                      className={'clients-swiper'}
                    >
                      <SwiperSlide>
                        <Image src="/img/showcases/clients/toptal.svg" alt="Toptal" width="125" height="34" />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image src="/img/showcases/clients/hubstaff.svg" alt="Hubstaff" width="150" height="33" />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image src="/img/showcases/clients/activeplatform.svg" alt="ActivePlatform" width="202" height="25" />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image src="/img/showcases/clients/palladium.svg" alt="Palladium" width="181" height="21" />
                      </SwiperSlide>
                      <SwiperSlide style={{background: "black"}}>
                        <Image src="/img/showcases/clients/wo.svg" alt="WorshipOnline" width="230" height="35" />
                      </SwiperSlide >
                      <SwiperSlide>
                        <Image src="/img/showcases/clients/kajabi.svg" alt="Kajabi" width="138" height="24" />
                      </SwiperSlide>
                      <div className="portfolio-clients-title">Clients</div>
                      <div className="swiper-pagination"></div>
                    </Swiper>
                  </div>
                </div>

                <div className="portfolio-developers">
                  <div className="portfolio-developers-img">
                    <Image alt="Developers" src="/img/showcases/developers.svg" width="75" height="73" />
                  </div>
                  <div className="portfolio-developers-n">
                    <strong>15+</strong>
                    <p>years of experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="banner-top showcases-banner">
        <div className="inner">
          <h2>We have worked in as developer team for <span className="green-path">15+ Years</span></h2>

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
          </div>
        </div>
      </section>

      <section className="case-studies">
        <div className="inner">
          <h2 className="h2">Case Studies</h2>
          {showcases.map(category => (
            <ShowcaseItems
              key={category.id}
              title={category.title}
              imageSrc={category.imageSrc}
              showcases={category.showcases}
            />
          ))}
        </div>
      </section>
      <Footer />
    </body>
  )
}
