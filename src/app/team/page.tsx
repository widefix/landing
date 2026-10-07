import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import type { Metadata } from "next";
import TeamSection from '@/components/TeamSection';

export const metadata: Metadata = {
  title: "Our Team - WideFix",
  description: "Meet the experienced professionals behind WideFix. Our team combines deep technical expertise with a genuine passion for delivering exceptional results for your business.",
  alternates: {
    canonical: "https://widefix.com/team"
  },
  twitter: socialTwitter(undefined, 'The WideFix team'),
  openGraph: {
    images: [socialPreview(undefined, 'The WideFix team')],
    title: "Our Team - WideFix",
    description: "Meet the experienced professionals behind WideFix. Our team combines deep technical expertise with a genuine passion for delivering exceptional results for your business.",
    url: "https://widefix.com/team",
    siteName: "WideFix",
    locale: "en_US",
    type: "website"
  }
};

export default function TeamPage() {
  return (
    <main>
      <TeamSection />
    </main>
  )
}
