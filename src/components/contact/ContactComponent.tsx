import Image from 'next/image'
import ContactForm from './ContactForm'
import ClientTrust from '@/components/rails/ClientTrust'
import ClutchAwards from '@/components/rails/ClutchAwards'
import ClutchWidget from '@/components/ClutchWidget'

export default function ContactComponent() {
  return (
    <>
      <section className="rails-section rails-hero contact-hero" id="contact">
        <div className="inner contact-hero-grid">
          <div className="contact-hero-copy">
            <p className="rails-eyebrow">Your application. A clear next step.</p>
            <h1>Let&apos;s talk about your <span>Rails application</span></h1>
            <p className="hero-description">
              Tell us where your application stands today, what needs attention and what you want to build next. We&apos;ll discuss a practical path for handover, maintenance and ongoing development.
            </p>
            <ClutchAwards />
          </div>
          <div className="contact-form-container" aria-labelledby="contact-form-title">
            <div className="form-header">
              <h2 id="contact-form-title">Tell us about your application</h2>
              <p>Share your current setup, priorities and any handover concerns.</p>
            </div>
            <div className="modern-form"><ContactForm /></div>
          </div>
        </div>
      </section>

      <ClientTrust />

      <section className="contact-options-section has-vertical-paddings">
        <div className="inner">
          <div className="contact-options">
            <div className="contact-option">
              <div className="contact-icon">
                <Image src="/img/icons/support.svg" alt="Schedule" width="24" height="24" />
              </div>
              <div className="contact-info">
                <h3>Schedule a Consultation</h3>
                <p>Book a free call to discuss your project</p>
                <a className="button primary" href="https://calendly.com/andrei-kaleshka/30min" target="_blank" rel="noopener noreferrer nofollow">
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
      </section>

      <section className="reviews has-vertical-paddings" aria-labelledby="contact-reviews-title">
        <div className="inner">
          <header>
            <h2 id="contact-reviews-title">Read what our <span>clients</span> have to say.</h2>
          </header>
          <div className="slider-wrapper">
            <ClutchWidget />
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
