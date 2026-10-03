"use client";

import Image from 'next/image'
import ContactForm from './ContactForm'

export default function ContactComponent() {
  return (
    <>
      <section className="hero has-vertical-paddings" id='contact'>
        <div className="inner">
          <div className="hero-block-left">
            <h1>Let&apos;s talk about your <span>Rails application</span></h1>
            <p className="hero-description">
              Tell us where your application stands today, what needs attention and what you want to build next. We&apos;ll discuss a practical path for handover, maintenance and ongoing development.
            </p>
            <div className="contact-options">
              <div className="contact-option">
                <div className="contact-icon">
                  <Image src="/img/icons/support.svg" alt="Schedule" width="24" height="24" />
                </div>
                <div className="contact-info">
                  <h3>Schedule a Consultation</h3>
                  <p>Book a free call to discuss your project</p>
                  <a className="button primary" href="https://calendly.com/andrei-kaleshka/30min" target="_blank" rel="nofollow">
                    Schedule Now
                  </a>
                </div>
              </div>
              <div className="contact-option">
                <div className="contact-icon">
                  <Image src="/img/icons/email.svg" alt="Email" width="24" height="24" />
                </div>
                <div className="contact-info">
                  <h3>Send us an Email</h3>
                  <p>Reach out directly for detailed inquiries</p>
                  <a href="mailto:call@widefix.com" className="button secondary">
                    call@widefix.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-block-right bordered">
            <picture>
              <source srcSet="/img/contact.webp" type="image/webp" />
              <Image
                src="/img/contact.jpg"
                quality={100}
                alt="Contact WideFix for software solutions"
                width="543"
                height="474"
              />
            </picture>
          </div>
        </div>
      </section>

      <section className="contact-form-section has-vertical-paddings">
        <div className="inner">
          <div className="contact-form-wrapper">
            <div className="form-header">
              <h2>Tell us about your <span>application</span></h2>
              <p>Share your current setup, priorities and any handover concerns so we can discuss the right next step.</p>
            </div>

            <div className="contact-form-container">
              <div className="modern-form">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="global-reach has-vertical-paddings">
        <div className="inner">
          <div className="global-content">
            <div className="global-text">
              <h2>Global <span>Expertise</span>, Local <span>Understanding</span></h2>
              <p>
                We work with clients across the globe, bringing world-class software development expertise to businesses in every corner of the world.
              </p>
              <div className="regions-list">
                <div className="region-group">
                  <h4>Americas</h4>
                  <p>United States, Canada, Mexico, Brazil, Argentina</p>
                </div>
                <div className="region-group">
                  <h4>Europe</h4>
                  <p>United Kingdom, Germany, France, Netherlands, Poland</p>
                </div>
                <div className="region-group">
                  <h4>Asia Pacific</h4>
                  <p>Australia, New Zealand, Singapore, Japan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}
