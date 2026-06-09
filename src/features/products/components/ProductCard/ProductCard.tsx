import React from 'react';
import './ProductCard.scss';
import { Button } from '@base-ui/react';
import { Icon } from '@/shared/components/Icon';
import type { Product } from '../../types/Product';
import { BASE_URL } from '@/shared/api/endpoints';
import classNames from 'classnames';

type Props = {
  product: Product;
}

import { useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';

type ProductId = string | number;

interface UseCartResult {
  cart: ProductId[];
  saveCart: (updatedCart: ProductId[]) => void;
}

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener('cart-updated', callback);
  return () => window.removeEventListener('cart-updated', callback);
};

const getSnapshot = (): string => {
  return localStorage.getItem('cart') || '[]';
};

const useCart = (): UseCartResult => {
  const cartString = useSyncExternalStore(subscribe, getSnapshot);
  
  const cart: ProductId[] = JSON.parse(cartString);

  const saveCart = (updatedCart: ProductId[]): void => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  return { cart, saveCart };
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cart, saveCart } = useCart();
  
  if (!product) return;
  
  const isProductAdded = cart.includes(product.id);

  const handleAddToCart = () => {
    if (isProductAdded) return;

    const updated = [...cart, product.id];
    saveCart(updated); 
  };
  
  return (
    <article className="product__card">

      <Link to={`product/${product.itemId}`}>
        <img src={`${BASE_URL}/${product.image}`} alt={`${product.name} (iMT9G2FS/A)`} className="product__card__image" />
      </Link>
      
      <Link to={`product/${product.itemId}`}>
        <h3 className="product__card__title">{`${product.name} (iMT9G2FS/A)`}</h3>
      </Link>
      
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
        <Button className={classNames('button product__card__button', {
          'is-active': isProductAdded
        })}
          onClick={handleAddToCart}
        >
          Add to cart</Button>
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
