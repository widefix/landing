import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import showcases from '@/showcases';
import { relatedServiceLinks } from '@/lib/relatedServiceLinks';
import { showcasePositioning } from '@/lib/showcasePositioning';
import DownloadPDF from '../worshiponline-paperclip-activestorage/DownloadPDF';
import shared from '../worshiponline-paperclip-activestorage/worshiponline.module.scss';
import styles from './showcase.module.scss';

const tmaDecisionCriteria = [
  ['Advanced customization', 2, 5, 'A custom system allows full control over business rules, architecture and integrations.'],
  ['Debugging and support', 2, 5, 'Custom code offers more detailed diagnostics and direct control over fixes.'],
  ['Data consistency', 1, 5, 'A purpose-built workflow can define its own delivery and idempotency guarantees.'],
  ['Time to first results', 5, 2, 'Zapier workflows can launch quickly; custom development takes longer upfront.'],
  ['Data protection and ownership', 2, 5, 'A custom solution keeps the data flow under the product team’s control.'],
  ['Long-run maintenance cost', 2, 4, 'Usage-based automation can grow in cost; custom work has a larger initial investment.'],
  ['Scalability', 2, 5, 'Custom processing can be tuned as event volume and workload grow.'],
  ['Hosting cost', 4, 3, 'Zapier includes hosting; a custom solution needs its own infrastructure.'],
  ['Developer onboarding', 2, 4, 'Custom code in version control is easier to inspect and hand over.'],
  ['Real-time latency', 2, 5, 'Custom processing can avoid the seconds-to-minutes delay of automation workflows.'],
  ['Batch processing and throughput', 1, 5, 'A custom system can batch work, parallelize processing and tune API usage.'],
  ['Monitoring and observability', 2, 5, 'A custom system can integrate the metrics, tracing and dashboards the team needs.'],
  ['Vendor lock-in risk', 1, 5, 'Custom code and open standards offer a more portable path.'],
  ['Integration availability', 5, 3, 'Zapier provides many ready-made connectors; custom integrations require development.'],
  ['Compliance and certifications', 3, 5, 'A custom system can be designed around specific compliance requirements.'],
  ['Error handling and retries', 2, 5, 'Custom workflows can define retry policies, dead-letter handling and alerts.'],
  ['Cost structure', 2, 5, 'Custom development shifts more cost upfront and can lower marginal cost at scale.'],
] as const;

export default function ShowcasePage({ params }: { params: { slug: string } }) {
  const showcase = showcases.find(item => item.slug === params.slug);
  if (!showcase) notFound();
  const { body, preview } = showcase;
  const positioning = showcasePositioning[showcase.slug];
  const articles = (body.related || []).filter(article => article.url);
  const otherShowcases = showcases
    .filter(item => item.slug !== showcase.slug)
    .sort((a, b) => {
      const relevance = (item: typeof showcase) =>
        (item.preview.companyImageSrc === preview.companyImageSrc ? 2 : 0) +
        (item.category === showcase.category ? 1 : 0);
      return relevance(b) - relevance(a);
    }).slice(0, 3);

  return (
    <main className={`${shared.page} ${styles.page}`} data-theme={positioning?.theme || 'green'}>
      <section className={`${shared.hero} ${styles.hero}`}>
        <div className={shared.container}>
          <div className={shared.topline}>
            <Link className={shared.backLink} href="/showcases">All case studies</Link>
            <span className={['shopwired-queue-optimization', 'kajabi-experts-performance'].includes(showcase.slug) ? styles.logoPlate : undefined}>
              <Image src={preview.companyImageSrc} alt={preview.companyName} width={138} height={35} priority />
            </span>
          </div>
          <div className={shared.heroGrid}>
            <div className={shared.heroCopy}>
              <p className={`${shared.eyebrow} ${styles.eyebrow}`}>{preview.companyName} / {positioning?.hook || preview.solution}</p>
              <h1>{positioning?.headline || preview.title || preview.solution}</h1>
              <p className={shared.heroLead}>{preview.results}</p>
              <div className={shared.heroActions}>
                <a href="#results" className={`${shared.primaryLink} ${styles.action}`}>See the business results <span aria-hidden="true">↓</span></a>
                <DownloadPDF filename={`${showcase.slug}.pdf`} />
              </div>
            </div>
            <div className={`${shared.heroVisual} ${styles.heroVisual}`}>
              <Image src={body.bannerTopImageWebpSrc || body.bannerTopImageSrc} alt={`${preview.companyName}: ${preview.title || preview.solution}`} width={960} height={640} priority sizes="(max-width: 860px) 100vw, 52vw" />
            </div>
          </div>
          <div className={shared.factBar}>
            <div><span>Client</span><strong>{preview.companyName}</strong></div>
            <div><span>Work delivered</span><strong>{preview.solution}</strong></div>
            <div><span>Business result</span><strong>{body.resultBoxes[0]?.number} · {body.resultBoxes[0]?.message}</strong></div>
          </div>
        </div>
      </section>

      <nav className={styles.navigation} aria-label="Case study sections" data-pdf-exclude>
        <div className={shared.container}><a href="#what">Overview</a><a href="#problem">Challenge</a><a href="#solution">Delivery</a><a href="#results">Results</a><a href="#help">Discuss your app</a></div>
      </nav>

      <section className={shared.intro} id="what">
        <div className={shared.container}>
          <div className={shared.introHeading}><p className={shared.sectionTag}>THE EXISTING PRODUCT</p><h2>{body.description}</h2></div>
          <div className={shared.introBody}>{body.descriptionText}<p>{positioning?.value}</p></div>
        </div>
      </section>

      <section className={styles.challenge} id="problem">
        <div className={`${shared.container} ${styles.split}`}>
          <div><p className={shared.sectionTag}>THE BUSINESS CHALLENGE</p><h2>{body.detailsTitle}</h2><div className={styles.copy}>{body.detailsText}</div></div>
          <div className={styles.challengePanel}><span className={styles.panelLabel}>What needed to change</span><div className={styles.copy}>{body.problemText}</div><Image src={body.detailsImageSrc} alt={`${preview.solution} for ${preview.companyName}`} width={670} height={325} sizes="(max-width: 860px) 100vw, 45vw" /></div>
        </div>
        {body.bannerProblemPng && <div className={`${shared.container} ${styles.evidence}`}><Image src={body.bannerProblemWebp || body.bannerProblemPng} alt={`${preview.companyName} project context and challenge`} width={1156} height={513} sizes="(max-width: 860px) 100vw, 1160px" /></div>}
      </section>

      <section className={styles.delivery} id="solution">
        <div className={shared.container}>
          <div className={styles.sectionHeading}><p className={shared.sectionTag}>THE WORK WE DELIVERED</p><h2>Improve the product. Keep the business moving</h2></div>
          <ol className={styles.steps}>
            <li><div className={styles.stepHeading}><span>01</span><h3>{positioning?.steps[0] || 'Implement the solution'}</h3></div><div className={styles.copy}>{body.solutionFirstText}</div></li>
            <li><div className={styles.stepHeading}><span>02</span><h3>{positioning?.steps[1] || 'Support the next step'}</h3></div><div className={styles.copy}>{body.solutionSecondText}</div></li>
          </ol>
          {body.bannerSolutionPng && <div className={styles.solutionVisual}><Image src={body.bannerSolutionWebp || body.bannerSolutionPng} alt={`${preview.companyName}: delivered ${preview.solution.toLowerCase()}`} width={960} height={640} sizes="(max-width: 860px) 100vw, 800px" /></div>}
        </div>
      </section>

      {showcase.slug === 'tma-sport-lokkaroom-financial-report' && <section className={styles.decisionMatrixSection} aria-labelledby="decision-matrix-title">
        <div className={shared.container}>
          <p className={shared.sectionTag}>SOLUTION SELECTION</p>
          <div className={styles.decisionMatrixIntro}>
            <h2 id="decision-matrix-title">Zapier or a purpose-built solution?</h2>
            <p>We compared the options across 17 criteria before committing to the reporting workflow. Zapier scored higher for speed to launch and ready-made integrations; a self-made solution scored higher for control, consistency, observability and long-term scale.</p>
          </div>
          <div className={styles.decisionMatrixScroll} role="region" aria-label="Zapier versus self-made solution decision matrix" tabIndex={0}>
            <table className={styles.decisionMatrix}>
              <caption>Scores from the decision matrix: 1 is a lower fit and 5 is a higher fit. <a href="https://gist.github.com/ka8725/242f49a4c82008790533c201c4b3e561" target="_blank" rel="noopener noreferrer">View the source analysis ↗</a></caption>
              <thead><tr><th scope="col">Criterion</th><th scope="col">Zapier</th><th scope="col">Self-made</th><th scope="col">Tradeoff</th></tr></thead>
              <tbody>{tmaDecisionCriteria.map(([criterion, zapier, selfMade, tradeoff]) => <tr key={criterion}>
                <th scope="row">{criterion}</th>
                <td><span className={zapier > selfMade ? styles.decisionWinner : styles.decisionScore} aria-label={`${zapier} out of 5`}>{zapier}</span></td>
                <td><span className={selfMade > zapier ? styles.decisionWinner : styles.decisionScore} aria-label={`${selfMade} out of 5`}>{selfMade}</span></td>
                <td>{tradeoff}</td>
              </tr>)}</tbody>
              <tfoot><tr><th scope="row">Total score across 17 criteria</th><td><strong>40 / 85</strong></td><td><strong>76 / 85</strong></td><td>Self-made leads overall</td></tr></tfoot>
            </table>
          </div>
        </div>
      </section>}

      <section className={styles.results} id="results">
        <div className={shared.container}>
          <p className={shared.sectionTag}>VALUE FOR THE BUSINESS</p><h2>{preview.title || preview.solution}: the results</h2>
          <div className={styles.resultGrid}>{body.resultBoxes.map((box, index) => <article key={index}><Image src={box.imageSrc} alt="" aria-hidden="true" width={40} height={40} /><span>{box.message}</span><strong>{box.number}</strong></article>)}</div>
          <div className={`${styles.copy} ${styles.resultCopy}`}>{body.resultText}</div>
        </div>
      </section>

      {articles.length > 0 && <section className={styles.articles}><div className={shared.container}><p className={shared.sectionTag}>THE ENGINEERING DETAILS</p><h2>More about the work</h2><div className={styles.articleGrid}>{articles.map(article => <a key={article.url} href={article.url} target="_blank" rel="noopener noreferrer"><h3>{article.title || article.solution}</h3><p>{article.results}</p><span>Read the article ↗</span></a>)}</div></div></section>}

      <section className={`${shared.outcome} ${styles.outcome}`} id="help">
        <div className={shared.container}>
          <p className={shared.sectionTag}>WE TAKE OWNERSHIP OF EXISTING RUBY ON RAILS APPLICATIONS</p>
          <h2>{positioning?.help || body.helpTitle}</h2>
          <p>Need someone to take over your Rails app? We maintain, stabilize and improve existing Rails applications, from production issues and upgrades to new features and infrastructure. Keep your product moving without unnecessary rewrites or rebuilding your engineering team.</p>
          {showcase.slug === 'public-api-development' && <p>Looking for a fractional CTO for Rails? Discuss the technical direction, cross-team coordination, and ongoing ownership your application needs.</p>}
          {showcase.slug === 'palladium-rails-upgrade' && <p>If your Rails developer left, we can help you understand the inherited codebase and prioritize an old Rails app rescue, maintenance, and upgrades.</p>}
          <Link href="https://calendly.com/andrei-kaleshka/30min" target="_blank" rel="noopener noreferrer" className={`${shared.outcomeLink} ${styles.action}`}>Discuss your Rails app <span aria-hidden="true">↗</span></Link>
          {(relatedServiceLinks[showcase.slug] || []).map(service => <Link key={service.href} href={service.href} className={styles.serviceLink}>{service.title} →</Link>)}
          <Link href="/ruby-on-rails-application-takeover" className={styles.serviceLink}>Explore existing Rails app takeover <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className={styles.related} id="other"><div className={shared.container}><p className={shared.sectionTag}>MORE EXISTING PRODUCTS IMPROVED</p><h2>Other issues fixed</h2><div className={styles.relatedGrid}>{otherShowcases.map(item => <Link href={`/showcases/${item.slug}`} key={item.slug}><Image src={item.body.detailsImageSrc} alt="" width={396} height={264} sizes="(max-width: 860px) 100vw, 33vw" /><div><span>{item.preview.companyName} / {item.preview.solution}</span><h3>{item.preview.title || item.preview.solution}</h3><p>{item.preview.results}</p><strong>Read case study ↗</strong></div></Link>)}</div></div></section>
    </main>
  );
}
