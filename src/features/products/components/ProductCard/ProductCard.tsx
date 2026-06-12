import React from 'react';
import './ProductCard.scss';
import { Button } from '@base-ui/react';
import { Icon } from '@/shared/components/Icon';
import type { Product } from '../../types/Product';
import { BASE_URL } from '@/shared/api/endpoints';
import classNames from 'classnames';

type Props = {
  product: Product;
};

import { Link } from 'react-router-dom';
import { useCart, useFavorites } from '../../hooks/useLocalStorageList';

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { items: cart, saveItems } = useCart();

  const { items: favorites, saveItems: saveFavorites } = useFavorites();

  const isAdded = cart.includes(product.id);

  const addToCart = () => {
    if (cart.includes(product.id)) return;

    saveItems([...cart, product.id]);
  };

  const isFavorite = favorites.includes(product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      saveFavorites(favorites.filter((id) => id !== product.id));

      return;
    }

    saveFavorites([...favorites, product.id]);
  };

  return (
    <article className="product__card">
      <Link to={`/product/${product.id}`}>
        <img
          src={`${BASE_URL}/${product.image}`}
          alt={product.name}
          className="product__card__image"
        />
      </Link>

      <Link to={`/product/${product.id}`}>
        <h3 className="product__card__title">{product.name}</h3>
      </Link>

      <p className="product__card__price">
        <span className="product__card__price-current">{`$${product.price}`}</span>
        {product.price !== product.fullPrice && (
          <span className="product__card__price-old">{`$${product.fullPrice}`}</span>
        )}
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
          className={classNames('button product__card__button', {
            'is-active': isAdded,
          })}
          onClick={addToCart}
        >
          Add to cart
        </Button>
        <Button
          className="button__icon button--lg product__card__icon-button"
          onClick={toggleFavorite}
        >
          <Icon
            name={isFavorite ? 'heartFilled' : 'heart'}
            className={classNames({ 'text--accent-secondary': isFavorite })}
          />
        </Button>
      </div>
    </article>
  );
};
