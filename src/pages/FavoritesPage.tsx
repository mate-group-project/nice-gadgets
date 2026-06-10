import * as React from 'react';
import { useEffect, useState } from 'react';
import type { Product } from '@/features/products/types/Product';
import { favouritesApi } from '@/features/favorites/api/favoritesApi';
import { Breadcrumbs } from './Breadcrumbs';
import './FavouritesPage.scss';

export const FavoritesPage: React.FC = () => {
  const [favourites, setFavourites] = useState<Product[]>([]);

  useEffect(() => {
    favouritesApi.getAll().then(setFavourites);
  }, []);

  return (
    <>
      <Breadcrumbs page={'Favourites'} />

      <h1 className="favourites">Favourites</h1>
      <p>{favourites.length} items</p>

      {/* {favourites.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))} */}
    </>
  );
};
