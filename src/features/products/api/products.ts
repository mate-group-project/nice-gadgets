import { client } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { Product, ProductDetails } from '../types/Product.ts';

export type ProductCategory = 'phones' | 'tablets' | 'accessories';

export const getProductsList = (category?: ProductCategory | null) => {
  const searchParams = new URLSearchParams();

  if (category) {
    searchParams.set('category', category);
  }

  const query = searchParams.toString();

  return client.get<Product[]>(
    `${ENDPOINTS.products}${query ? `?${query}` : ''}`,
  );
};

export const getProductById = (id: string) => {
  return client.get<ProductDetails>(`${ENDPOINTS.product}/${id}`);
};
