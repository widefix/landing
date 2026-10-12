import Image from 'next/image';

interface TeamMember {
  name: string;
  image: string;
  tagline: string;
  qualities: string[];
  businessValue: string;
  industries?: string[];
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Andrei',
    image: '/img/andrei-kaleshka.webp',
    tagline: 'Founder · Technical lead and Rails engineer',
    qualities: [
      'Transforms complex challenges into growth opportunities',
      'Builds and leads high-performing teams',
      'Published author and recognized industry expert',
      'Open-source contributor with 4M+ downloads'
    ],
    businessValue: 'Andrei leads technical direction and delivery, with 15+ years of experience across billing, payments and accounting systems. A Toptal-verified engineer, published author and Ruby open-source contributor, he combines architecture decisions with hands-on engineering.',
    industries: ['FinTech', 'Billing Systems', 'E-commerce', 'SaaS']
  },
  {
    name: 'Svetlana',
    image: '/img/team/team-svetlana.webp',
    tagline: 'Full-stack engineer · Rails, web and mobile',
    qualities: [
      'Detail-oriented and highly focused',
      'Takes exceptional ownership of every task',
      'Dives deep into complex problems',
      'Finds thoughtful and practical solutions'
    ],
    businessValue: 'Svetlana works across backend and frontend development using Ruby on Rails, React, Next.js and React Native. She supports product changes across web and mobile interfaces with attention to maintainability and existing workflows.',
    industries: ['MusicEdTech', 'EdTech', 'SaaS']
  },
  {
    name: 'Vlad',
    image: '/img/team/team-vlad.webp',
    tagline: 'Full-stack engineer · Rails and React',
    qualities: [
      'Strong problem-solving mindset',
      'Genuine passion for learning',
      'Leaves no detail unexplored',
      'Go-to expert for complex questions'
    ],
    businessValue: 'Vlad builds backend and frontend features with Ruby on Rails, React, Next.js, TypeScript, GraphQL and PostgreSQL. His experience spans FinTech, FoodTech and MedTech, including responsive interfaces for mobile and tablet users.',
    industries: ['FinTech', 'FoodTech', 'MedTech']
  },
  {
    name: 'Samuel',
    image: '/img/team/team-sam.webp',
    tagline: 'Rails engineer · Platform maintenance and delivery tooling',
    qualities: [
      'Structured and thoughtful approach',
      'Breaks down problems into clear parts',
      'Patient and supportive by nature',
      'Excellent at explaining technical concepts'
    ],
    businessValue: 'Samuel works on Rails product development, platform maintenance and developer tooling. His experience includes building and maintaining complex systems, connecting application changes with dependable delivery workflows.',
    industries: ['FinTech', 'Platform Maintenance', 'E-Commerce']
  },
  {
    name: 'Yasir',
    image: '/img/team/team-yasir-guzman.webp',
    tagline: 'High performance, end-to-end ownership',
    qualities: [
      'Communicates clearly at strategic and technical levels',
      'Learns quickly and builds context across systems',
      'Consistently performs at a high level',
      'Takes full ownership from 0 to 100%'
    ],
    businessValue: 'Yasir combines clear, high-level communication with a strong ability to learn fast and understand the wider context. He takes ownership of outcomes and reliably drives work from the first idea through to complete delivery.',
    industries: ['Sports Event Organization', 'AI', 'MedTech', 'Analytics', 'E-commerce', 'FinTech']
  },
  {
    name: 'Anton',
    image: '/img/team/team-anton-jyha.webp',
    tagline: 'Web platform engineer · Technical leadership',
    qualities: [
      '10+ years building scalable web platforms',
      'Brings structure and stability to engineering teams',
      'Finds simple, smart solutions to complex problems',
      'Reliable, thoughtful, and focused on the product'
    ],
    businessValue: 'Anton combines deep engineering experience with calm, practical technical leadership. He thinks ahead, strengthens both products and teams, and delivers efficient solutions that remain reliable as platforms grow.',
    industries: ['iGaming', 'MVP', 'Scalable Web Platforms', 'edTech', 'SaaS']
  },
  {
    name: 'Lera',
    image: '/img/team/team-lera.webp',
    tagline: 'Delivery coordination · Web and mobile products',
    qualities: [
      'Structured, proactive, and attentive to detail',
      'Keeps multiple workstreams moving smoothly',
      'Communicates openly across diverse teams',
      'Turns complexity into clear action plans'
    ],
    businessValue: 'Lera brings clarity and transparency to complex projects through thoughtful coordination and strong communication. She keeps sight of the bigger picture, takes ownership of delivery support, and helps teams turn business needs into focused, well-organized solutions.',
    industries: ['HealthTech', 'EdTech', 'Civic Tech', 'Digital Products (Web & Mobile)', 'Advertising & Marketing', 'AI']
  }
];

export default function TeamSection() {
  return (
    <section className="team has-vertical-paddings">
      <div className="inner">
        <header>
          <h2>Meet the <span>team</span></h2>
          <p>Experienced professionals who take pride in delivering exceptional results for your business</p>
        </header>

        <div className="team-grid">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="team-member">
              <div className="member-image">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={280}
                  height={280}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="member-content">
                <h3>
                  {member.linkedin ? (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      {member.name}
                    </a>
                  ) : member.name}
                </h3>
                <span className="tagline">{member.tagline}</span>

                <p className="business-value">{member.businessValue}</p>

                <ul className="qualities">
                  {member.qualities.map((quality, qIdx) => (
                    <li key={qIdx}>{quality}</li>
                  ))}
                </ul>

                {member.industries && (
                  <div className="industries">
                    <span className="label">Experience in:</span>
                    <div className="industry-tags">
                      {member.industries.map((industry, iIdx) => (
                        <span key={iIdx} className="industry-tag">{industry}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
