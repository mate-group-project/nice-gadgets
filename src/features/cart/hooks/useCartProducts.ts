import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/features/products/types/Product.ts';
import { getProductCart } from '@/features/cart/api/cart.ts';
import { useCart } from '@/features/products/hooks/useLocalStorageList.ts';

type CartItem = {
  id: string | number;
  count: string | number;
};

type ProductCart = Product & {
  quantity: string | number;
};

export const useCartProducts = () => {
  const { items: cart, saveItems } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const productIds = useMemo(
    () => cart.map((item) => String(item.id)).join('|'),
    [cart],
  );

  useEffect(() => {
    if (!productIds) {
      return;
    }

    const loadProducts = async () => {
      setIsLoading(true);
      setError('');

      try {
        const result = await Promise.allSettled(
          cart.map((item) => getProductCart(String(item.id))),
        );

        const loadedProducts = result
          .map((item) => {
            if (item.status !== 'fulfilled') {
              return null;
            }

            return item.value;
          })
          .filter((item): item is Product => item !== null);

        setProducts(loadedProducts);

        if (loadedProducts.length !== cart.length) {
          setError('Some products were not found');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, [productIds]);

  const cartProducts: ProductCart[] = useMemo(() => {
    if (cart.length === 0) {
      return [];
    }

    return products.map((product) => {
      const cartItem = cart.find(
        (item) => String(item.id) === String(product.id),
      );

      return {
        ...product,
        quantity: cartItem?.count ?? 0,
      };
    });
  }, [products, cart]);

  const deleteItem = (id: CartItem['id']) => {
    saveItems(cart.filter((item) => String(item.id) !== String(id)));
  };

  const changeCount = (id: CartItem['id'], count: CartItem['count']) => {
    saveItems(
      cart.map((item) =>
        String(item.id) === String(id) ? { ...item, count } : item,
      ),
    );
  };

  return {
    cartProducts,
    cart,
    isLoading,
    error,
    deleteItem,
    changeCount,
  };
};
