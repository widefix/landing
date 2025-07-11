import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "@/app/styles/main.scss";
import "@/app/styles/normalize.css";
import "@/app/styles/ideal-clients.css";
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

export const metadata: Metadata = {
  title: "Your Trusted Ruby On Rails Development Partner - WideFix",
  description: "Looking to build custom software with Ruby On Rails? Look no further than our trusted and reliable team. We'll work with you every step of the way to bring your vision to life.",
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
    title: "Your Trusted Ruby On Rails Development Partner - WideFix",
    description: "Looking to build custom software with Ruby On Rails? Look no further than our trusted and reliable team. We'll work with you every step of the way to bring your vision to life.",
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
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
