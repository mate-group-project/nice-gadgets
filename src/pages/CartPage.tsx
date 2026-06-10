import React, { useState } from 'react';
import { CartList } from '../features/cart/components/CartList/CartList';
import { CartSummary } from '../features/cart/components/CartSummary/CartSummary';
import type { CartItemType } from '../features/cart/types';
import '../features/cart/CartPage.scss';

//Заглушка
export const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: '1',
      name: 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
      price: 999,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/80',
    },
    {
      id: '2',
      name: 'Apple iPhone 14 Plus 128GB PRODUCT Red (MQ513)',
      price: 859,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/80',
    },
    {
      id: '3',
      name: 'Apple iPhone 11 Pro Max 64GB Gold (MT9Q2FS/A)',
      price: 799,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/80',
    },
  ]);

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleCheckout = () => {
    console.log('Checkout action processing...', cartItems);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="cart-page">
      <a
        href="/"
        className="cart-page__back-link"
      >
        Back
      </a>
      <h1 className="cart-page__title">Cart</h1>

      <div className="cart-page__content">
        <section className="cart-page__list-section">
          <CartList
            items={cartItems}
            onRemove={handleRemove}
            onUpdateQuantity={handleUpdateQuantity}
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
