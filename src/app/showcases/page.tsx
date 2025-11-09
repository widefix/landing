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
  openGraph: {
    title: title,
    description: description,
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
