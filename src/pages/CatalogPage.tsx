import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import './CatalogPage.scss';
import { ProductCard } from '@/features/products/components/ProductCard/ProductCard';
import type { ProductCategory } from '@/features/products/api/products';

import { useProductsList } from '@/features/products/hooks/useProductsList';
import { Breadcrumbs } from './Breadcrumbs';
import { Dropdown } from '@/shared/components/Dropdown/Dropdown';

const TITLES = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
} as const;

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category') || 'phones';
  const perPage = searchParams.get('_per_page') || 'all';
  const sort = searchParams.get('_sort') || '-year';
  // const page = Number(searchParams.get('_page') || 1);

  const { products, total, isLoading, error } = useProductsList({
    category: category as ProductCategory,
  });

  console.log(products);

  return (
    <div className="catalog">
      <Breadcrumbs page={TITLES[category as keyof typeof TITLES]} />

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
            { label: 'All', value: 'all' },
            { label: '12', value: '12' },
            { label: '16', value: '16' },
            { label: '20', value: '20' },
            { label: '24', value: '24' },
          ]}
          onChange={(value) => {
            const params = new URLSearchParams(searchParams);
            params.set('_per_page', value);
            setSearchParams(params);
          }}
        />
      </div>

      <div className="models">
        {isLoading && <div>Loading...</div>}

        {error && <div>{error}</div>}

        {!isLoading &&
          !error &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
      </div>
    </div>
  );
};
