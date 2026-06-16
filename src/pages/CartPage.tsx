import React, { useEffect, useState } from 'react';
import { CartList } from '../features/cart/components/CartList/CartList';
import { CartSummary } from '../features/cart/components/CartSummary/CartSummary';
import type { CartItemType } from '../features/cart/types';
import '../features/cart/CartPage.scss';
import { useCartProducts } from '@/features/cart/hooks/useCartProducts.ts';
import { useNavigate } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { cartProducts, isLoading } = useCartProducts();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  // const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (cartProducts.length === 0) return;

    const activeIds: string[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const savedQuantities = JSON.parse(localStorage.getItem('cart_quantities') || '{}');

    const validProducts = cartProducts
      .filter((product): product is NonNullable<typeof product> => !!product && activeIds.includes(product.id))
      .map((product) => ({
        id: product.id,
        name: product.name,
        imageUrl: product.image,
        price: product.price,
        quantity: savedQuantities[product.id] || 1,
      }));

    setCartItems(validProducts);
  }, [cartProducts]);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    const savedQuantities = JSON.parse(localStorage.getItem('cart_quantities') || '{}');
    const updatedQuantities = { ...savedQuantities, [id]: newQuantity };
    
    localStorage.setItem('cart_quantities', JSON.stringify(updatedQuantities));
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemove = (id: string) => {
    const activeIds: string[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedIds = activeIds.filter((cartId) => cartId !== id);
    localStorage.setItem('cart', JSON.stringify(updatedIds));

    const savedQuantities = JSON.parse(localStorage.getItem('cart_quantities') || '{}');
    delete savedQuantities[id];
    localStorage.setItem('cart_quantities', JSON.stringify(savedQuantities));

    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    // localStorage.setItem('cart', '[]');
    // localStorage.removeItem('cart_quantities');
    // setCartItems([]);
    // setIsOrderPlaced(true);

    navigate('/checkout');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // if (isOrderPlaced) {
  //   return (
  //     <div className="cart-page cart-page--success">
  //       <h1 className="cart-page__title">Thank you!</h1>
  //       <p className="cart-page__success-message">
  //         Your order has been successfully processed and your cart has been cleared.
  //       </p>
  //       <a href="/" className="cart-page__back-link">Back to store</a>
  //     </div>
  //   );
  // }

  if (isLoading && cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-page__title">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <a href="/" className="cart-page__back-link">Back</a>
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