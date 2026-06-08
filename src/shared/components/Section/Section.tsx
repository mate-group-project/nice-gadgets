import React from 'react';
import './Section.scss';
import { Icon } from '../Icon';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface SectionProps {
  title?: string;
  isSlide?: boolean;
  children?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title = 'Some title',
  isSlide = false,
  children,
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <section className="section section-products">
      <div className="section__header">
        <h2 className="section__title">{title}</h2>

        {isSlide && (
          <div className="section__buttons">
            <button className="button__icon carousel__btn carousel__btn--prev">
              <Icon name="chevronLeft" />
            </button>

            <button className="button__icon carousel__btn carousel__btn--next">
              <Icon name="chevronRight" />
            </button>
          </div>
        )}
      </div>

      {isSlide ? (
        <Swiper 
          spaceBetween={16}
          modules={[Navigation]}
          navigation={{
            prevEl: '.section-products .carousel__btn--prev',
            nextEl: '.section-products .carousel__btn--next',
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
            },
            640: {
              slidesPerView: 2.2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {childrenArray.map((child, index) => (
            <SwiperSlide key={index}>{child}</SwiperSlide>
          ))}
        </Swiper>
      ) : (
        children
      )}
    </section>
  );
};
