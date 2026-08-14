"use client"

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [result, setResult] = useState<string>("");
  const [resultType, setResultType] = useState<'success' | 'error' | ''>('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResultType('');
    setResult('Sending....');
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    formData.append('access_key', 'be29e86f-12e7-464f-95d1-f434fe2f2d74');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setResultType('success');
        setResult('✅ Thank you! We\'ve received your project details and will get back to you within 24 hours.');
        form.reset();
      } else {
        setResultType('error');
        setResult('An error occurred. Please try again later.');
      }
    } catch (err) {
      setResultType('error');
      setResult('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={onSubmit} className="contact-form">
      <div className="form-grid">
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="email" className="form-label">Email Address <span className="required">*</span></label>
            <input id="email" type="email" name="email" required className="form-input required email" placeholder="your.email@company.com" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input id="firstName" type="text" name="firstName" className="form-input" placeholder="John" />
          </div>
          <div className="form-field">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input id="lastName" type="text" name="lastName" className="form-input" placeholder="Doe" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field full-width">
            <label htmlFor="message" className="form-label">Project Details</label>
            <textarea id="message" name="message" className="form-textarea" rows={4} placeholder="Tell us about your project, current challenges, and what you're looking to achieve..."></textarea>
          </div>
        </div>

        <div className="form-responses">
          <div className="response error-response" style={{ display: resultType === 'error' ? 'block' : 'none' }}>{resultType === 'error' ? result : ''}</div>
          <div className="response success-response" style={{ display: resultType === 'success' ? 'block' : 'none' }}>{resultType === 'success' ? result : ''}</div>
        </div>

        <div aria-hidden="true" className="hidden-field">
          <input type="text" name="honeypot" tabIndex={-1} />
        </div>

        <div className="form-submit">
          <button type="submit" className="button primary">Send Project Details</button>
          <p className="form-note">We&apos;ll respond within 24 hours with a detailed project proposal</p>
        </div>
      </div>
    </form>
  );
}
