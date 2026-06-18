import React from 'react';
import './CartSummary.scss';
import { useTranslation } from '@/features/translations/hooks/useTranslation.ts';

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
  const { t } = useTranslation();

  return (
    <section
      className="cart-summary"
      aria-labelledby="summary-heading"
    >
      <h2
        id="summary-heading"
        className="is-sr-only"
      >
        {t('cart.orderSummary')}
      </h2>

      <div className="cart-summary__price-container">
        <span className="cart-summary__total-price">${totalPrice}</span>
        <span className="cart-summary__count">
          {t('cart.totalFor')} {totalItems} {totalItems === 1 ? (t('cart.item') || 'item') : (t('cart.items') || 'items')}
        </span>
      </div>

      <hr
        className="cart-summary__divider"
        aria-hidden="true"
      />

      <button
        type="button"
        className="button cart-summary__checkout-btn"
        onClick={onCheckout}
      >
        {t('cart.checkout')}
      </button>
    </section>
  );
};