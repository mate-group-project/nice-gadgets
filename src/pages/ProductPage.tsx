import './styles/productPage.scss';

import { Gallery } from '../features/products/components/productPage/Gallery';
import { ProductActions } from '../features/products/components/productPage/ProductActions';
import { About } from '../features/products/components/productPage/About';
import { TechSpecs } from '../features/products/components/productPage/TechSpecs';
import { Link, useParams } from 'react-router-dom';
import { useProduct } from '@/features/products/hooks/useProduct';
import { Section } from '@/shared/components/Section';
import { Icon } from '@/shared/components/Icon';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { ProductCard } from '@/features/products/components/ProductCard';
import { useProductsList } from '@/features/products/hooks/useProductsList';
import { ProductNotFoundPage } from './ProductNotFoundPage';
import { useTranslation } from '@/features/translations/hooks/useTranslation';

const TITLES = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
} as const;

export const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { product, isLoading, error } = useProduct(slug);
  const { products } = useProductsList();
  const { t } = useTranslation();

  const hotPriceProducts = [...products]
    .filter((product) => product.fullPrice > product.price)
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    });

  if (isLoading) {
    return <div className="product-page__loading">{t('common.loading') || 'Loading...'}</div>;
  }

  if (error || !product) {
    return (
      <ProductNotFoundPage />
    );
  }

  const categoryTitle = t(`categoryPage.categoriesTitle.${product.category}`) || TITLES[product.category as keyof typeof TITLES] || product.category;

  const crumbs: Crumb[] = [
    {
      label: categoryTitle,
      url: '/catalog?category=' + product.category,
    },
    {
      label: product.name,
    },
  ];

  return (
    <>
      <section className="product-page">
        <Breadcrumbs crumbs={crumbs} />

        <Link
          to=".."
          className="product-page__back-link"
        >
          <Icon name="chevronLeft" />
          <span>{t('productPage.back') || 'Back'}</span>
        </Link>

        <div className="product-page__container">
          <h1 className="product-page__title">{product.name}</h1>

          <div className="product-page__content">
            <div className="product-page__main-info">
              <Gallery
                product={product}
                key={product.id}
              />
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
          title={t('product.mayAlsoLike') || 'You may also like'}
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