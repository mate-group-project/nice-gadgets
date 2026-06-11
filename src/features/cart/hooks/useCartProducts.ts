import { useEffect, useState } from 'react';
import type { Product } from '@/features/products/types/Product.ts';
import { getProductCart } from '@/features/cart/api/cart.ts';

export const useCartProducts = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('cart') || '[]');

    if (cartLocal.length === 0) {
      return;
    }

    const loadProductCart = async () => {
      setIsLoading(true);
      setError('');

      try {
        const result: { status: string; value?: Product }[] =
          await Promise.allSettled(
            cartLocal.map((id: string) => getProductCart(id)),
          );

        setCartProducts(result.map((item) => item.value));
      } catch {
        setError('Product was not found');
      } finally {
        setIsLoading(false);
      }
    };

    loadProductCart().then(() => {});
  }, []);

  return {
    cartProducts,
    isLoading,
    error,
  };
};
