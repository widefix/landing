import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - WideFix",
  description: "Whether you're looking to create a website, develop a mobile app, or build a custom software solution, we've got you covered.",
  alternates: {
    canonical: "https://widefix.com/services"
  },
  openGraph: {
    title: "Services - WideFix",
    description: "Whether you're looking to create a website, develop a mobile app, or build a custom software solution, we've got you covered.",
    url: "https://widefix.com/services",
    siteName: "WideFix",
    images: [
      {
        url: "https://raw.githubusercontent.com/widefix/widefix/main/img/block-hero.jpg",
        width: 1440,
        height: 786,
      }
    ],
    locale: "en_US",
    type: "website"
  }
};

export default function ServicesPage() {
  return (
    <main>
      <section className="hero has-vertical-paddings">
        <div className="inner">
          <div className="hero-block-left">
            <h1>We develop <span>custom</span> software that meets your business needs while <span>minimizing</span> costs</h1>
            <p className="hero-description">
              Transform your business with tailored software solutions built by experts who understand your challenges and deliver results that matter.
            </p>
            <div className="button-container">
              <Link className="button primary" href="https://calendly.com/andrei-kaleshka/30min" target="_blank"
                rel="nofollow">Get Your Free Consultation</Link>
              <Link className="button secondary" href="#our-services">Explore Our Services</Link>
            </div>
          </div>
          <div className="hero-block-right">
            <picture>
              <source srcSet="/img/services.webp" type="image/webp" />
              <Image
                src="/img/services.jpg"
                quality={100}
                alt="Custom software development services"
                width="543"
                height="474"
                style={{ borderRadius: '10px', objectFit: 'cover' }}
              />
            </picture>
          </div>
        </div>
      </section>

      <section className="our-services has-vertical-paddings" id="our-services">
        <div className="inner">
          <header>
            <h2>Our <span>Services</span></h2>
            <p>Comprehensive software development solutions tailored to your business needs</p>
          </header>

          <div className="services-grid">
            <div className="service-card featured">
              <div className="service-icon">
                <Image src="/img/productboard-icon.svg" alt="MVP Development" width="48" height="48" />
              </div>
              <h3>MVP Development</h3>
              <p>Launch your idea quickly with a minimum viable product that validates your concept and attracts early users.</p>
              <ul>
                <li>✓ Rapid prototyping</li>
                <li>✓ User validation</li>
                <li>✓ Scalable architecture</li>
                <li>✓ Market-ready solution</li>
              </ul>
              <div className="service-cta">
                <Link href="https://calendly.com/andrei-kaleshka/30min" target="_blank" className="button primary">
                  Start Your MVP
                </Link>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Image src="/img/web-dev-icon.svg" alt="Web Development" width="48" height="48" />
              </div>
              <h3>Web Application Development</h3>
              <p>Modern, responsive web applications built with cutting-edge technologies for optimal performance.</p>
              <ul>
                <li>✓ React & Next.js frontend</li>
                <li>✓ Ruby on Rails backend</li>
                <li>✓ PostgreSQL database</li>
                <li>✓ Cloud deployment</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Image src="/img/mobile-phone.svg" alt="Mobile Development" width="48" height="48" />
              </div>
              <h3>Mobile App Development</h3>
              <p>Native and cross-platform mobile applications that deliver exceptional user experiences.</p>
              <ul>
                <li>✓ React Native</li>
                <li>✓ iOS (Swift)</li>
                <li>✓ Android (Kotlin)</li>
                <li>✓ Cross-platform solutions</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Image src="/img/system.svg" alt="Legacy Modernization" width="48" height="48" />
              </div>
              <h3>Legacy System Modernization</h3>
              <p>Breathe new life into your existing applications with modern technologies and improved performance.</p>
              <ul>
                <li>✓ Code refactoring</li>
                <li>✓ Technology upgrades</li>
                <li>✓ Performance optimization</li>
                <li>✓ Security enhancements</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Image src="/img/customer-support.svg" alt="Technical Consulting" width="48" height="48" />
              </div>
              <h3>Technical Consulting</h3>
              <p>Expert guidance to help you make informed technology decisions that align with your business goals.</p>
              <ul>
                <li>✓ Architecture design</li>
                <li>✓ Technology selection</li>
                <li>✓ Performance audits</li>
                <li>✓ Strategic planning</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Image src="/img/services.svg" alt="Maintenance & Support" width="48" height="48" />
              </div>
              <h3>Maintenance & Support</h3>
              <p>Ongoing support and maintenance to keep your applications running smoothly and securely.</p>
              <ul>
                <li>✓ 24/7 monitoring</li>
                <li>✓ Regular updates</li>
                <li>✓ Bug fixes</li>
                <li>✓ Performance monitoring</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Image src="/img/receipt-28.svg" alt="Accounting Systems Integration" width="48" height="48" />
              </div>
              <h3>Accounting Systems Integration</h3>
              <p>Seamlessly connect your applications with popular accounting platforms for automated financial workflows.</p>
              <ul>
                <li>✓ Xero</li>
                <li>✓ Sage Accounting</li>
                <li>✓ Kashflow</li>
                <li>✓ Clearbooks</li>
                <li>✓ QuickBooks</li>
                <li>✓ Custom accounting APIs</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Image src="/img/credit-card.svg" alt="Payment Systems Integration" width="48" height="48" />
              </div>
              <h3>Payment Systems Integration</h3>
              <p>Implement secure and reliable payment processing with industry-leading payment providers and custom solutions.</p>
              <ul>
                <li>✓ Stripe integration</li>
                <li>✓ PayPal connectivity</li>
                <li>✓ Proprietary payment systems</li>
                <li>✓ PCI compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="showcase has-vertical-paddings">
        <div className="inner">
          <div className="showcase-content">
            <div className="showcase-text">
              <h2>See Our Work in <span>Action</span></h2>
              <p>
                Actions speak louder than words. That&apos;s why we&apos;ve built our own product to showcase our capabilities and commitment to quality.
              </p>
              <div className="product-highlight">
                <h3>
                  <Image src="/img/icons/star.svg" alt="Featured" width="24" height="24" />
                  Meet BudgetingKid
                </h3>
                <p>
                  A complete financial education app we built from scratch — available on both web and mobile platforms.
                  It&apos;s not just our portfolio piece, it&apos;s a fully functional product that real families use every day.
                </p>
                <div className="product-links">
                  <Link href="https://get.budgetingkid.com/" target="_blank" className="button primary">
                    Try the App <Image src="/img/mobile-phone-btn.svg" alt="External" width="16" height="16" />
                  </Link>
                  <Link href="https://github.com/widefix/pocketmoney/" target="_blank" className="button secondary">
                    View Source Code <Image src="/img/icons/github.svg" alt="GitHub" width="16" height="16" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="showcase-image">
              <picture>
                <source srcSet="/img/try-app.webp" type="image/webp" />
                <Image
                  src="/img/try-app.jpg"
                  alt="BudgetingKid app showcase"
                  width="400"
                  height="300"
                  className="rounded-image"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-us has-vertical-paddings">
        <div className="inner">
          <div className="content-wrapper">
            <div className="left-content">
              <h2>Why Choose <span>WideFix</span>?</h2>
              <div className="value-props">
                <div className="value-prop">
                  <div className="value-icon">
                    <Image src="/img/globe-24.svg" alt="Global Reach" width="32" height="32" />
                  </div>
                  <div className="value-content">
                    <h3>Global Expertise</h3>
                    <p>Serving clients across the US, Europe, Americas, UK, Australia, and beyond with world-class solutions.</p>
                  </div>
                </div>
                <div className="value-prop">
                  <div className="value-icon">
                    <Image src="/img/effector.svg" alt="Cost Effective" width="32" height="32" />
                  </div>
                  <div className="value-content">
                    <h3>Cost-Effective Solutions</h3>
                    <p>We believe quality software should be accessible. Get premium solutions at reasonable prices.</p>
                  </div>
                </div>
                <div className="value-prop">
                  <div className="value-icon">
                    <Image src="/img/trust.svg" alt="True Partnership" width="32" height="32" />
                  </div>
                  <div className="value-content">
                    <h3>True Partnership</h3>
                    <p>We work closely with you to understand your needs and deliver solutions that perfectly match them.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="founder-highlight">
                <picture>
                  <source srcSet="/img/andrei-kaleshka.webp" type="image/webp" />
                  <Image
                    src="/img/andrei-kaleshka.png"
                    alt="Andrei Kaleshka, Founder of WideFix"
                    width="200"
                    height="200"
                    className="founder-image"
                  />
                </picture>
                <div className="founder-info">
                  <h3>Led by Experience</h3>
                  <p>
                    <strong>Andrei Kaleshka</strong>, the <b>WideFix</b> founder, brings years of expertise in building scalable
                    software solutions. His vision drives our commitment to delivering exceptional results for every client.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section has-vertical-paddings">
        <div className="inner">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>Let&apos;s discuss how we can help you achieve your goals with custom software solutions that deliver real results.</p>
            <div className="cta-buttons">
              <Link href="https://calendly.com/andrei-kaleshka/30min" target="_blank" className="button primary">
                Schedule Free Consultation
              </Link>
              <Link href="/contact" className="button secondary">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
