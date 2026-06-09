import { useEffect, useState } from 'react';
import { getProductById } from '../api/products';
import type { ProductDetails } from '../types/Product.ts';

export const useProduct = (id?: string) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadProduct = async () => {
      setIsLoading(true);
      setError('');

      try {
        const product = await getProductById(id);

        setProduct(product);
      } catch {
        setError('Product was not found');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct().then(() => {});
  }, [id]);

  return {
    product,
    isLoading,
    error,
  };
};
