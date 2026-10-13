import Image from 'next/image';
import { CategoryName } from "@/categories";
import { ResultBoxColor, Showcase, SwiperSlideColor } from "@/enums";

const result: Showcase = {
  slug: "seo-optimization",
  category: CategoryName.optimisations,
  preview: {
    companyName: "Worship Online",
    title: "SEO Optimization",
    solution: "SEO optimization",
    results: "Improved search visibility through gradual changes to the existing Rails product; see the Search Console evidence and comparison limits.",
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
        <p>The case includes Search Console screenshots showing search activity before and after the work. Their date ranges differ, so the totals should not be treated as a like-for-like growth measurement.</p>
      </>
    ),
    detailsTitle: 'Legacy application improvements for SEO',
    detailsText: (
      <div className="seo-evidence" id="search-console-evidence">
        <p>Work started in January 2023. The original case described a roughly 4000% increase in organic traffic, but the published screenshots do not establish that percentage over equivalent periods.</p>
        <h3>What the Search Console screenshots show</h3>
        <div className="seo-evidence-table"><table>
          <thead><tr><th>Metric</th><th>Earlier screenshot</th><th>Later screenshot</th></tr></thead>
          <tbody>
            <tr><th>Dates visible on chart axis</th><td>June 2022–September 2023</td><td>March 2024–March 2025</td></tr>
            <tr><th>Total clicks</th><td>26.1K</td><td>1.02M</td></tr>
            <tr><th>Total impressions</th><td>3.34M</td><td>37.6M</td></tr>
            <tr><th>Average CTR</th><td>0.8%</td><td>2.7%</td></tr>
            <tr><th>Average position</th><td>17.9</td><td>12.1</td></tr>
          </tbody>
        </table></div>
        <figure><Image width={2346} height={928} src="/img/showcases/case/seo-wo.png" alt="Earlier Search Console screenshot: 26.1K clicks, 3.34M impressions, 0.8% CTR, average position 17.9" loading="lazy" /><figcaption>Earlier snapshot. Search Console warns that results may be partial when filters are applied.</figcaption></figure>
        <figure><Image width={2364} height={850} src="/img/showcases/seo-results.png" alt="Later Search Console screenshot: 1.02M clicks, 37.6M impressions, 2.7% CTR, average position 12.1" loading="lazy" /><figcaption>Later snapshot. The visible chart covers a different date range.</figcaption></figure>
        <p>The images omit the complete date selectors, property name, and filter settings. Clicks are search-result clicks, not sessions or conversions. Raw exports for matching periods and filters are needed to substantiate a growth percentage or attribute the change to this work. The screenshots do not document the previously stated conversion uplift.</p>
      </div>
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
        After the redesign, we introduced SEO improvements gradually, evolving the Ruby on Rails application step by step to support better search visibility and conversion. The work started in January 2023. The published Search Console snapshots show increased search activity, with the period and filter limitations described above. The business gained new customers through improvements to its existing product.
      </p>
    ),
    bannerSolutionWebp: "/img/showcases/seo-results.png",
    bannerSolutionPng: "/img/showcases/seo-results.png",
    resultBoxes: [
      { color: ResultBoxColor.lightBlue, imageSrc: "/img/showcases/case/icons/stock.svg", message: "Clicks · earlier snapshot", number: "26.1K" },
      { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/stock.svg", message: "Clicks · later snapshot", number: "1.02M" },
      { color: ResultBoxColor.darkBlue, imageSrc: "/img/showcases/case/icons/stock.svg", message: "Impressions · earlier snapshot", number: "3.34M" },
      { color: ResultBoxColor.green, imageSrc: "/img/showcases/case/icons/stock.svg", message: "Impressions · later snapshot", number: "37.6M" }
    ],
    resultText: (
      <p>These are totals displayed in two Search Console screenshots, not equivalent-period growth rates. See the evidence above for dates and comparison limitations.</p>
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
    description: "Explore gradual SEO improvements to Worship Online’s Rails application, with Search Console screenshots, source metrics, and comparison limitations."
  }
}

export default result;
