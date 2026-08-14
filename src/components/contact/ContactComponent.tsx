"use client";

import Image from 'next/image'
import ContactForm from './ContactForm'

export default function ContactComponent() {
  return (
    <>
      <section className="hero has-vertical-paddings" id='contact'>
        <div className="inner">
          <div className="hero-block-left">
            <h1>Ready to <span>transform</span> your business with expert software <span>solutions</span>?</h1>
            <p className="hero-description">
              Get in touch with our team of experienced developers and let&apos;s discuss how we can help you achieve your goals with custom software that delivers real results.
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
              <h2>Get Your <span>Free Project Assessment</span></h2>
              <p>Tell us about your project and we&apos;ll get back to you within 24 hours with a detailed proposal.</p>
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
