import React from 'react';
import type { Metadata } from 'next';
import ShowcasesComponent from '@/components/showcases/ShowcasesComponent';

export const metadata: Metadata = {
  title: "Showcases - WideFix",
  description: "Check out our amazing showcases! We've put a ton of effort into making them awesome, and our clients love them because they're affordable and make a big impression.",
  alternates: {
    canonical: "https://widefix.com/showcases"
  },
  openGraph: {
    title: "Showcases - WideFix",
    description: "Check out our amazing showcases! We've put a ton of effort into making them awesome, and our clients love them because they're affordable and make a big impression.",
    url: "https://widefix.com/showcases",
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
}

export default function ShowcasesPage() {
  return <ShowcasesComponent />;
};
