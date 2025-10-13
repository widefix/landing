import { CategoryName } from "@/categories";
import { ResultBoxColor, Showcase, SwiperSlideColor } from "@/enums";

const result: Showcase = {
  slug: "seo-optimization",
  category: CategoryName.optimisations,
  preview: {
    companyName: "Worship Online",
    title: "SEO Optimization",
    solution: "Optimization",
    results: "Our SEO optimization was a game-changer for the client.",
    wrapperColor: SwiperSlideColor.blue,
    buttonColor: SwiperSlideColor.blue,
    companyImageSrc: "/img/showcases/clients/wo.svg",
    url: ''
  },
  body: {
    bannerTopTitle: (
      <h1>
        SEO optimization as a game-<span className="oval">changer</span>
      </h1>
    ),
    bannerTopImageSrc: "/img/showcases/seo-results.png",
    bannerTopImageWebpSrc: "/img/showcases/seo-results.webp",
    description: "SEO optimization was a game-changer for the client",
    descriptionText: (
      <p>
        Our SEO optimization was a game-changer for the client. It resulted in a <strong>4000% increase in organic traffic</strong> and a <strong>300% increase in conversions</strong>.
      </p>
    ),
    detailsTitle: 'SEO Optimization',
    detailsText: (
      <p>
        Our SEO optimization was a game-changer for the client. It resulted in a <strong>4000% increase in organic traffic</strong> and a <strong>300% increase in conversions</strong>. We started the optimization process in January 2023 and by the end of the year, the client was seeing dramatic results.
      </p>
    ),
    detailsImageSrc: "/img/showcases/case/seo-problem.svg",
    bannerProblemWebp: "/img/showcases/case/seo-wo.webp",
    bannerProblemPng: "/img/showcases/case/seo-wo.png",
    problemText: (
      <p>
        The client had a great product but was struggling to attract new customers. Their website was not ranking well in search engine results, and they were missing out on a lot of potential business.
      </p>
    ),
    solutionFirstText: (
      <p>
        We conducted a thorough SEO audit of the client&apos;s website and identified a number of issues that were holding them back. We then implemented a series of changes to improve their search engine rankings and attract more organic traffic.
      </p>
    ),
    solutionSecondText: (
      <p>
        Year-to-year results were dramatic. The client saw a <strong>4000% increase in organic traffic</strong> and a <strong>300% increase in conversions</strong>. They were able to attract new customers and grow their business like never before.
      </p>
    ),
    bannerSolutionWebp: "/img/showcases/seo-results.png",
    bannerSolutionPng: "/img/showcases/seo-results.png",
    resultBoxes: [
      {
        color: ResultBoxColor.lightBlue,
        imageSrc: "/img/showcases/case/icons/stock.svg",
        message: "Organic traffic increase",
        number: "+4000%"
      },
      {
        color: ResultBoxColor.lightGreen,
        imageSrc: "/img/showcases/case/icons/money.svg",
        message: "Conversions increase",
        number: "+300%"
      },
      {
        color: ResultBoxColor.darkBlue,
        imageSrc: "/img/showcases/case/icons/stock.svg",
        message: "Position in search results",
        number: "+40%"
      },
      {
        color: ResultBoxColor.green,
        imageSrc: "/img/showcases/case/icons/user.svg",
        message: "Impressions increase",
        number: "+1000%"
      }
    ],
    resultText: (
      <p>
        Our SEO optimization was a game-changer for the client. It resulted in a <strong>4000% increase in organic traffic</strong> and a <strong>300% increase in conversions</strong>.
      </p>
    ),
    helpTitle: "Need help with SEO optimization?",
    related: [
      {
        companyName: "Worship Online",
        solution: "Learn how to improve SEO",
        results: "Recommendations on optimizing Web apps for SEO.",
        wrapperColor: SwiperSlideColor.yellow,
        buttonColor: SwiperSlideColor.yellow,
        companyImageSrc: "/img/showcases/clients/wo.svg",
        url: "https://widefix.com/blog/improve-nextjs-application-performance/"
      }
    ]
  },
  metadata: {
    title: "SEO Optimization - WideFix",
    description: "See how our SEO optimization was a game-changer for the client, resulting in a 4000% increase in organic traffic and a 300% increase in conversions."
  }
}

export default result;
