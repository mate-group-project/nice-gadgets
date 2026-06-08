import { ProductCard } from '@/features/products/components/ProductCard/ProductCard';
import * as React from 'react';
import './ProductPage.scss';
import { Button } from '@base-ui/react';

import mainPhoto from '@/assets/img/category-phones.png';
import thumb from '@/assets/img/category-slide-phone.png';
import { Icon } from '@/shared/components/Icon';

export const ProductPage: React.FC = () => {
  return (
    <section className="product-page">
      <div className="product-page__container">

        <h1 className="product-page__title">
          Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
        </h1>

        <div className="product-page__content">
          <div className="product-page__main-info">
            <div className="product-page__gallery gallery">

              <div className="gallery__thumbnails">
                <a href="#" className="gallery__thumb">
                  <img src={thumb} alt="Thumbnail 1" />
                </a>
                <a href="#" className="gallery__thumb">
                  <img src={thumb} alt="Thumbnail 2" />
                </a>
                <a href="#" className="gallery__thumb">
                  <img src={thumb} alt="Thumbnail 3" />
                </a>
                <a href="#" className="gallery__thumb">
                  <img src={thumb} alt="Thumbnail 4" />
                </a>
                <a href="#" className="gallery__thumb">
                  <img src={thumb} alt="Thumbnail 5" />
                </a>
              </div>

              <div className="gallery__main">
                <img className="gallery__main-image" src={mainPhoto} alt="Apple iPhone 11 Pro Max" />
              </div>

            </div>

            <div className="product-page__actions product-actions">
              <div className="product-actions__content">
                <div className="product-actions__selection">
                  <div className="product-actions__selection-header">
                    <span className="product-actions__selection-title">Available colors</span>
                    <span className="product-actions__id">ID: 802390</span>
                  </div>
                  <div className="product-actions__color-options">
                    <a href="#" className="product-actions__color-option product-actions__color-option--pink" title="Pink"></a>
                    <a href="#" className="product-actions__color-option product-actions__color-option--dark-green" title="Dark Green"></a>
                    <a href="#" className="product-actions__color-option product-actions__color-option--dark-grey" title="Dark Grey"></a>
                    <a href="#" className="product-actions__color-option product-actions__color-option--light-grey" title="Light Grey"></a>
                  </div>
                </div>

                <div className="product-actions__selection">
                  <span className="product-actions__selection-title">Select capacity</span>

                  <div className="product-actions__capacity-options">
                    <a
                      href="#"
                      className="product-actions__capacity-option capacity-btn capacity-btn--active"
                    >
                      64 GB
                    </a>

                    <a
                      href="#"
                      className="product-actions__capacity-option capacity-btn"
                    >
                      256 GB
                    </a>

                    <a
                      href="#"
                      className="product-actions__capacity-option capacity-btn"
                    >
                      512 GB
                    </a>
                  </div>
                </div>

                <div className="product-actions__purchase purchase">
                  <div className="purchase__price">
                    <span className="purchase__price-current">$799</span>
                    <span className="purchase__price-old">$1199</span>
                  </div>

                  <div className="purchase__controls">
                    <Button
                      className="button"
                      style={{ width: '260px' }}
                    >
                      Add to cart
                    </Button>

                    <Button
                      className="button__icon button--lg"
                      onClick={() => { }}
                    >
                      <Icon name="heart" />
                    </Button>
                  </div>
                </div>

                <div className="product-actions__short-specs short-specs">
                  <ul className="short-specs__list">
                    <li className="short-specs__item">
                      <span className="short-specs__name">Screen</span>
                      <span className="short-specs__value">6.5” OLED</span>
                    </li>
                    <li className="short-specs__item">
                      <span className="short-specs__name">Resolution</span>
                      <span className="short-specs__value">2688x1242</span>
                    </li>
                    <li className="short-specs__item">
                      <span className="short-specs__name">Processor</span>
                      <span className="short-specs__value">Apple A12 Bionic</span>
                    </li>
                    <li className="short-specs__item">
                      <span className="short-specs__name">RAM</span>
                      <span className="short-specs__value">3 GB</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="product-page__details">
            <div className="product-page__about about">
              <h2 className="about__title">About</h2>

              <div className="about__content">
                <article className="about__item">
                  <h3 className="about__subtitle">And then there was Pro</h3>
                  <p className="about__text about__history-text">
                    A transformative triple‑camera system that adds tons of capability without complexity.
                  </p>
                  <p className="about__text">
                    An unprecedented leap in battery life. And a mind‑blowing chip that doubles down on machine learning
                    and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.
                  </p>
                </article>

                <article className="about__item">
                  <h3 className="about__subtitle">Camera</h3>
                  <p className="about__text">
                    Meet the first triple‑camera system to combine cutting‑edge technology with the legendary simplicity of iPhone.
                    Capture up to four times more scene. Get beautiful images in drastically lower light.
                    Shoot the highest‑quality video in a smartphone — then edit with the same tools you love for photos.
                    You’ve never shot with anything like it.
                  </p>
                </article>

                <article className="about__item">
                  <h3 className="about__subtitle">Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.</h3>
                  <p className="about__text">
                    iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion.
                    Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization
                    — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.
                  </p>
                </article>
              </div>
            </div>

            <div className="product-page__tech-specs tech-specs">
              <h2 className="tech-specs__title">Tech specs</h2>
              <ul className="tech-specs__list">
                <li className="tech-specs__item">
                  <span className="tech-specs__name">Screen</span>
                  <span className="tech-specs__value">6.5” OLED</span>
                </li>
                <li className="tech-specs__item">
                  <span className="tech-specs__name">Resolution</span>
                  <span className="tech-specs__value">2688x1242</span>
                </li>
                <li className="tech-specs__item">
                  <span className="tech-specs__name">Processor</span>
                  <span className="tech-specs__value">Apple A12 Bionic</span>
                </li>
                <li className="tech-specs__item">
                  <span className="tech-specs__name">RAM</span>
                  <span className="tech-specs__value">3 GB</span>
                </li>
                <li className="tech-specs__item">
                  <span className="tech-specs__name">Built in memory</span>
                  <span className="tech-specs__value">64 GB</span>
                </li>
                <li className="tech-specs__item">
                  <span className="tech-specs__name">Camera</span>
                  <span className="tech-specs__value">12 Mp + 12 Mp + 12 Mp (Triple)</span>
                </li>
                <li className="tech-specs__item">
                  <span className="tech-specs__name">Zoom</span>
                  <span className="tech-specs__value">Optical, 2x</span>
                </li>
                <li className="tech-specs__item">
                  <span className="tech-specs__name">Cell</span>
                  <span className="tech-specs__value">GSM, LTE, UMTS</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="product-page__recommendations recommendations">

          <div className="recommendations__header">
            <h2 className="recommendations__title">You may also like</h2>

            <div className="recommendations__controls">
              <button className="recommendations__slider-btn recommendations__slider-btn--prev">
                {'<'}
              </button>
              <button className="recommendations__slider-btn recommendations__slider-btn--next">
                {'>'}
              </button>
            </div>
          </div>

          <div className="recommendations__list">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>

        </div>
      </div>

    </section>
  );
};