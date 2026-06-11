import { client } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { Product } from '@/features/products/types/Product.ts';

export const getProductCart = (id: string) => {
  return client.get<Product>(`${ENDPOINTS.products}/${id}`);
};
