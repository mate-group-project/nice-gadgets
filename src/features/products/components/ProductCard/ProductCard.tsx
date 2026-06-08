import React from 'react';
import './ProductCard.scss';
import { Button } from '@base-ui/react';
import { Icon } from '@/shared/components/Icon';

export const ProductCard: React.FC = () => {
  return (
    <article className="product__card">

      <img src="src/assets/img/category-phones.png" alt="Apple iPhone Xs 64GB Silver (iMT9G2FS/A)" className="product__card__image" />
      
      <h3 className="product__card__title">Apple iPhone Xs 64GB Silver (iMT9G2FS/A)</h3>
      
      <p className="product__card__price">
        <span className="product__card__price-current">$799</span>
        <span className="product__card__price-old">$899</span>
      </p>

      <section className="product__card__specs">
        <p className="product__card__spec">
          <span className="product__card__spec-label">Screen</span>
          <span className="product__card__spec-value">5.8” OLED</span>
        </p>

        <p className="product__card__spec">
          <span className="product__card__spec-label">Capacity</span>
          <span className="product__card__spec-value">64 GB</span>
        </p>

        <p className="product__card__spec">
          <span className="product__card__spec-label">RAM</span>
          <span className="product__card__spec-value">4 GB</span>
        </p>
      </section>

      <div className="product__card__actions">
          <Button
            className="button product__card__button"
          >
            Add to cart
          </Button>
          <Button
          className="button__icon button--lg product__card__icon-button"
          onClick={() => {}}
        >
          <Icon name="heart" />
        </Button>
        </div>

    </article>
  );
};
