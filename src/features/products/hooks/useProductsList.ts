import { useEffect, useState } from 'react';
import { getProductsList, type ProductCategory } from '../api/products.ts';
import type { Product } from '../types/Product.ts';

import { useSearchParams } from 'react-router-dom';

type Params = {
  category?: ProductCategory | null;
  sort?: string;
  perPage?: string;
  page?: number;
};

export const useProductsList = ({ category }: Params = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const perPage = searchParams.get('_per_page') || '12';
    const sort = searchParams.get('_sort') || 'newest';
    const page = Number(searchParams.get('_page') || 1);

    const loadProducts = async () => {
      setIsLoading(true);
      setError('');

      try {
        const productsFromServer = await getProductsList({
          category,
          sort,
          perPage,
          page,
        });

        setProducts(productsFromServer.data);
        setTotal(productsFromServer.items);
        setPages(productsFromServer.pages);
        setCurrentPage(page);
      } catch {
        setError('Unable to load products');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts().then(() => {});
  }, [category, searchParams]);

  return { products, total, pages, currentPage, isLoading, error };
};
