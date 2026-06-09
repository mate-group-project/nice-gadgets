import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import '../features/catalogPage/components/Catalog/Catalog.scss';
import { ProductCard } from '@/features/products/components/ProductCard/ProductCard';

const products = [
  { id: 1, name: 'iPhone 14', category: 'phones' },
  { id: 2, name: 'iPhone 15', category: 'phones' },
  { id: 3, name: 'iPad Pro', category: 'tablets' },
  { id: 4, name: 'iPad Air', category: 'tablets' },
  { id: 5, name: 'iPad mini', category: 'tablets' },
  { id: 6, name: 'MacBook Air', category: 'accessories' },
];

const TITLES = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
} as const;

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category') || 'phones';

  const filteredProducts = products.filter(
    p => p.category === category
  );

  return (
    <div className="catalog">
      <h1 className="catalog_title">
        {TITLES[category as keyof typeof TITLES]}
      </h1>

      <p className="catalog_count">
        {filteredProducts.length} models
      </p>

      <div className="models">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
