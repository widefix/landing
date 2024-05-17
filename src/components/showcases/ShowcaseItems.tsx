import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ShowcaseItem from './ShowcaseItem';

interface ShowcaseItemProps {
  id: number,
  slug: string,
  preview: {
    companyName: string,
    solution: string,
    results: string,
    wrapperColor: string,
    buttonColor: string,
    companyImageSrc: string,
    url: string
  }
}
  

interface ShowcaseItemsProps {
  title: string;
  imageSrc: string;
  showcases: ShowcaseItemProps[];
}

export default function ShowcaseItems({
  title,
  imageSrc,
  showcases
} : ShowcaseItemsProps) {
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
        <Swiper
          modules={[Navigation]}
          spaceBetween={39}
          slidesPerView={'auto'}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className={'case-swiper'}
        >
          {showcases.map(showcase => (
            <SwiperSlide key={`slide${showcase.id}`} className={`${showcase.preview.wrapperColor}`}>
              <ShowcaseItem 
                key={showcase.id}
                companyName={showcase.preview.companyName}
                slug={showcase.slug}
                solution={showcase.preview.solution}
                results={showcase.preview.results}
                buttonColor={showcase.preview.buttonColor}
                companyImageSrc={showcase.preview.companyImageSrc}
              />
            </SwiperSlide>
          ))}
          <div className="swiper-prev-next">
            <button type="button" className="swiper-button-prev" aria-label="Previous slide" />
            <button type="button" className="swiper-button-next" aria-label="Next slide" />
          </div>
        </Swiper>
      </div>
    </article>
  )
}
