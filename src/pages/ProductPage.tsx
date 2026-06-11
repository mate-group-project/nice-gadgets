import * as React from 'react';
import './styles/productPage.scss';

import { Gallery } from '../features/products/components/productPage/Gallery';
import { ProductActions } from '../features/products/components/productPage/ProductActions';
import { About } from '../features/products/components/productPage/About';
import { TechSpecs } from '../features/products/components/productPage/TechSpecs';
import { useParams } from 'react-router-dom';
import { useProduct } from '@/features/products/hooks/useProduct';

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { product, isLoading, error } = useProduct(productId);

  if (isLoading) {
    return <div className="product-page__loading">Loading...</div>;
  }

  if (error || !product) {
    return <div className="product-page__error">Error loading product details.</div>; 
  }



  return (
    <section className="product-page">
      <div className="product-page__container">
        <h1 className="product-page__title">
          {product.name}
        </h1>

        <div className="product-page__content">
          <div className="product-page__main-info">
            <Gallery images={product.images} />
            <ProductActions product={product} />
          </div>

          <div className="product-page__details">
            <About productDescription={product.description} />
            <TechSpecs product={product} />
          </div>
        </div>
      </div>
    </section>
  );
};
