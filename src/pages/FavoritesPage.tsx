import * as React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { ProductCard } from '@/features/products/components/ProductCard';
import { useFavoriteProducts } from '@/features/favorites/hooks/useFavoriteProducts';
import './FavouritesPage.scss';

export const FavoritesPage: React.FC = () => {
  const { cartProducts, isLoading, error } = useFavoriteProducts();

  return (
    <>
      <Breadcrumbs page={'Favourites'} />

      <h1 className="favourites">Favourites</h1>
      <p className="favourites__count">{cartProducts.length} items</p>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className="favourites__grid">
        {cartProducts.filter(Boolean).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
};
