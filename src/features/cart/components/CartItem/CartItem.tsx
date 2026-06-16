import React from 'react';
import './CartItem.scss';
import type { Product } from '@/features/products/types/Product.ts';
import { BASE_URL } from '@/shared/api/endpoints';

type ProductCart = Product & { quantity: string | number };

interface CartItemProps {
  item: ProductCart;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
}) => {
  const { id, name, image, price, quantity } = item;

  return (
    <article
      className="cart-item"
      aria-label={`Cart item: ${name}`}
    >
      <button
        type="button"
        className="cart-item__remove"
        onClick={() => onRemove(id)}
        aria-label={`Remove ${name} from cart`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 4L4 12M4 4l8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="cart-item__img-wrapper">
        <img
          src={BASE_URL + '/' + image}
          alt=""
          className="cart-item__img"
        />
      </div>
      <div className="cart-item__info">
        <h3 className="cart-item__name">{name}</h3>
      </div>
      <div className="cart-item__quantity">
        <button
          type="button"
          className="cart-item__qty-btn"
          disabled={Number(quantity) <= 1}
          onClick={() => onUpdateQuantity(id, Number(quantity) - 1)}
          aria-label="Decrease quantity"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 8h8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <span
          className="cart-item__qty-value"
          aria-live="polite"
        >
          {quantity}
        </span>

        <button
          type="button"
          className="cart-item__qty-btn"
          onClick={() => onUpdateQuantity(id, Number(quantity) + 1)}
          aria-label="Increase quantity"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 4v8M4 8h8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="cart-item__price-wrapper">
        <span className="cart-item__price">${price * Number(quantity)}</span>
      </div>
    </article>
  );
};
