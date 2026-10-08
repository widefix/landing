import { CategoryName } from "@/categories";
import { ResultBoxColor, Showcase, SwiperSlideColor } from "@/enums";

const result: Showcase = {
  slug: "seo-optimization",
  category: CategoryName.optimisations,
  preview: {
    companyName: "Worship Online",
    title: "SEO Optimization",
    solution: "SEO optimization",
    results: "SEO improvements increased organic traffic by 4000% and conversions by 300% for the existing product.",
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
    description: "Take ownership of the legacy app. Build a path to growth",
    descriptionText: (
      <>
        <p>We inherited WorshipOnline as a legacy Ruby on Rails application from its previous developer and took ownership of improving the existing product. We first redesigned the application, applying system design changes to prepare it for the shift toward better search visibility. Gradual SEO improvements followed the redesign.</p>
        <p>The SEO work resulted in a <strong>4000% increase in organic traffic</strong> and a <strong>300% increase in conversions</strong>, helping the business reach more customers through the product it already had.</p>
      </>
    ),
    detailsTitle: 'Legacy application improvements for SEO',
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
        The client had a great product but was struggling to attract new customers. Their website was not ranking well in search engine results, and they were missing out on potential business. We also had to work with the legacy Ruby on Rails system inherited from the previous developer. The application needed a redesign before we could make the shift toward better search visibility.
      </p>
    ),
    solutionFirstText: (
      <p>
        We reviewed the inherited Ruby on Rails application and first redesigned it, applying system design changes to the existing product. That redesign created the foundation needed for the SEO work. We then conducted an SEO audit to identify what was holding search visibility back.
      </p>
    ),
    solutionSecondText: (
      <p>
        After the redesign, we introduced SEO improvements gradually, evolving the Ruby on Rails application step by step to support better search visibility and conversion. The work started in January 2023; by the end of the year, organic traffic had increased by <strong>4000%</strong> and conversions by <strong>300%</strong>. The business gained new customers through improvements to its existing product.
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
