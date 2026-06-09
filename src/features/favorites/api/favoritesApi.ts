import { client } from '@/shared/api/client';
import type { Product } from '@/features/products/types/Product';
import { ENDPOINTS } from '@/shared/api/endpoints';

export const favouritesApi = {
  getAll: () => client.get<Product[]>(ENDPOINTS.favorites),
};
