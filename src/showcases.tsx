import { ReactNode } from 'react';

import SeoOptimization from '@/cases/seo-optimization';
import { CategoryName, ResultBoxColor, Showcase, SwiperSlideColor } from './enums';

const showcases: Showcase[] = [
  {
    slug: "stripe-integration",
    category: CategoryName.systemsIntegrations,
    preview: {
      title: "Stripe Data Consistency",
      companyName: "Worship Online",
      solution: "Stripe Integration",
      results: "We fixed data consistency issues between the app and Stripe.",
      wrapperColor: SwiperSlideColor.purple,
      buttonColor: SwiperSlideColor.purple,
      companyImageSrc: "/img/showcases/clients/wo.svg",
      url: ''
    },
    body: {
      bannerTopTitle: (
        <h1>
          Stripe Integration consistency <span className="oval">fix</span> to prevent financial <span className="stripe">losses</span>
        </h1>
      ),
      bannerTopImageSrc: "/img/showcases/wo.png",
      bannerTopImageWebpSrc: "/img/showcases/wo.webp",
      description: "Solved New User Payment Friction with Stripe Optimization",
      descriptionText: (
        <p>
          Identified and eliminated bottlenecks within the payment flow to <strong><i>improve conversion rates</i></strong> for new sign-ups.
        </p>
      ),
      detailsTitle: 'Stripe Integration',
      detailsText: (
        <p>
          We fixed data consistency issues between the app and Stripe. The fix resulted in an immediate recovery
          of $525 monthly recurring revenue (MRR) and <strong><i>prevented future financial losses that could be
          up to $1500 MRR.</i></strong>
        </p>
      ),
      detailsImageSrc: "/img/showcases/case/stripe-wo.svg",
      problemText: (
        <p>
          While the number of new users increased, the <strong><i>revenue slowly fell</i></strong>.
        </p>
      ),
      solutionFirstText: (
        <p>
          We gathered all the data from Stripe and saved it into our database. We then analyzed it using SQL and
          Metabase, revealing a severe Stripe integration breach. This breach was related to asynchronous
          communication and the unordered processing of webhooks. Our team worked together to come up with
          possible solutions and ultimately found an easy fix for the issue regarding the architecture. The fix
          didn`t pose any risks to the business. We were able to fix the architectural issue related to the
          webhook processing and correct the historical data. <strong><i>We also activated subscriptions for all
          users we could recover.</i></strong>
        </p>
      ),
      solutionSecondText: (
        <p>
          We have set up monitoring with Metabase and Slack to prevent the issue from happening again.
        </p>
      ),
      resultBoxes: [
        {
          color: ResultBoxColor.lightBlue,
          imageSrc: "/img/showcases/case/icons/stock.svg",
          message: "MRR increase",
          number: "$525"
        },
        {
          color: ResultBoxColor.lightGreen,
          imageSrc: "/img/showcases/case/icons/money.svg",
          message: "Loss Preventation",
          number: "$1500"
        },
      ],
      resultText: (
        <p>
          983 out of 9,471 premium users did not have an actual subscription, which is roughly 10%. Of these 983
          users, 514 had a &quot;deleted&quot; status, indicating they had not used the app for a long time. Only 469,
          equivalent to 5% of all premium users, could exploit the issue. However, only 79 of them had used the app in
          the last three months and received an attempt to reactivate their subscription. Out of these, 20 immediately
          acquired an active subscription. The rest got moved to the free plan. <strong><i>The reactivation of the subscriptions
          resulted in approximately a $525 MRR increase.</i></strong> The applied fix aims to prevent future financial losses that
          could amount to $1500 in MRR (these are rough calculations done on the historical data).
        </p>
      ),
      helpTitle: "Need help with Stripe integration?",
      related: [
        {
          companyName: "Worship Online",
          solution: "Stripe Integration",
          results: "How we reconciled app users with Stripe and prevented financial losses.",
          wrapperColor: SwiperSlideColor.purple,
          buttonColor: SwiperSlideColor.purple,
          companyImageSrc: "/img/showcases/clients/wo.svg",
          url: "https://widefix.com/blog/reconcile-app-users-against-stripe-and-prevent-financial-losses/"
        }
      ]
    },
    metadata: {
      title: "Stripe Integration - WideFix",
      description: "See how we fixed Stripe integration data consistency and prevented financial losses."
    }
  },
  {
    slug: "prevent-account-sharing",
    category: CategoryName.optimisations,
    preview: {
      companyName: "Worship Online",
      solution: "System Design",
      title: "Prevent Account Sharing",
      results: "We implemented an on-premises solution to combat account sharing.",
      wrapperColor: SwiperSlideColor.green,
      buttonColor: SwiperSlideColor.green,
      companyImageSrc: "/img/showcases/clients/wo.svg",
      url: ''
    },
    body: {
      bannerTopTitle: (
        <h1>
          Prevent account sharing to <span className="oval">stop</span> financial <span className="stripe">losses</span>
        </h1>
      ),
      bannerTopImageSrc: "/img/showcases/case/showcase-2-cybersecurity.jpg",
      bannerTopImageWebpSrc: "/img/showcases/case/showcase-2-cybersecurity.webp",
      description: "Solved the issue with account sharing by users",
      descriptionText: (
        <p>Added Multi-factor Authentication (MFA) to the project in a risk-free way for the business.
          That increased daily signups by roughly <b>30%</b>. The revenue has stopped descending <b>5%</b> monthly and recovered. That also has improved security.
        </p>
      ),
      detailsTitle: 'Stop account sharing',
      detailsText: (
        <p>
          We tackled declining revenue by combating widespread account sharing with <strong><i>Multi-factor Authentication (MFA) and login session limits</i></strong>. Through data analysis and monitoring, severe account sharers were targeted, leading to a <strong><i>30% increase</i></strong> in daily signups and a <strong><i>400% reduction in average</i></strong> login sessions per user. Revenue stabilized, <strong><i>preventing 5% monthly losses</i></strong>. The login session limit of three sessions per account enhanced security and accountability.
        </p>
      ),
      detailsImageSrc: "/img/showcases/case/auth-worshiponline.svg",
      problemText: (
        <p>
          The revenue was <strong><i>slowly descending</i></strong>. It was clear that this happened because the users <strong><i>shared their accounts</i></strong> because of the many logins they used to make daily.
        </p>
      ),
      solutionFirstText: (
        <p>
          We collected the necessary data to determine who shares their accounts and how severely. Then, we defined indicators showing the situation dynamics and started measuring and monitoring them. We used Metabase to monitor and analyze the data. The users who shared their accounts severely and for sure <strong><i>got Multi-factor Authentication (MFA) enabled</i></strong>, which we also implemented. That increased daily signups by <strong><i>roughly 30%</i></strong>. The average login session per user decreased <strong><i>from 6 to 1.5, or by 400%</i></strong>. Revenue has stopped declining.
        </p>
      ),
      solutionSecondText: (
        <p>
          Later, we implemented a <strong><i>login session limit</i></strong> so that one account could have a maximum of 3 simultaneous login sessions. That was possible only after we built the infrastructure around the measurement system.
        </p>
      ),
      resultBoxes: [
        {
          color: ResultBoxColor.darkBlue,
          imageSrc: "/img/showcases/case/icons/cancel.svg",
          message: "Revenue losses",
          number: "-5%"
        },
        {
          color: ResultBoxColor.green,
          imageSrc: "/img/showcases/case/icons/flag.svg",
          message: "Exploit The Issue",
          number: "-400%"
        },
        {
          color: ResultBoxColor.blue,
          imageSrc: "/img/showcases/case/icons/user.svg",
          message: "Monthly signups",
          number: "+27%"
        },
      ],
      resultText: (
        <p>
          Daily signups increased by <strong><i>30%</i></strong>, login sessions per user <strong><i>decreased by 400%</i></strong>, and revenue stopped declining. Our solution <strong><i>prevented 5%</i></strong> monthly revenue losses.
        </p>
      ),
      helpTitle: "Need for help with performance optimization?",
      related: [
        {
          companyName: "Worship Online",
          solution: "Stripe Integration",
          results: "We fixed data consistency issues between the app and Stripe.",
          wrapperColor: SwiperSlideColor.purple,
          buttonColor: SwiperSlideColor.purple,
          companyImageSrc: "/img/showcases/clients/wo.svg",
          url: "https://widefix.com/blog/prevent-account-sharing-with-mfa/"
        }
      ]
    },
    metadata: {
      title: "Prevent account sharing - WideFix",
      description: "See how we added Multi-Factor Authentication (MFA) and limitted login sessions per user and prevented 5% monthly financial losses."
    }
  },
  {
    slug: "build-crossplatform-mobile-application",
    category: CategoryName.devDesign,
    preview: {
      companyName: "Worship Online",
      solution: "Mobile App",
      title: "Mobile App Development",
      results: "We have designed and launched a mobile application for both iOS and Android platforms.",
      wrapperColor: SwiperSlideColor.orange,
      buttonColor: SwiperSlideColor.orange,
      companyImageSrc: "/img/showcases/clients/wo.svg",
      url: ''
    },
    body: {
      bannerTopTitle: (
        <h1>
          Launched a mobile app from scratch for both <span className="oval">iOS</span> and <span className="stripe">Android</span>
        </h1>
      ),
      bannerTopImageSrc: "/img/showcases/launch-wo-mobile-app.png",
      bannerTopImageWebpSrc: "/img/showcases/launch-wo-mobile-app.webp",
      description: "Launch a mobile app for both iOS and Android platforms",
      descriptionText: (
        <p>
          Designed and built a mobile app from scratch for both iOS and Android platforms, featuring advanced <strong>Audio Signal Processing</strong> functionality. Now available on the <strong>App Store</strong> and <strong>Google Play</strong>. It receives hundreds of installations daily.
        </p>
      ),
      detailsTitle: 'Mobile app development',
      detailsText: (
        <p>
          The client had dreamed of a new mobile app for many years. In just a few months, we developed the app from scratch, adapted the back-end for it, and finally launched it on the <strong>App Store</strong> and <strong>Google Play</strong>.
        </p>
      ),
      detailsImageSrc: "/img/showcases/case/mobile-app-wo.svg",
      bannerProblemWebp: "/img/showcases/case/mixer.webp",
      bannerProblemPng: "/img/showcases/case/mixer.png",
      problemText: (
        <p>
          While most of the functionality was straightforward to implement, the real-time <strong>audio mixer</strong> posed a significant challenge. The mixer needed to be both <strong>fast</strong> and <strong>reliable</strong> to ensure a seamless user experience. It was designed to mix multiple audio streams in real-time while applying effects such as stereo panning, adjusting the volume of individual tracks or all tracks simultaneously, rewinding, muting, and soloing tracks.
        </p>
      ),
      bannerSolutionWebp: "/img/showcases/case/mixer-solution.webp",
      bannerSolutionPng: "/img/showcases/case/mixer-solution.png",
      solutionFirstText: (
        <p>
          We delved into <strong>Digital Signal Processing</strong>, with a focus on <strong>Audio Processing</strong>, and implemented a custom library for both iOS and Android in their native code. This library was then integrated into the app through a React Native module. Designed for speed and reliability, the library ensures a seamless user experience.
        </p>
      ),
      solutionSecondText: (
        <p>
          This enabled us to finally launch the app the client had been eager to release for years on the App Store and Google Play. The launch went smoothly, and the app now receives hundreds of installations daily.
        </p>
      ),
      resultBoxes: [
        {
          color: ResultBoxColor.lightBlue,
          imageSrc: "/img/showcases/case/icons/stock.svg",
          message: "iOS app impressions increase",
          number: "48%"
        },
        {
          color: ResultBoxColor.lightGreen,
          imageSrc: "/img/showcases/case/icons/money.svg",
          message: "iOS app views increase",
          number: "43%"
        },
        {
          color: ResultBoxColor.darkBlue,
          imageSrc: "/img/showcases/case/icons/cancel.svg",
          message: "iOS app crashes decrease",
          number: "-52%"
        },
        {
          color: ResultBoxColor.green,
          imageSrc: "/img/showcases/case/icons/user.svg",
          message: "iOS downloads increase",
          number: "28%"
        },
        {
          color: ResultBoxColor.orange,
          imageSrc: "/img/showcases/case/icons/user.svg",
          message: "Android average daily downloads",
          number: "25"
        },
        {
          color: ResultBoxColor.red,
          imageSrc: "/img/showcases/case/icons/money.svg",
          message: "Android app conversion rate",
          number: "62%%"
        }
      ],
      resultText: (
        <>
          <p>
            The iOS app has seen a 48% increase in impressions, a 43% rise in product page views, and a 28% boost in downloads, while crashes have decreased by 52%.
          </p>
          <p>
            Since there was no Android app previously, the results are not directly comparable. However, the Android app now averages 200 daily downloads, with this number increasing every day. The conversion rate is 62.15%.
          </p>
        </>
      ),
      helpTitle: "Looking for assistance with mobile app development?"
    },
    metadata: {
      title: "Mobile app development - WideFix",
      description: "See how we built and launched a mobile app with an advanced feature that allowed our client to continue growing."
    }
  },
  {
    slug: "ruby-on-rails-redesign",
    category: CategoryName.devDesign,
    preview: {
      companyName: "WorshipOnline",
      solution: "System Design",
      title: "Ruby on Rails App Redesign",
      results: "We redesigned the app with zero downtime, achieving 20% more signups and 30% revenue increase.",
      wrapperColor: SwiperSlideColor.blue,
      buttonColor: SwiperSlideColor.blue,
      companyImageSrc: "/img/showcases/clients/wo.svg",
      url: ''
    },
    body: {
      bannerTopTitle: (
        <h1>
          Risk-free Ruby on Rails app <span className="oval">redesign</span> with zero <span className="stripe">downtime</span>
        </h1>
      ),
      bannerTopImageSrc: "/img/showcases/redesign-wo.png",
      bannerTopImageWebpSrc: "/img/showcases/redesign-wo.webp",
      bannerSolutionPng: "/img/showcases/system-redesign.jpg",
      bannerSolutionWebp: "/img/showcases/system-redesign.webp",
      description: "Complete UI/UX overhaul without disrupting existing users",
      descriptionText: (
        <p>
          Successfully redesigned and migrated a Ruby on Rails application to a new front-end while maintaining <strong><i>zero downtime</i></strong> and preserving full functionality for existing mobile app users. The gradual migration approach resulted in <strong><i>20% increase in daily signups</i></strong> and <strong><i>30% revenue growth</i></strong>.
        </p>
      ),
      detailsTitle: 'Zero-Risk Redesign Strategy',
      detailsText: (
        <p>
          We adopted the existing back-end for the new design and built a completely new front-end, seamlessly integrating it with the updated back-end architecture. <strong><i>All changes were implemented with zero downtime</i></strong> and no risks to the business or existing mobile app users. We implemented a gradual user migration system with the ability to switch back to the old UI in case of any issues, ensuring <strong><i>complete risk mitigation</i></strong>.
        </p>
      ),
      detailsImageSrc: "/img/showcases/case/redesign-architecture.svg",
      problemText: (
        <p>
          The existing Ruby on Rails application had an <strong><i>outdated user interface</i></strong> that was affecting user engagement and conversion rates, but a complete redesign posed significant risks to business continuity and existing mobile app functionality.
        </p>
      ),
      solutionFirstText: (
        <p>
          We implemented a sophisticated dual-interface system that allowed us to <strong><i>gradually migrate users to the new design</i></strong> while maintaining the old interface as a fallback option. The new front-end was built using modern technologies and seamlessly integrated with the existing Ruby on Rails back-end. We ensured that all existing API endpoints remained functional for the mobile app, preventing any disruption to mobile users.
        </p>
      ),
      solutionSecondText: (
        <p>
          The migration strategy included comprehensive testing, user feedback collection, and real-time monitoring to ensure optimal performance. Users could easily switch between the old and new interfaces during the transition period, providing <strong><i>maximum flexibility and risk mitigation</i></strong>.
        </p>
      ),
      resultBoxes: [
        {
          color: ResultBoxColor.green,
          imageSrc: "/img/showcases/case/icons/user.svg",
          message: "Daily signups increase",
          number: "+20%"
        },
        {
          color: ResultBoxColor.blue,
          imageSrc: "/img/showcases/case/icons/money.svg",
          message: "Revenue growth",
          number: "+30%"
        },
        {
          color: ResultBoxColor.lightGreen,
          imageSrc: "/img/showcases/case/icons/flag.svg",
          message: "System downtime",
          number: "0min"
        }
      ],
      resultText: (
        <p>
          The redesign was completed with <strong><i>zero downtime</i></strong> and no disruption to existing services. We achieved a <strong><i>20% increase in daily new user signups</i></strong> and a <strong><i>30% increase in revenue</i></strong>. The gradual migration approach ensured that all existing mobile app users continued to have uninterrupted service throughout the entire process.
        </p>
      ),
      helpTitle: "Need help with risk-free application redesign?",
      related: [
        {
          companyName: "WorshipOnline",
          solution: "Prevent account sharing",
          results: "We implemented an on-premises solution to combat account sharing.",
          wrapperColor: SwiperSlideColor.green,
          buttonColor: SwiperSlideColor.green,
          companyImageSrc: "/img/showcases/clients/wo.svg",
          url: "https://blog.widefix.com/risk-free-redesign-ruby-on-rails-app/"
        }
      ]
    },
    metadata: {
      title: "Ruby on Rails App Redesign - WideFix",
      description: "See how we redesigned a Ruby on Rails application with zero downtime, achieving 20% more signups and 30% revenue increase."
    }
  },
  SeoOptimization
];

export default showcases;
