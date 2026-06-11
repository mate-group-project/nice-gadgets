import { useEffect, useState } from 'react';
import type { Product } from '@/features/products/types/Product.ts';
import { getFavouriteProduct } from '@/features/favorites/api/favoritesApi.ts';

export const useFavoriteProducts = () => {
  const [favoritesProducts, setFavoritesProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    const favoritesLocal = JSON.parse(
      localStorage.getItem('favorites') || '[]',
    );

    if (favoritesLocal.length === 0) {
      return;
    }

    const loadProductCart = async () => {
      setIsLoading(true);
      setError('');

      try {
        const result: { status: string; value?: Product }[] =
          await Promise.allSettled(
            favoritesLocal.map((id: string) => getFavouriteProduct(id)),
          );

        setFavoritesProducts(result.map((item) => item.value));
      } catch {
        setError('Product was not found');
      } finally {
        setIsLoading(false);
      }
    };

    loadProductCart().then(() => {});
  }, []);


  return {
    cartProducts: favoritesProducts,
    isLoading,
    error,
  };
};
