import React from 'react';
import { CartList } from '../features/cart/components/CartList/CartList';
import { CartSummary } from '../features/cart/components/CartSummary/CartSummary';
import '../features/cart/CartPage.scss';
import { useCartProducts } from '@/features/cart/hooks/useCartProducts.ts';
import { useNavigate } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { cartProducts, deleteItem, changeCount } = useCartProducts();

  const navigate = useNavigate();

  console.log(cartProducts);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const totalItems = cartProducts.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );
  const totalPrice = cartProducts.reduce(
    (sum, item) => sum + item.price * Number(item.quantity),
    0,
  );

  return (
    <div className="cart-page">
      <a href="/" className="cart-page__back-link">Back</a>
      <h1 className="cart-page__title">Cart</h1>

      <div className="cart-page__content">
        <section className="cart-page__list-section">
          <CartList
            items={cartProducts}
            onRemove={deleteItem}
            onUpdateQuantity={changeCount}
          />
        </section>

        <aside className="cart-page__summary-section">
          <CartSummary
            totalItems={totalItems}
            totalPrice={totalPrice}
            onCheckout={handleCheckout}
          />
        </aside>
      </div>
    </div>
  );
};