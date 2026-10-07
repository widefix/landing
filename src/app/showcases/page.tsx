import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import React from 'react';
import type { Metadata } from 'next';
import ShowcasesComponent from '@/components/showcases/ShowcasesComponent';

const description = "Discover how WideFix transforms businesses with our expert web development and digital solutions across various industries.";
const title = "Showcases - WideFix";

export const metadata: Metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: "https://widefix.com/showcases"
  },
  twitter: socialTwitter('/img/showcases/video.webp', 'WideFix case studies'),
  openGraph: {
    images: [socialPreview('/img/showcases/video.webp', 'WideFix case studies')],
    title: title,
    description: description,
    url: "https://widefix.com/showcases",
    siteName: "WideFix",
    locale: "en_US",
    type: "website"
  }
}

export default function ShowcasesPage() {
  return <ShowcasesComponent />;
};
