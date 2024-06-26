import { ReactNode } from 'react';

export enum CategoryName {
  systemsIntegrations = "systems-integrations",
  optimisations = "optimisations",
  devDesign = "dev-design",
  devops = "devops",
  qualityAssurance = "quality-assurance"
}

export enum ResultBoxColor {
  green = "green",
  blue = "blue",
  red = "red",
  orange = "orange",
  lightBlue = "light-blue",
  lightGreen = "light-green",
  darkBlue = "dark-blue"
}

export enum SwiperSlideColor {
  purple = "purple",
  orange = "orange",
  green = "green",
  blue = "blue",
  yellow = "yellow",
  sea = "sea"
}

export interface ResultBox {
  color: ResultBoxColor;
  imageSrc: string;
  message: string;
  number: string;
}

export interface ShowcasePreview {
  companyName: string;
  solution: string;
  results: string;
  wrapperColor: SwiperSlideColor;
  buttonColor: SwiperSlideColor;
  companyImageSrc: string;
  url: string;
}

export interface ShowcaseBody {
  bannerTopTitle: ReactNode;
  bannerTopImageSrc: string;
  bannerTopImageWebpSrc?: string;
  description: string;
  descriptionText: ReactNode;
  detailsTitle: string;
  detailsText: ReactNode;
  detailsImageSrc: string;
  problemText: ReactNode;
  solutionFirstText: ReactNode;
  solutionSecondText: ReactNode;
  resultBoxes: ResultBox[];
  resultText: ReactNode;
  helpTitle: string;
  related: ShowcasePreview[];
}

export interface Showcase {
  category: CategoryName;
  slug: string;
  preview: ShowcasePreview;
  body: ShowcaseBody;
  metadata: {
    title: string;
    description: string;
  }
}

const showcases: Showcase[] = [
  {
    slug: "stripe-integration",
    category: CategoryName.systemsIntegrations,
    preview: {
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
          url: "https://blog.widefix.com/reconcile-app-users-against-stripe-and-prevent-financial-losses/"
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
      solution: "Prevent account sharing",
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
          url: "https://blog.widefix.com/prevent-account-sharing-with-mfa/"
        }
      ]
    },
    metadata: {
      title: "Prevent account sharing - WideFix",
      description: "See how we added Multi-Factor Authentication (MFA) and limitted login sessions per user and prevented 5% monthly financial losses."
    }
  }
];

export default showcases;
