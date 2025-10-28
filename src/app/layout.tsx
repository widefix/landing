import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Montserrat } from "next/font/google";
import "@/app/styles/main.scss";
import "@/app/styles/normalize.css";
import "@/app/styles/ideal-clients.css";
import "@/app/styles/achievements.css";
import "@/app/styles/tech-stack.css";
import "@/app/styles/services.css";
import "@/app/styles/contact.css";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const desc = "WideFix is a custom software agency led by Toptal expert Andrei Kaleshka, part of the top 3% of global talent.";

export const metadata: Metadata = {
  title: "Your Trusted Software Development Partner - WideFix",
  description: desc,
  twitter: {
    card: "summary_large_image",
    site: "@ka8725",
    creator: "@ka8725",
    images: "https://raw.githubusercontent.com/widefix/widefix/main/img/block-hero.jpg"
  },
  icons: {
    icon: [
      { url: "/img/favicon.ico" },
      { url: "/img/favicon-16x16.png", sizes: '16x16', type: 'image/png' },
      { url: "/img/favicon-32x32.png", sizes: '32x32', type: 'image/png' },
      { url: "/img/favicon-96x96.png", sizes: '96x96', type: 'image/png' },
      { url: "/img/android-icon-192x192.png", sizes: '192x192', type: 'image/png' }
    ],
    apple: [
      { url: "/img/apple-icon-57x57.png", sizes: '57x57', type: 'image/png' },
      { url: "/img/apple-icon-60x60.png", sizes: '60x60', type: 'image/png' },
      { url: "/img/apple-icon-72x72.png", sizes: '72x72', type: 'image/png' },
      { url: "/img/apple-icon-76x76.png", sizes: '76x76', type: 'image/png' },
      { url: "/img/apple-icon-114x114.png", sizes: '114x114', type: 'image/png' },
      { url: "/img/apple-icon-120x120.png", sizes: '120x120', type: 'image/png' },
      { url: "/img/apple-icon-144x144.png", sizes: '144x144', type: 'image/png' },
      { url: "/img/apple-icon-152x152.png", sizes: '152x152', type: 'image/png' },
      { url: "/img/apple-icon-180x180.png", sizes: '180x180', type: 'image/png' }
    ]
  },
  alternates: {
    canonical: "https://widefix.com"
  },
  openGraph: {
    title: "Your Trusted Software Development Partner - WideFix",
    description: desc,
    url: "https://widefix.com",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <Script src="https://analytics.ahrefs.com/analytics.js" data-key="HnkuFuvcrzOwRGEFlpZrIA" async strategy="afterInteractive" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
