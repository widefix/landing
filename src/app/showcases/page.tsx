import React from 'react';
import type { Metadata } from 'next';
import ShowcasesComponent from '@/components/showcases/ShowcasesComponent';

export const metadata: Metadata = {
  title: "Showcases - WideFix",
  description: "Check out our amazing showcases! We've put a ton of effort into making them awesome, and our clients love them because they're affordable and make a big impression."
}

export default function ShowcasesPage() {
  return <ShowcasesComponent />;
};
