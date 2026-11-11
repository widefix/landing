import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import type { Metadata } from "next";
import { getClutchReferral, type ReferralParams } from '@/lib/clutchReferral';
import ContactComponent from '@/components/contact/ContactComponent';

export const metadata: Metadata = {
  title: "Contact - WideFix",
  description: "Discuss your existing Rails application with WideFix: handover, maintenance, upgrades and ongoing development.",
  alternates: {
    canonical: "https://widefix.com/contact"
  },
  twitter: socialTwitter('/img/contact.jpg', 'Contact WideFix'),
  openGraph: {
    images: [socialPreview('/img/contact.jpg', 'Contact WideFix')],
    title: "Contact - WideFix",
    description: "Discuss your existing Rails application with WideFix: handover, maintenance, upgrades and ongoing development.",
    url: "https://widefix.com/contact",
    siteName: "WideFix",
    locale: "en_US",
    type: "website"
  }
};

export default function ContactPage({ searchParams }: { searchParams: ReferralParams }) {
  return (
    <main className="rails-home rails-contact">
      <ContactComponent referral={getClutchReferral(searchParams)} />
    </main>
  )
}
