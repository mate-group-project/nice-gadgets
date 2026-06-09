import * as React from 'react';
import './styles/ProductPage.scss';

import { Gallery } from '../features/products/components/productPage/Gallery';
import { ProductActions } from '../features/products/components/productPage/ProductActions';
import { About } from '../features/products/components/productPage/About';
import { TechSpecs } from '../features/products/components/productPage/TechSpecs';

export const ProductPage: React.FC = () => {
  return (
    <section className="product-page">
      <div className="product-page__container">
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