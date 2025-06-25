import Image from 'next/image'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - WideFix",
  description: "Whether you're looking to create a website, develop a mobile app, or build a custom software solution, we've got you covered.",
  alternates: {
    canonical: "https://widefix.com/services"
  },
  openGraph: {
    title: "Services - WideFix",
    description: "Whether you're looking to create a website, develop a mobile app, or build a custom software solution, we've got you covered.",
    url: "https://widefix.com/services",
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

export default function ServicesPage() {
  return (
    <main>
      <section className="hero has-vertical-paddings">
        <div className="inner">
          <div className="hero-block-left">
            <h1>We develop custom software that <span>meets</span> your business needs <span>minimizing</span> costs</h1>
            <div className="button-container">
              <a className="button primary" href="https://calendly.com/andrei-kaleshka/30min" target="_blank"
                rel="nofollow">Request a free 15‑minute app audit</a>
            </div>
          </div>
          <div className="hero-block-right">
            <picture>
              <source srcSet="/img/services.webp" type="image/webp" />
              <Image
                src="/img/services.jpg"
                quality={100}
                alt="Optimise your app to get more customers"
                width="543"
                height="474"
              />
            </picture>
          </div>
        </div>
        <div className="inner">
          <p>
            While thousands of words may not fully capture the essence of our work, we aim to showcase our capabilities in a more tangible way. To achieve this, we are developing our own online product, accessible to everyone.
          </p>
        </div>
        <div className="inner">
          <p>
            Meet <a href="https://get.budgetingkid.com/" target="_blank">BudgetingKid</a>. This application is our creation, and it is <a href="https://github.com/widefix/pocketmoney/" target="_blank">open-source</a>.
          </p>
        </div>
        <div className="inner">
          <p>
            WideFix is a software development company spearheaded by founder Andrei Kaleshka. Our mission is to assist businesses of all sizes in achieving their objectives by providing them with the most effective software solutions. We implement efficient solutions that are simple to develop, maintain, and scale.
          </p>
        </div>
        <div className="inner">
          <p>
            We firmly believe that all businesses should have access to the finest possible service at a reasonable price. That’s why we only provide solutions that we fully endorse. Our solutions are guaranteed to address your business objectives without any unpleasant surprises. We collaborate closely with you to grasp your requirements and develop a solution that perfectly matches them.
          </p>
        </div>
        <div className="inner">
          <p>
            Our services encompass the development of minimum viable products (MVPs) for web and mobile applications from scratch. We provide assistance with the development of existing applications, as well as the development of custom software solutions. Additionally, we offer consulting services to guide you in making informed decisions that align with your business goals.
          </p>
        </div>
        <div className="inner">
          <p>
            We provide our services to clients worldwide, spanning the United States, Europe, North and South America, the United Kingdom of Great Britain, Australia, and beyond.
          </p>
        </div>
      </section>
    </main>
  )
}
