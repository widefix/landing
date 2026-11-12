import type { ClutchReferral } from '@/lib/clutchReferral'
import Image from 'next/image'
import ContactForm from './ContactForm'
import ClientTrust from '@/components/rails/ClientTrust'
import ClutchAwards from '@/components/rails/ClutchAwards'
import ClutchWidget from '@/components/ClutchWidget'

export default function ContactComponent({ referral }: { referral?: ClutchReferral }) {
  return (
    <>
      <section className="rails-section rails-hero contact-hero" id="contact">
        <div className="inner contact-hero-grid">
          <div className="contact-hero-copy">
            <p className="rails-eyebrow">{referral ? referral.label : 'Your application, a clear next step'}</p>
            <h1>Let&apos;s talk about your <span>{referral?.focus ?? 'Rails application'}</span></h1>
            <p className="hero-description">
              {referral?.description ?? "Tell us where your application stands today, what needs attention and what you want to build next. We’ll discuss a practical path for handover, maintenance and ongoing development."}
            </p>
            <ClutchAwards />
          </div>
          <div className="contact-form-container" aria-labelledby="contact-form-title">
            <div className="form-header">
              <h2 id="contact-form-title">Tell us about your application</h2>
              <p>{referral ? `Share your goals, current setup and priorities for your ${referral.focus}.` : 'Share your current setup, priorities and any handover concerns.'}</p>
            </div>
            <div className="modern-form"><ContactForm referral={referral} /></div>
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
                <h3>Discuss your Rails application</h3>
                <p>Book a free call to discuss your application and next steps</p>
                <a className="button primary" href="https://calendly.com/andrei-kaleshka/30min" target="_blank" rel="noopener noreferrer nofollow">
                  Discuss your Rails application
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
            <h2 id="contact-reviews-title">Read what our <span>clients</span> have to say</h2>
          </header>
          <div className="slider-wrapper">
            <ClutchWidget />
          </div>
        </div>
      </section>

      <section className="rails-section rails-tinted contact-global-reach" aria-labelledby="global-reach-title">
        <div className="inner">
          <h2 id="global-reach-title">Global Expertise, Local Understanding</h2>
          <p className="rails-intro">
            We work with clients across the globe, bringing world-class software development expertise to businesses in every corner of the world.
          </p>
          <div className="rails-card-grid">
            {[
              ['Americas', 'United States, Canada, Mexico, Brazil, Argentina'],
              ['Europe', 'United Kingdom, Germany, France, Netherlands, Poland'],
              ['Asia Pacific', 'Australia, New Zealand, Singapore, Japan'],
            ].map(([region, countries]) => (
              <div className="rails-card" key={region}>
                <div className="rails-situation-heading">
                  <span className="rails-situation-icon" aria-hidden="true">
                    <svg viewBox="0 0 32 32" width={28} height={28} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" focusable="false">
                      <circle cx="16" cy="16" r="12" />
                      <ellipse cx="16" cy="16" rx="5" ry="12" />
                      <path d="M4 16h24M7 8h18M7 24h18" />
                    </svg>
                  </span>
                  <h3>{region}</h3>
                </div>
                <p>{countries}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  )
}
