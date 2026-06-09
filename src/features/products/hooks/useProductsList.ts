import { useEffect, useState } from 'react';
import { getProductsList, type ProductCategory } from '../api/products.ts';
import type { Product } from '../types/Product.ts';

export const useProductsList = (category?: ProductCategory | null) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError('');

      try {
        const productsFromServer = await getProductsList(category);

        setProducts(productsFromServer);
      } catch {
        setError('Unable to load products');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts().then(() => {});
  }, [category]);

  return { products, isLoading, error };
};
