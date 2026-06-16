import React from 'react';
import { CartItem } from '../CartItem/CartItem';
import './CartList.scss';
import type { Product } from '@/features/products/types/Product.ts';

type ProductCart = Product & { quantity: string | number };

interface CartListProps {
  items: ProductCart[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
}

export const CartList: React.FC<CartListProps> = ({
  items,
  onRemove,
  onUpdateQuantity,
}) => {
  if (items.length === 0) {
    return (
      <div className="cart-list__empty">
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-list">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={onRemove}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </div>
  );
};
