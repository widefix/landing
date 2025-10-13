import Image from 'next/image'
import Link from 'next/link'

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
  buttonColor,
  companyImageSrc
} : ShowcaseItemProps) {
  return (
    <div className="showcase-item-content">
      <div className="showcase-item-main">
        <h3 style={{ marginBottom: '8px' }} className='company-name'>{title}</h3>
        <p>{results}</p>
      </div>
      <div className="showcase-item-bottom">
        <div>
          <button type="button" className={`tag ${buttonColor}`}>{solution}</button>
        </div>
        <div className="slide-footer">
          <div className="client-img">
            <Link href={`/showcases/${slug}`}>
              <Image src={companyImageSrc} alt="Client" width="104" height="25"/>
            </Link>
          </div>
          <Link href={`/showcases/${slug}`} className="slide-learn-more">More about</Link>
        </div>
      </div>
    </div>
  )
}
