import Image from 'next/image'
import Link from 'next/link'

type ShowcaseItemProps = {
  slug: string;
  companyName: string;
  companyImageSrc: string;
  solution: string;
  results: string;
  buttonColor: string;
}

export default function ShowcaseItem({
  companyName,
  slug,
  solution,
  results,
  buttonColor,
  companyImageSrc
} : ShowcaseItemProps) {
  return (
    <>
      <h4 className='company-name'>{companyName}:</h4>
      <h4>{solution}</h4>
      <p>{results}</p>
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
    </>
  )
}
