import './styles/productPage.scss';

import { Gallery } from '../features/products/components/productPage/Gallery';
import { ProductActions } from '../features/products/components/productPage/ProductActions';
import { About } from '../features/products/components/productPage/About';
import { TechSpecs } from '../features/products/components/productPage/TechSpecs';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useProduct } from '@/features/products/hooks/useProduct';
import { Section } from '@/shared/components/Section';
import { Icon } from '@/shared/components/Icon';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { ProductCard } from '@/features/products/components/ProductCard';
import { useProductsList } from '@/features/products/hooks/useProductsList';
import { ProductNotFoundPage } from './ProductNotFoundPage';
import { ProductPageSkeleton } from './ProductPageSkeleton';
import { useTranslation } from '@/features/translations/hooks/useTranslation';
import type { Product } from '@/features/products/types/Product';

const TITLES = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
} as const;

export const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { product: productDetails, isLoading, error } = useProduct(slug);
  const { products } = useProductsList();
  const { t } = useTranslation();

  const location = useLocation();
  const cameFromHome = location.state?.fromHome === true;

  const hotPriceProducts = [...products]
    .filter((product) => product.fullPrice > product.price)
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    });

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  if (error || !productDetails) {
    return <ProductNotFoundPage />;
  }

  const basicProduct: Product = products.find(
    (p) => p.id === productDetails.id,
  ) || {
    id: productDetails.id,
    itemId: productDetails.id,
    category: productDetails.category,
    name: productDetails.name,
    price: productDetails.priceDiscount,
    fullPrice: productDetails.priceRegular,
    screen: productDetails.screen,
    capacity: productDetails.capacity,
    ram: productDetails.ram,
    image: productDetails.images?.[0] || '',
    color: productDetails.color,
    year: 2026,
  };

  const categoryTitle =
    t(`categoryPage.categoriesTitle.${productDetails.category}`) ||
    TITLES[productDetails.category as keyof typeof TITLES] ||
    productDetails.category;

  const crumbs: Crumb[] = [];

  if (!cameFromHome) {
    crumbs.push({
      label: categoryTitle,
      url: '/catalog?category=' + productDetails.category,
    });
  }

  crumbs.push({
    label: productDetails.name,
  });

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
          <h1 className="product-page__title">{productDetails.name}</h1>

          <div className="product-page__content">
            <div className="product-page__main-info">
              <Gallery
                product={productDetails}
                key={productDetails.id}
              />
              <ProductActions
                product={basicProduct}
                productDetails={productDetails}
              />
            </div>

            <div className="product-page__details">
              <About productDescription={productDetails.description} />
              <TechSpecs product={productDetails} />
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
