import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import type { Metadata } from "next";
import CareerSection from '@/components/CareerSection';
import Image from 'next/image';
import Link from 'next/link';
import LinkIndicator from '@/components/LinkIndicator';

export const metadata: Metadata = {
  title: "Careers - WideFix",
  description: "Join our team of passionate software engineers and developers. We're looking for talented professionals who care about building high-quality products.",
  alternates: {
    canonical: "https://widefix.com/career"
  },
  twitter: socialTwitter(undefined, 'Careers at WideFix'),
  openGraph: {
    images: [socialPreview(undefined, 'Careers at WideFix')],
    title: "Careers - WideFix",
    description: "Join our team of passionate software engineers and developers. We're looking for talented professionals who care about building high-quality products.",
    url: "https://widefix.com/career",
    siteName: "WideFix",
    locale: "en_US",
    type: "website"
  }
};

export default function CareerPage() {
  return (
    <main className="career-page">
      <section className="career-hero">
        <div className="inner career-hero-grid">
          <div className="career-hero-copy">
            <p className="career-hero-eyebrow">Careers at WideFix</p>
            <h1>Build software that moves businesses forward</h1>
            <p className="career-hero-lead">
              Join our remote team working on real products, integrations, and improvements for businesses that rely on their software.
            </p>
            <Link className="career-hero-link" href="#open-positions">
              View open position <LinkIndicator />
            </Link>
          </div>
          <Image
            className="career-hero-image"
            src="/img/hero-section-background.webp"
            alt="Developer working at a computer"
            width={543}
            height={474}
            sizes="(max-width: 768px) 100vw, 560px"
            priority
          />
        </div>
      </section>
      <CareerSection />
    </main>
  )
}
