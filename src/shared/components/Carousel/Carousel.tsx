import React from 'react';
import './Carousel.scss';

import { Icon } from '../Icon';
import heroBannerLg from './../../../assets/img/hero-banner-lg.png';
import heroBannerMd from './../../../assets/img/hero-banner-md.png';
import heroBannerSm from './../../../assets/img/hero-banner-sm.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

// The slider looks really bad when it changes 'cause of the buttons. We can change the effect in the future (Maybe to fade).

export const Carousel: React.FC = () => {
  return (
    <div className="carousel carousel-hero">
      <div className="swiper_wrapper">
        <button
          className="button__icon carousel__btn carousel__btn--prev"
        >
          <Icon name="chevronLeft" />
        </button>

        <button
          className="button__icon carousel__btn carousel__btn--next"
        >
          <Icon name="chevronRight" />
        </button>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            prevEl: '.carousel-hero .carousel__btn--prev',
            nextEl: '.carousel-hero .carousel__btn--next',
          }}
          pagination={{
            el: '.carousel__pagination',
            clickable: true,
          }}
          scrollbar={{ draggable: true }}
        >
          <SwiperSlide>

            {/* We will change it for routes later */}

            <picture>
              <source media="(min-width: 1200px)" srcSet={heroBannerLg} />
              <source media="(min-width: 640px)" srcSet={heroBannerMd} />

              <img src={heroBannerSm} alt="Hero banner" />
            </picture>
          </SwiperSlide>

          <SwiperSlide>
            <picture>
              <source media="(min-width: 1200px)" srcSet={heroBannerLg} />
              <source media="(min-width: 640px)" srcSet={heroBannerMd} />

              <img src={heroBannerSm} alt="Hero banner" />
            </picture>
          </SwiperSlide>

          <SwiperSlide>
            <picture>
              <source media="(min-width: 1200px)" srcSet={heroBannerLg} />
              <source media="(min-width: 640px)" srcSet={heroBannerMd} />

              <img src={heroBannerSm} alt="Hero banner" />
            </picture>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="carousel__pagination" />
    </div>
  );
};
