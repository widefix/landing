import Image from 'next/image';

export default function ClutchAwards() {
  return (
            <div className="rails-hero-awards" aria-label="Clutch awards">
              <Image src="/img/awards/clutch-application-management-support-2026.svg" alt="Clutch Top Application Management and Support Company 2026" width={999} height={1080} />
              <Image src="/img/awards/clutch-rails-developer-2024.svg" alt="Clutch Top Ruby on Rails Developer 2024" width={800} height={1080} />
              <Image src="/img/awards/clutch-rails-developer-2023.svg" alt="Clutch Top Ruby on Rails Developer 2023" width={800} height={1080} />
            </div>
  );
}
