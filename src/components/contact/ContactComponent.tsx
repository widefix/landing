"use client";

import Image from 'next/image'
import Script from 'next/script'
import { useEffect } from 'react'

export default function ContactComponent() {
  useEffect(() => {
    // Override Mailchimp's default success message
    const handleFormSubmit = () => {
      const successDiv = document.getElementById('mce-success-response');

      if (successDiv) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
              const successText = successDiv.textContent;
              if (successText && successText.includes('subscrib')) {
                successDiv.innerHTML = '✅ <strong>Thank you!</strong> We\'ve received your project details and will get back to you within 24 hours with a detailed proposal.';
                successDiv.style.display = 'block';
              }
            }
          });
        });

        observer.observe(successDiv, {
          childList: true,
          subtree: true,
          characterData: true
        });

        // Also observe for style changes that make the div visible
        const styleObserver = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
              const target = mutation.target as HTMLElement;
              if (target.style.display !== 'none' && target.textContent) {
                const successText = target.textContent;
                if (successText.includes('subscrib')) {
                  target.innerHTML = '✅ <strong>Thank you!</strong> We\'ve received your project details and will get back to you within 24 hours with a detailed proposal.';
                }
              }
            }
          });
        });

        styleObserver.observe(successDiv, {
          attributes: true,
          attributeFilter: ['style']
        });
      }
    };

    // Wait for Mailchimp script to load
    setTimeout(handleFormSubmit, 1000);
  }, []);
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
              <div id="mc_embed_signup" className="modern-form">
                <form
                  action="https://widefix.us4.list-manage.com/subscribe/post?u=1313d5f2c680ff5f21b500895&amp;id=565f623090&amp;f_id=00b440e8f0"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="validate contact-form"
                  target="_blank"
                >
                  <div className="form-grid">
                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="mce-EMAIL" className="form-label">
                          Email Address <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          name="EMAIL"
                          className="form-input required email"
                          id="mce-EMAIL"
                          required
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="mce-FNAME" className="form-label">First Name</label>
                        <input
                          type="text"
                          name="FNAME"
                          className="form-input"
                          id="mce-FNAME"
                          placeholder="John"
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="mce-LNAME" className="form-label">Last Name</label>
                        <input
                          type="text"
                          name="LNAME"
                          className="form-input"
                          id="mce-LNAME"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field full-width">
                        <label htmlFor="mce-MMERGE7" className="form-label">Project Details</label>
                        <textarea
                          name="MMERGE7"
                          className="form-textarea"
                          id="mce-MMERGE7"
                          rows={4}
                          placeholder="Tell us about your project, current challenges, and what you're looking to achieve..."
                        ></textarea>
                      </div>
                    </div>

                    <div id="mce-responses" className="form-responses">
                      <div className="response error-response" id="mce-error-response"></div>
                      <div className="response success-response" id="mce-success-response"></div>
                    </div>

                    <div aria-hidden="true" className="hidden-field">
                      <input
                        type="text"
                        name="b_1313d5f2c680ff5f21b500895_565f623090"
                        tabIndex={-1}
                      />
                    </div>

                    <div className="form-submit">
                      <button
                        type="submit"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        className="button primary"
                        style={{ textDecoration: 'none' }}
                      >
                        Send Project Details
                      </button>
                      <p className="form-note">
                        We&apos;ll respond within 24 hours with a detailed project proposal
                      </p>
                    </div>
                  </div>
                </form>
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

      <Script
        src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
        strategy="lazyOnload"
      />
      <Script id="mailchimp-config" strategy="lazyOnload">
        {`
          (function($) {
            window.fnames = new Array();
            window.ftypes = new Array();
            fnames[0]='EMAIL';ftypes[0]='email';
            fnames[1]='FNAME';ftypes[1]='text';
            fnames[2]='LNAME';ftypes[2]='text';
            fnames[7]='MMERGE7';ftypes[7]='text';
          }(jQuery));
          var $mcj = jQuery.noConflict(true);
        `}
      </Script>
    </>
  )
}
