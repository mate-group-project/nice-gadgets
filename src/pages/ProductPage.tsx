import * as React from 'react';
import './styles/productPage.scss';

import { Gallery } from '../features/products/components/productPage/Gallery';
import { ProductActions } from '../features/products/components/productPage/ProductActions';
import { About } from '../features/products/components/productPage/About';
import { TechSpecs } from '../features/products/components/productPage/TechSpecs';
import { Breadcrumbs } from './Breadcrumbs';
import { useProduct } from '@/features/products/hooks/useProduct';
import { useParams } from 'react-router-dom';

export const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const { product, isLoading, error } = useProduct(productId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return null;

  return (
    <section className="product-page">
      <div className="product-page__container">
        <Breadcrumbs
          crumbs={[
            { label: 'Mobile phones', url: '/catalog?category=phones' },
            { label: product.name },
          ]}
        />
        <h1 className="product-page__title">
          Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
        </h1>

        <div className="product-page__content">
          <div className="product-page__main-info">
            <Gallery />
            <ProductActions />
          </div>

          <div className="product-page__details">
            <About />
            <TechSpecs />
          </div>
        </div>
      </div>
    </section>
  );
};
