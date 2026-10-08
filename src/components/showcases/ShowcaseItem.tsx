import Image from 'next/image'
import Link from 'next/link'
import { showcasePositioning } from '@/lib/showcasePositioning'

type ShowcaseItemProps = {
  slug: string;
  companyName: string;
  companyImageSrc: string;
  solution: string;
  results: string;
  buttonColor: string;
  title?: string;
}

export default function ShowcaseItem({
  title,
  slug,
  solution,
  results,
  companyName,
  companyImageSrc
} : ShowcaseItemProps) {
  return (
    <div className="showcase-item-content">
      <div className="showcase-item-main">
        <h3 className="company-name"><Link href={`/showcases/${slug}`}>{title}</Link></h3>
        <p>{results}</p>
      </div>
      <div className="showcase-item-bottom">
        <div>
          <span className="tag">{showcasePositioning[slug]?.cardLabel || solution}</span>
        </div>
        <div className="slide-footer">
          <div className="client-img">
            <Link href={`/showcases/${slug}`}>
              <Image src={companyImageSrc} alt={companyName} width="104" height="25"/>
            </Link>
          </div>
          <Link href={`/showcases/${slug}`} className="slide-learn-more" aria-label={`Read case study: ${title}`}>Read case study <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </div>
  )
}
