import type { Metadata } from "next";
import TeamSection from '@/components/TeamSection';

export const metadata: Metadata = {
  title: "Our Team - WideFix",
  description: "Meet the experienced professionals behind WideFix. Our team combines deep technical expertise with a genuine passion for delivering exceptional results for your business.",
  alternates: {
    canonical: "https://widefix.com/team"
  },
  openGraph: {
    title: "Our Team - WideFix",
    description: "Meet the experienced professionals behind WideFix. Our team combines deep technical expertise with a genuine passion for delivering exceptional results for your business.",
    url: "https://widefix.com/team",
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

export default function TeamPage() {
  return (
    <main>
      <TeamSection />
    </main>
  )
}
