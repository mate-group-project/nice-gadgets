import React from 'react';
import './ProductCard.scss';
import { Button } from '@base-ui/react';
import { Icon } from '@/shared/components/Icon';
import type { Product } from '../../types/Product';

type Props = {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <article className="product__card">

      <img src={product.image} alt={`${product.name} (iMT9G2FS/A)`} className="product__card__image" />
      
      <h3 className="product__card__title">{`${product.name} (iMT9G2FS/A)`}</h3>
      
      <p className="product__card__price">
        <span className="product__card__price-current">{`$${product.price}`}</span>
        <span className="product__card__price-old">{`$${product.fullPrice}`}</span>
      </p>

      <section className="product__card__specs">
        <p className="product__card__spec">
          <span className="product__card__spec-label">Screen</span>
          <span className="product__card__spec-value">{product.screen}</span>
        </p>

        <p className="product__card__spec">
          <span className="product__card__spec-label">Capacity</span>
          <span className="product__card__spec-value">{product.capacity}</span>
        </p>

        <p className="product__card__spec">
          <span className="product__card__spec-label">RAM</span>
          <span className="product__card__spec-value">{product.ram}</span>
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
