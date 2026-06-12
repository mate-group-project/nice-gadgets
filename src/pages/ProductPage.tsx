import './styles/productPage.scss';

import { Gallery } from '../features/products/components/productPage/Gallery';
import { ProductActions } from '../features/products/components/productPage/ProductActions';
import { About } from '../features/products/components/productPage/About';
import { TechSpecs } from '../features/products/components/productPage/TechSpecs';
import { Link, useParams } from 'react-router-dom';
import { useProduct } from '@/features/products/hooks/useProduct';
import { Section } from '@/shared/components/Section';
import { Icon } from '@/shared/components/Icon';
import { Breadcrumbs } from './Breadcrumbs';
import { ProductCard } from '@/features/products/components/ProductCard';
import { useProductsList } from '@/features/products/hooks/useProductsList';

export const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { product, isLoading, error } = useProduct(slug);
  const { products } = useProductsList();

  const hotPriceProducts = [...products]
    .filter((product) => product.fullPrice > product.price)
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    });

  if (isLoading) {
    return <div className="product-page__loading">Loading...</div>;
  }

  if (error || !product) {
    return <div className="product-page__error">Error loading product details.</div>;
  }

  return (
    <>
      <section className="product-page">
        <Breadcrumbs page={product.name} />

        <Link to=".." className="product-page__back-link">
          <Icon name="chevronLeft" />
          <span>Back</span>
        </Link>

        <div className="product-page__container">
          <h1 className="product-page__title">{product.name}</h1>

          <div className="product-page__content">
            <div className="product-page__main-info">
              <Gallery product={product} key={product.id} />
              <ProductActions product={product} />
            </div>

            <div className="product-page__details">
              <About productDescription={product.description} />
              <TechSpecs product={product} />
            </div>
          </div>
        </div>
      </section>

      {hotPriceProducts.length > 0 && (
        <Section
          title="You may also like"
          isSlide
        >
          {hotPriceProducts.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
            />
          ))}
        </Section>
      )}
    </>
  );
};
