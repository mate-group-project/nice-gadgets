import { client } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { Product, ProductDetails } from '../types/Product.ts';

export type ProductCategory = 'phones' | 'tablets' | 'accessories';

type GetProductsListParams = {
  category?: ProductCategory | null;
  sort?: string;
  perPage?: string;
  page?: number;
};

type ProductsResponse = {
  data: Product[];
  items: number;
  pages: number;
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
};

export const getProductsList = ({
  category,
  sort,
  perPage,
  page,
}: GetProductsListParams) => {
  const searchParams = new URLSearchParams();

  if (category) {
    searchParams.set('category', category);
  }

  if (sort) {
    searchParams.set('_sort', sort);
  }

  if (perPage) {
    searchParams.set('_per_page', perPage);
  }

  if (page) {
    searchParams.set('_page', page.toString());
  }

  const query = searchParams.toString();

  return client.get<ProductsResponse>(
    `${ENDPOINTS.products}${query ? `?${query}` : ''}`,
  );
};

export const getProductById = (id: string) => {
  return client.get<ProductDetails>(`${ENDPOINTS.product}/${id}`);
};
