import type { Metadata } from "next";
import ContactComponent from '@/components/contact/ContactComponent';

export const metadata: Metadata = {
  title: "Contact - WideFix",
  description: "Discuss your existing Rails application with WideFix: handover, maintenance, upgrades and ongoing development.",
  alternates: {
    canonical: "https://widefix.com/contact"
  },
  openGraph: {
    title: "Contact - WideFix",
    description: "Discuss your existing Rails application with WideFix: handover, maintenance, upgrades and ongoing development.",
    url: "https://widefix.com/contact",
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

export default function ContactPage() {
  return (
    <main>
      <ContactComponent />
    </main>
  )
}
