import React from 'react';
import type { CartItemType } from '../../types';
import './CartItem.scss';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
}) => {
  const { id, name, imageUrl, price, quantity } = item;

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
          src={imageUrl}
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
          disabled={quantity <= 1}
          onClick={() => onUpdateQuantity(id, quantity - 1)}
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
          onClick={() => onUpdateQuantity(id, quantity + 1)}
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
        <span className="cart-item__price">${price * quantity}</span>
      </div>
    </article>
  );
};
