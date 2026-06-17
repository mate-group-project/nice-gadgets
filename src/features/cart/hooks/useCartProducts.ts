import { useCart } from '@/features/products/hooks/useLocalStorageList.ts';
import type { ProductCart } from '@/features/cart/types.ts';
import { useState } from 'react';

export const useCartProducts = () => {
  const { items: cart, saveItems } = useCart();

  const [products, setProducts] = useState<ProductCart[]>(cart);

  const deleteItem = (id: ProductCart['id']) => {
    saveItems(cart.filter((item) => String(item.id) !== String(id)));

    setProducts((current) =>
      current.filter((item) => String(item.id) !== String(id)),
    );
  };

  const changeCount = (
    id: ProductCart['id'],
    quantity: ProductCart['quantity'],
  ) => {
    saveItems(
      cart.map((item) =>
        String(item.id) === String(id) ? { ...item, quantity } : item,
      ),
    );

    setProducts((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  return {
    products,
    deleteItem,
    changeCount,
  };
};
