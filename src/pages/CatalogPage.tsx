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
  const perPage = searchParams.get('perPage') || 'all';
  const sort = searchParams.get('sort') || 'newest';

  const { products, isLoading, error } =
    useProductsList(category as ProductCategory);

  const sortedProducts = [...products];

  switch (sort) {
    case 'name':
      sortedProducts.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      break;

    case 'price':
      sortedProducts.sort((a, b) =>
        a.price - b.price,
      );
      break;

    case 'discount':
      sortedProducts.sort(
        (a, b) =>
          (b.fullPrice - b.price) -
          (a.fullPrice - a.price),
      );
      break;

    default:
      sortedProducts.sort((a, b) =>
        b.year - a.year,
      );
  }

  const visibleProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(0, Number(perPage));

  return (
    <div className="catalog">
      <Breadcrumbs page={TITLES[category as keyof typeof TITLES]} />  

      <h1 className="catalog_title">
        {TITLES[category as keyof typeof TITLES]}
      </h1>

      <p className="catalog_count">
         {products.length} models
      </p>

      <div className="catalog_filters">
        <Dropdown
          label="Sort by"
          value={sort}
          options={[
            { label: 'Newest', value: 'newest' },
            { label: 'Alphabetically', value: 'name' },
            { label: 'Cheapest', value: 'price' },
            { label: 'Biggest discount', value: 'discount' },
          ]}
          onChange={(value) => {
            const params = new URLSearchParams(searchParams);
            params.set('sort', value);
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
            params.set('perPage', value);
            setSearchParams(params);
          }}
        />
      </div>

      <div className="models">
        {isLoading && <div>Loading...</div>}

        {error && <div>{error}</div>}

        {!isLoading &&
          !error &&
            visibleProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
      </div>
    </div>
  );
};
