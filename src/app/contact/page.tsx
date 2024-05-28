import type { Metadata } from "next";
import ContactComponent from '@/components/contact/ContactComponent';

export const metadata: Metadata = {
  title: "Contact - WideFix",
  description: "Reach out to WideFix, the custom software development agency, to have your tech issues resolved today!",
  alternates: {
    canonical: "https://widefix.com/contact"
  },
  openGraph: {
    title: "Contact - WideFix",
    description: "Reach out to WideFix, the custom software development agency, to have your tech issues resolved today!",
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
