import Image from 'next/image'
import Link from 'next/link'

type ShowcaseItemProps = {
  title: string;
  imageSrc: string;
  buttonLink: string;
  companyName: string;
  companyImageSrc: string;
  solution: string;
  results: string;
  wrapperColor: string;
  buttonColor: string;
}

export default function ShowcaseItem({
  title,
  imageSrc,
  companyName,
  buttonLink,
  solution,
  results,
  wrapperColor,
  buttonColor,
  companyImageSrc
} : ShowcaseItemProps) {
  return (
    <article className="accordion expanded">
      <div className="accordion-title">
        <div className="title-with-icon">
          <Image src={imageSrc} alt={title} width="65" height="65" />
          <h3 className="h3">{title}</h3>
        </div>
        <div className="accordion-actions">
          <button type="button" className="accordion-button" aria-label="Filter">
            <Image src="/img/showcases/acc-filter.svg" alt="Filter" width="50" height="51" />
          </button>
          <button type="button" className="accordion-button accordion-action" aria-expanded="false" aria-label="Expand section"></button>
        </div>
      </div>
      <div className="accordion-content">
        <div className={`swiper-wrapper ${wrapperColor}`}>
          <h4>{companyName}:</h4>
          <h4>{solution}</h4>
          <p>{results}</p>
          <div>
            <button type="button" className={`tag ${buttonColor}`}>{results}</button>
          </div>
          <div className="slide-footer">
            <div className="client-img">
              <Link href={buttonLink}><Image src={companyImageSrc} alt="Client" width="104" height="25"/></Link>
            </div>
            <Link href={buttonLink} className="slide-learn-more">Learn more</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
