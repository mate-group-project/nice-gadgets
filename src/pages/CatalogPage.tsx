import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import './CatalogPage.scss';
import type { ProductCategory } from '@/features/products/api/products';

import { useProductsList } from '@/features/products/hooks/useProductsList';
import { Breadcrumbs } from './Breadcrumbs';
import { Dropdown } from '@/shared/components/Dropdown/Dropdown';
import { Pagination } from '@/shared/components/Pagination';
import { ProductList } from '@/features/products/components/ProductList/ProductList.tsx';

const TITLES = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
} as const;

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category') || 'phones';
  const perPage = searchParams.get('_per_page') || '12';
  const sort = searchParams.get('_sort') || '-year';

  const currentPage = Number(searchParams.get('_page') || 1);

  const { products, total, pages, isLoading, error } = useProductsList({
    category: category as ProductCategory,
  });

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  return (
    <div className="catalog">
      <Breadcrumbs
        crumbs={[{ label: TITLES[category as keyof typeof TITLES] }]}
      />

      <h1 className="catalog_title">
        {TITLES[category as keyof typeof TITLES]}
      </h1>

      <p className="catalog_count">{total} models</p>

      <div className="catalog_filters">
        <Dropdown
          label="Sort by"
          value={sort}
          options={[
            { label: 'Newest', value: '-year' },
            { label: 'Alphabetically', value: 'name' },
            { label: 'Cheapest', value: 'price' },
            { label: 'Biggest discount', value: 'fullPrice' },
          ]}
          onChange={(value) => {
            const params = new URLSearchParams(searchParams);
            params.set('_sort', value);
            setSearchParams(params);
          }}
        />
        <Dropdown
          label="Items on page"
          value={perPage}
          options={[
            { label: '12', value: '12' },
            { label: '16', value: '16' },
            { label: '20', value: '20' },
            { label: '24', value: '24' },
            { label: '48', value: '48' },
          ]}
          onChange={(value) => {
            const params = new URLSearchParams(searchParams);

            params.set('_per_page', value);
            setSearchParams(params);
          }}
        />
      </div>

      <ProductList
        products={products}
        isLoading={isLoading}
        errorMessage={error}
      />

      {pages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pages}
          onPageChange={(page) => {
            const params = new URLSearchParams(searchParams);
            params.set('_page', String(page));
            setSearchParams(params);
          }}
        />
      )}
    </div>
  );
};
