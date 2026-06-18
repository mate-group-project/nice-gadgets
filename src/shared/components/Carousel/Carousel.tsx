import React from 'react';
import './Carousel.scss';

import { Icon } from '../Icon';
import { BASE_URL } from '@/shared/api/endpoints';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
import type { SlideLang } from '@/shared/hooks/useHomeData.ts';

type Props = {
  slides: SlideLang[];
  lang: string;
};

export const Carousel: React.FC<Props> = ({ slides, lang }) => {
  const navigate = useNavigate();

  return (
    <div className="carousel carousel-hero">
      <div className="swiper_wrapper">
        <button className="button__icon carousel__btn carousel__btn--prev">
          <Icon name="chevronLeft" />
        </button>

        <button className="button__icon carousel__btn carousel__btn--next">
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
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="carousel__slide">
                <div className="carousel__content">
                  <h2 className="carousel__title">
                    <span className="gradient">
                      {lang === 'en' ? slide.title.en : slide.title.uk}
                    </span>
                    <span className="emoji">👌</span>
                  </h2>
                  <p className="carousel__text">
                    {lang === 'en' ? slide.text.en : slide.text.uk}
                  </p>
                  <button
                    className="button carousel__button"
                    style={{ width: '180px' }}
                    onClick={() => navigate('/catalog')}
                  >
                    {lang === 'en' ? slide.button.en : slide.button.uk}
                  </button>
                </div>

                <div className="carousel__image">
                  <video
                    src={`${BASE_URL}${slide.video}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="carousel__pagination" />
    </div>
  );
};
