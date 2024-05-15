import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/styles/main.scss";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Head from "@/components/head/Head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Trusted Ruby On Rails Development Partner - WideFix",
  description: "Looking to build custom software with Ruby On Rails? Look no further than our trusted and reliable team. We'll work with you every step of the way to bring your vision to life.",
  twitter: {
    card: "summary_large_image",
    site: "@ka8725",
    creator: "@ka8725", 
    images: "https://raw.githubusercontent.com/widefix/widefix/main/img/block-hero.jpg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>  
    </html>
  );
}
