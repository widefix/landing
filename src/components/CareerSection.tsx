import Image from 'next/image';
import Link from 'next/link';

export default function CareerSection() {
  const careerValues = [
    {
      icon: '/img/career/passion.svg',
      unicode: '⭐',
      title: 'Passion for Quality',
      description: 'You&apos;re passionate about building high-quality products that users love'
    },
    {
      icon: '/img/career/algorithms.svg',
      unicode: '🧠',
      title: 'Strong Fundamentals',
      description: 'You know algorithms and data structures and understand why they matter'
    },
    {
      icon: '/img/career/organized.svg',
      unicode: '📋',
      title: 'Self-Organized',
      description: 'You manage your time effectively and work independently with minimal supervision'
    },
    {
      icon: '/img/career/results.svg',
      unicode: '🎯',
      title: 'Results Oriented',
      description: 'You prioritize delivering essential features with quality over doing everything'
    },
    {
      icon: '/img/career/pragmatic.svg',
      unicode: '🛠️',
      title: 'Pragmatic Approach',
      description: 'You build on existing tech stacks without overcomplicating even when "better" alternatives exist'
    },
    {
      icon: '/img/career/responsive.svg',
      unicode: '⚡',
      title: 'Responsible & Responsive',
      description: 'You&apos;re reliable and ready to handle urgent tasks quickly when needed'
    },
    {
      icon: '/img/career/analytical.svg',
      unicode: '🔍',
      title: 'Analytical Mindset',
      description: 'You analyze problems, evaluate solutions, and choose what works best for the current situation'
    },
    {
      icon: '/img/career/impact.svg',
      unicode: '📈',
      title: 'Impact Awareness',
      description: 'You understand how your solutions affect the product both in the short and long term'
    }
  ];

  const roles = [
    {
      title: 'Software Engineers',
      description: 'Build robust backend systems and scalable solutions'
    },
    {
      title: 'Developers',
      description: 'Create full-stack features across our tech stack'
    },
    {
      title: 'Product Managers',
      description: 'Lead product vision and prioritize what truly matters'
    }
  ];

  return (
    <section className="career has-vertical-paddings">
      <div className="inner">
        <header>
          <h2>Join our <span>team</span></h2>
          <p>We&apos;re building a team of passionate professionals who care about delivering quality products</p>
        </header>

        <div className="career-intro">
          <p className="intro-text">
            Are you someone who takes pride in building exceptional software? Do you believe that understanding the fundamentals - algorithms, data structures, and architecture - directly impacts product quality? If you&apos;re self-organized, result-driven, and passionate about solving real problems, we want to hear from you.
          </p>
        </div>

        <div className="roles-section">
          <h3>We&apos;re hiring for:</h3>
          <div className="roles-grid">
            {roles.map((role, idx) => (
              <div key={idx} className="role-card">
                <h4>{role.title}</h4>
                <p>{role.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="open-positions-section">
          <h3>Current Open Positions:</h3>
          <div className="positions-grid">
            <div className="position-card">
              <div className="position-header">
                <h4>Ruby Developer</h4>
                <span className="position-badge">Contract</span>
              </div>
              <p>Work on integrations with third-party billing systems including Stripe, Xero, and Shopify. Fully remote position.</p>
              <div className="position-details">
                <span className="detail-item">🌍 Remote</span>
                <span className="detail-item">⏰ GMT +/-3h</span>
                <span className="detail-item">📅 Short-term</span>
              </div>
              <Link href="/career/ruby-developer" className="position-link">
                View Details & Apply →
              </Link>
            </div>
          </div>
        </div>

        <div className="values-section">
          <h3>What we look for:</h3>
          <div className="values-grid">
            {careerValues.map((value, idx) => (
              <div key={idx} className="value-item">
                <div className="value-icon">
                  <span className="unicode-icon">{value.unicode}</span>
                </div>
                <div className="value-content">
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="value-proposition">
          <h3>Why join WideFix?</h3>
          <ul>
            <li>
              <strong>Work on impactful projects</strong>. Build software that solves real problems for real users
            </li>
            <li>
              <strong>Learn from experts</strong>. Our founder is in the top 3% of developers on Toptal with decades of experience
            </li>
            <li>
              <strong>Pragmatic culture</strong>. We value practical solutions over hype, and results over perfection
            </li>
            <li>
              <strong>Clean code matters</strong>. We invest in code quality, automated testing, and sustainable architecture
            </li>
            <li>
              <strong>Ownership mindset</strong>. You&apos;ll have autonomy to make decisions and own your work
            </li>
            <li>
              <strong>Global reach</strong>. Work with clients and teams from around the world
            </li>
          </ul>
        </div>

        <div className="cta-section">
          <h3>Ready to make an impact?</h3>
          <p>If you recognize yourself in our values and you&apos;re excited about building exceptional products, we&apos;d love to talk with you.</p>
          <div className="button-container">
            <Link
              className="button primary"
              href="mailto:cv@widefix.com"
            >
              Send us your resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
