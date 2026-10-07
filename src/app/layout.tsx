import { socialPreview, socialTwitter } from '@/lib/socialPreview';
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
import "@/app/styles/rails-ownership.css";
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

const desc = "WideFix takes ownership of existing Ruby on Rails applications: handover, stabilization, maintenance, upgrades and ongoing feature development.";

export const metadata: Metadata = {
  metadataBase: new URL("https://widefix.com"),
  title: "Ruby on Rails Application Ownership - WideFix",
  description: desc,
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
  twitter: socialTwitter(undefined, 'WideFix - Rails application ownership'),
  openGraph: {
    images: [socialPreview(undefined, 'WideFix - Rails application ownership')],
    title: "Ruby on Rails Application Ownership - WideFix",
    description: desc,
    url: "https://widefix.com",
    siteName: "WideFix",
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
        {process.env.NODE_ENV === "production" && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NPVP4Z5');`}
          </Script>
        )}
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
