import * as React from 'react';
import { useEffect, useState } from 'react';
import type { Product } from '@/features/products/types/Product';
import { favouritesApi } from '@/features/favorites/api/favoritesApi';

export const FavoritesPage: React.FC = () => {
  const [favourites, setFavourites] = useState<Product[]>([]);

  useEffect(() => {
    favouritesApi.getAll().then(setFavourites);
  }, []);

  return (
    <>
      <h1>Favourites</h1>
      <p>{favourites.length} items</p>
      {favourites.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </>
  );
};
