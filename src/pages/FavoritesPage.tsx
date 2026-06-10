import * as React from 'react';
import { useState } from 'react';
import type { Product } from '@/features/products/types/Product';
import { Breadcrumbs } from './Breadcrumbs';
import { ProductCard } from '@/features/products/components/ProductCard';
import './FavouritesPage.scss';

export const FavoritesPage: React.FC = () => {
  const [favourites] = useState<Product[]>(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  return (
    <>
      <Breadcrumbs page={'Favourites'} />

      <h1 className="favourites">Favourites</h1>
      <p className="favourites__count">{favourites.length} items</p>

      <div className="favourites__grid">
        {favourites.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
};
