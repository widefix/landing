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
    tagline: 'Founder · Scaling businesses with confidence',
    qualities: [
      'Transforms complex challenges into growth opportunities',
      'Builds and leads high-performing teams',
      'Published author and recognized industry expert',
      'Open-source contributor with 4M+ downloads'
    ],
    businessValue: 'With 15+ years helping businesses scale, Andrei brings proven expertise in billing, payments, and accounting systems. As a Toptal-verified top 3% engineer, he combines technical depth with strategic thinking to deliver solutions that drive measurable business growth.',
    industries: ['FinTech', 'Billing Systems', 'E-commerce', 'SaaS']
  },
  {
    name: 'Svetlana',
    image: '/img/team/team-svetlana.webp',
    tagline: 'Precision meets ownership',
    qualities: [
      'Detail-oriented and highly focused',
      'Takes exceptional ownership of every task',
      'Dives deep into complex problems',
      'Finds thoughtful and practical solutions'
    ],
    businessValue: 'Known for her structured mindset and ability to navigate complexity, she consistently delivers solutions that balance business goals with user needs. Her meticulous approach ensures nothing gets overlooked.',
    industries: ['HRTech', 'MobilityTech', 'FaithTech', 'MusicEdTech', 'EdTech']
  },
  {
    name: 'Vlad',
    image: '/img/team/team-vlad.webp',
    tagline: 'Relentless curiosity, reliable results',
    qualities: [
      'Strong problem-solving mindset',
      'Genuine passion for learning',
      'Leaves no detail unexplored',
      'Go-to expert for complex questions'
    ],
    businessValue: 'Thrives on tackling seemingly impossible tasks and turning them into reliable, high-quality solutions. His deep commitment to quality helps turn complex requirements into scalable products.',
    industries: ['FinTech', 'FoodTech', 'MedTech']
  },
  {
    name: 'Samuel',
    image: '/img/team/team-sam.webp',
    tagline: 'Clarity through complexity',
    qualities: [
      'Structured and thoughtful approach',
      'Breaks down problems into clear parts',
      'Patient and supportive by nature',
      'Excellent at explaining technical concepts'
    ],
    businessValue: 'Brings clarity to complexity by carefully analyzing challenges and ensuring both process and outcomes remain transparent. His collaborative nature helps teams and clients navigate unfamiliar territory with confidence.',
    industries: ['Global Remote Teams', 'Product Development', 'Platform Maintenance']
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
    tagline: 'Scalable systems, thoughtful leadership',
    qualities: [
      '10+ years building scalable web platforms',
      'Brings structure and stability to engineering teams',
      'Finds simple, smart solutions to complex problems',
      'Reliable, thoughtful, and focused on the product'
    ],
    businessValue: 'Anton combines deep engineering experience with calm, practical technical leadership. He thinks ahead, strengthens both products and teams, and delivers efficient solutions that remain reliable as platforms grow.',
    industries: ['iGaming', 'MVP', 'Scalable Web Platforms', 'Ruby on Rails']
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
