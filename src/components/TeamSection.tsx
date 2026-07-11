import Image from 'next/image';

interface TeamMember {
  name: string;
  image: string;
  tagline: string;
  qualities: string[];
  businessValue: string;
  industries: string[];
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
                <h3>{member.name}</h3>
                <span className="tagline">{member.tagline}</span>

                <p className="business-value">{member.businessValue}</p>

                <ul className="qualities">
                  {member.qualities.map((quality, qIdx) => (
                    <li key={qIdx}>{quality}</li>
                  ))}
                </ul>

                <div className="industries">
                  <span className="label">Experience in:</span>
                  <div className="industry-tags">
                    {member.industries.map((industry, iIdx) => (
                      <span key={iIdx} className="industry-tag">{industry}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
