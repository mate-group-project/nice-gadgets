import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import './CatalogPage.scss';
import type { ProductCategory } from '@/features/products/api/products';

import { useProductsList } from '@/features/products/hooks/useProductsList';
import { Breadcrumbs } from './Breadcrumbs';
import { Dropdown } from '@/shared/components/Dropdown/Dropdown';
import { Pagination } from '@/shared/components/Pagination';
import { ProductList } from '@/features/products/components/ProductList/ProductList.tsx';
import { useTranslation } from '@/features/translations/hooks/useTranslation';

const TITLES = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
} as const;

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

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

  const displayTitle = t(`categoryPage.categoriesTitle.${category}`) || TITLES[category as keyof typeof TITLES] || category;

  return (
    <div className="catalog">
      <Breadcrumbs
        crumbs={[{ label: displayTitle }]}
      />

      <h1 className="catalog_title">
        {displayTitle}
      </h1>

      <p className="catalog_count">
        {total} {t('categoryPage.models') || 'models'}
      </p>

      <div className="catalog_filters">
        <Dropdown
          label={t('categoryPage.sortBy') || 'Sort by'}
          value={sort}
          options={[
            { label: t('categoryPage.newest') || 'Newest', value: '-year' },
            { label: t('categoryPage.alphabetically') || 'Alphabetically', value: 'name' },
            { label: t('categoryPage.cheapest') || 'Cheapest', value: 'price' },
            { label: t('categoryPage.discount') || 'Biggest discount', value: 'fullPrice' },
          ]}
          onChange={(value) => {
            const params = new URLSearchParams(searchParams);
            params.set('_sort', value);
            setSearchParams(params);
          }}
        />
        <Dropdown
          label={t('categoryPage.itemsOnPage') || 'Items on page'}
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