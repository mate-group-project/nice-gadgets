import * as React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { useFavoriteProducts } from '@/features/favorites/hooks/useFavoriteProducts';
import './FavouritesPage.scss';
import { ProductList } from '@/features/products/components/ProductList/ProductList.tsx';

export const FavoritesPage: React.FC = () => {
  const { cartProducts, isLoading, error } = useFavoriteProducts();

  return (
    <div className="favourites">
      <Breadcrumbs crumbs={[{ label: 'Favourites' }]} />

      <h1 className="favourites__title">Favourites</h1>
      <p className="favourites__count">{cartProducts.length} items</p>

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
