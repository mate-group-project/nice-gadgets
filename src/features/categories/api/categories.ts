import { client } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { Category } from '../types/Category.ts';

export const getCategoryList = () => {
  return client.get<Category[]>(ENDPOINTS.categories);
};
