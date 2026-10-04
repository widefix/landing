import type { CSSProperties } from 'react';
import Image from 'next/image';
import ShowcaseItem from './ShowcaseItem';
import showcases from '@/showcases';

interface ShowcaseItemsProps {
  name: string;
  title: string;
  imageSrc: string;
}

export default function ShowcaseItems({ name, title, imageSrc }: ShowcaseItemsProps) {
  const currentShowcases = showcases.filter(showcase => showcase.category === name);

  return (
    <article className="showcase-category">
      <div className="title-with-icon">
        <Image src={imageSrc} alt="" width={65} height={65} />
        <h3 className="h3">{title}</h3>
      </div>
      <div className="case-swiper showcase-card-grid">
        {currentShowcases.map(showcase => (
          <div key={showcase.slug} className={`swiper-slide ${showcase.preview.wrapperColor}`}
            style={{ '--showcase-art': `url("/img/showcases/cards/${showcase.slug}.svg?v=3")` } as CSSProperties}>
            <ShowcaseItem
              title={showcase.preview.title}
              companyName={showcase.preview.companyName}
              slug={showcase.slug}
              solution={showcase.preview.solution}
              results={showcase.preview.results}
              buttonColor={showcase.preview.buttonColor}
              companyImageSrc={showcase.preview.companyImageSrc}
            />
          </div>
        ))}
      </div>
    </article>
  );
}
