import React from 'react';
import './CartSummary.scss';

interface CartSummaryProps {
  totalPrice: number;
  totalItems: number;
  onCheckout: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  totalPrice,
  totalItems,
  onCheckout,
}) => {
  return (
    <section
      className="cart-summary"
      aria-labelledby="summary-heading"
    >
      <h2
        id="summary-heading"
        className="is-sr-only"
      >
        Order Summary
      </h2>

      <div className="cart-summary__price-container">
        <span className="cart-summary__total-price">${totalPrice}</span>
        <span className="cart-summary__count">
          Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
      </div>

      <hr
        className="cart-summary__divider"
        aria-hidden="true"
      />

      <button
        type="button"
        className="cart-summary__checkout-btn"
        onClick={onCheckout}
      >
        Checkout
      </button>
    </section>
  );
};
