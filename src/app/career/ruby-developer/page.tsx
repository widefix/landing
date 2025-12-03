import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ruby Developer - Remote Position | WideFix',
  description: 'Join our team as a Ruby developer to work on integrations with third-party billing systems including Stripe, Xero, and Shopify. Fully remote position.',
  openGraph: {
    title: 'Ruby Developer - Remote Position | WideFix',
    description: 'Join our team as a Ruby developer to work on integrations with third-party billing systems including Stripe, Xero, and Shopify. Fully remote position.',
    url: 'https://widefix.com/career/ruby-developer',
  },
}

export default function RubyDeveloperPage() {
  return (
    <main className="ruby-developer-career">
      <div className="container">
        <section className="hero-section has-vertical-paddings">
          <div className="inner">
            <header>
              <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/career">Career</Link>
                <span>/</span>
                <span>Ruby Developer</span>
              </nav>
              <h1>Ruby Developer <span>Position</span></h1>
              <p className="lead">
                Join our remote team to work on cutting-edge integrations with third-party billing systems
              </p>
            </header>
          </div>
        </section>

        <section className="job-details has-vertical-paddings">
          <div className="inner">
            <div className="job-overview">
              <h2>Position Overview</h2>
              <div className="overview-grid">
                <div className="overview-item">
                  <div className="icon">🌍</div>
                  <h3>Fully Remote</h3>
                  <p>Work from anywhere with flexible hours</p>
                </div>
                <div className="overview-item">
                  <div className="icon">⏰</div>
                  <h3>GMT +/-3h</h3>
                  <p>Timezone compatibility required</p>
                </div>
                <div className="overview-item">
                  <div className="icon">📅</div>
                  <h3>Contract Role</h3>
                  <p>Short-term/long-term contract position</p>
                </div>
              </div>
            </div>

            <div className="job-description">
              <h2>What You&apos;ll Be Working On</h2>
              <div className="description-content">
                <p>
                  We&apos;re looking for a skilled Ruby developer to join our team and work on complex integrations
                  with third-party billing and e-commerce systems. This is an exciting opportunity to work with
                  cutting-edge financial technology and contribute to robust, scalable solutions.
                </p>

                <h3>Key Responsibilities</h3>
                <ul className="responsibility-list">
                  <li>
                    <strong>Payment System Integration:</strong> Develop and maintain integrations with Stripe&apos;s
                    comprehensive payment platform, including payment processing, subscription management, and webhook handling
                  </li>
                  <li>
                    <strong>Accounting Software Integration:</strong> Build robust connections with Xero accounting software,
                    implementing data synchronization for invoices, payments, and financial reporting
                  </li>
                  <li>
                    <strong>E-commerce Platform Integration:</strong> Create seamless integrations with Shopify and other
                    e-commerce platforms, handling product data, order management, and inventory synchronization
                  </li>
                  <li>
                    <strong>API Development:</strong> Design and implement RESTful/SOAP/GraphQL APIs to facilitate data exchange
                    between various systems and ensure data consistency
                  </li>
                  <li>
                    <strong>Data Processing:</strong> Handle large volumes of transactional data, implement efficient
                    data processing algorithms, and ensure data integrity across systems
                  </li>
                  <li>
                    <strong>System Architecture:</strong> Contribute to system design decisions, optimize performance,
                    and ensure scalability of integration solutions
                  </li>
                </ul>
              </div>
            </div>

            <div className="requirements-section">
              <h2>Requirements & Skills</h2>
              <div className="requirements-grid">
                <div className="requirement-category">
                  <h3>🧠 Analytical Skills</h3>
                  <ul>
                    <li>Strong problem-solving abilities and logical thinking</li>
                    <li>Ability to analyze complex business requirements and translate them into technical solutions</li>
                    <li>Experience with debugging and troubleshooting integration issues</li>
                    <li>Proficiency in data analysis and identifying patterns in large datasets</li>
                  </ul>
                </div>

                <div className="requirement-category">
                  <h3>⚙️ Technical Expertise</h3>
                  <ul>
                    <li>Solid understanding of algorithms and data structures</li>
                    <li>Experience with Ruby on Rails framework and Ruby ecosystem</li>
                    <li>Knowledge of API design and implementation</li>
                    <li>Understanding of database design and optimization (PostgreSQL, MySQL)</li>
                    <li>Familiarity with version control systems (Git)</li>
                    <li>Experience with testing frameworks (RSpec)</li>
                  </ul>
                </div>

                <div className="requirement-category">
                  <h3>📊 Domain Knowledge</h3>
                  <ul>
                    <li>Basic understanding of accounting principles and financial workflows</li>
                    <li>Knowledge of statistics and data analysis concepts</li>
                    <li>Familiarity with e-commerce business models and processes</li>
                    <li>Understanding of payment processing and billing cycles</li>
                    <li>Experience with financial reporting and reconciliation processes</li>
                  </ul>
                </div>

                <div className="requirement-category">
                  <h3>🔧 Integration Experience</h3>
                  <ul>
                    <li>Previous experience with third-party API integrations</li>
                    <li>Understanding of webhook systems and event-driven architecture</li>
                    <li>Knowledge of data synchronization strategies</li>
                    <li>Experience with error handling and retry mechanisms</li>
                    <li>Familiarity with rate limiting and API quotas</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="why-join">
              <h2>Why Join WideFix?</h2>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon">💻</div>
                  <h3>Remote-First Culture</h3>
                  <p>We&apos;ve been remote from day one. Enjoy the flexibility to work from anywhere while maintaining work-life balance.</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🚀</div>
                  <h3>Cutting-Edge Projects</h3>
                  <p>Work on innovative fintech solutions that directly impact businesses and their financial operations.</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">📈</div>
                  <h3>Professional Growth</h3>
                  <p>Gain expertise in financial technology, expand your integration skills, and work with industry-leading platforms.</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🤝</div>
                  <h3>Collaborative Environment</h3>
                  <p>Join a team of experienced developers who value knowledge sharing and collaborative problem-solving.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="application-section">
          <div className="inner">
            <div className="application-cta">
              <h2>Ready to Apply?</h2>
              <p>
                We&apos;re looking for talented developers who are passionate about building robust,
                scalable integration solutions. If you have the skills and experience we&apos;re looking for,
                we&apos;d love to hear from you.
              </p>
              <div className="cta-buttons">
                <Link href="mailto:cv@widefix.com" className="button primary large">
                  Send us your resume
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
