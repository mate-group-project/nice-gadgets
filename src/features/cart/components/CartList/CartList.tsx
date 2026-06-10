import React from 'react';
import type { CartItemType } from '../../types';
import { CartItem } from '../CartItem/CartItem';
import './CartList.scss';

interface CartListProps {
  items: CartItemType[];
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
