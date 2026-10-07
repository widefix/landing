import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import type { Metadata } from "next";
import CareerSection from '@/components/CareerSection';

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
    <main>
      <CareerSection />
    </main>
  )
}
