import * as React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { useFavoriteProducts } from '@/features/favorites/hooks/useFavoriteProducts';
import './FavouritesPage.scss';
import { ProductList } from '@/features/products/components/ProductList/ProductList.tsx';
import { useTranslation } from '@/features/translations/hooks/useTranslation';

export const FavoritesPage: React.FC = () => {
  const { cartProducts, isLoading, error } = useFavoriteProducts();
  const { t } = useTranslation();

  return (
    <div className="favourites">
      <Breadcrumbs crumbs={[{ label: t('favoritesPage.title') }]} />

      <h1 className="favourites__title">{t('favoritesPage.title')}</h1>
      <p className="favourites__count">
        {cartProducts.length} {t('favoritesPage.items')}
      </p>

      <div className="favourites__items">
        <ProductList
          products={cartProducts}
          isLoading={isLoading}
          errorMessage={error}
        />
      </div>
    </div>
  );
};