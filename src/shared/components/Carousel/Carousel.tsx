import React from 'react';
import './Carousel.scss';

import { Icon } from '../Icon';
import heroBanner from './../../../assets/img/Screenshot_3.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

export const Carousel: React.FC = () => {
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
          <SwiperSlide>
            <div className="carousel__slide">
              <div className="carousel__content">
                <h2 className="carousel__title">
                  <span className="gradient">Now available in our store</span>
                  <span className="emoji">👌</span>
                </h2>
                <p className="carousel__text">Be the first!</p>
                <button
                  className="button carousel__button"
                  style={{ width: '180px' }}
                  onClick={() => navigate('/catalog?category=phones')}
                >
                  Order now
                </button>
              </div>

              <div className="carousel__image">
                <img
                  src={heroBanner}
                  alt="hero Banner"
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="carousel__slide">
              <div className="carousel__content">
                <h2 className="carousel__title">
                  <span className="gradient">Now available in our store</span>
                  <span className="emoji">👌</span>
                </h2>
                <p className="carousel__text">Be the first!</p>
                <button
                  className="button carousel__button"
                  style={{ width: '180px' }}
                >
                  Order now
                </button>
              </div>

              <div className="carousel__image">
                <img
                  src={heroBanner}
                  alt="hero Banner"
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="carousel__slide">
              <div className="carousel__content">
                <h2 className="carousel__title">
                  <span className="gradient">Now available in our store</span>
                  <span className="emoji">👌</span>
                </h2>
                <p className="carousel__text">Be the first!</p>
                <button
                  className="button carousel__button"
                  style={{ width: '180px' }}
                >
                  Order now
                </button>
              </div>

              <div className="carousel__image">
                <img
                  src={heroBanner}
                  alt="hero Banner"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="carousel__pagination" />
    </div>
  );
};
