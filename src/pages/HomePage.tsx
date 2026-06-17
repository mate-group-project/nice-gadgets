import * as React from 'react';
import { Carousel } from '@/shared/components/Carousel';
import { Section } from '@/shared/components/Section';
import { ProductCard } from '@/features/products/components/ProductCard';
import { CategoryCard } from '@/features/categories/components/CategoryCard';
import { useProductsList } from '@/features/products/hooks/useProductsList.ts';
import { Link } from 'react-router-dom';
import { ProductCartSkeleton } from '@/features/products/components/ProductCard/ProductCartSkeleton.tsx';
import { useCategories } from '@/features/categories/api/useCategories';
import { useTranslation } from '@/features/translations/hooks/useTranslations';

export const HomePage: React.FC = () => {
  const { products } = useProductsList();
  const { categories } = useCategories();

  const { t } = useTranslation();

  const maxYear = Math.max(...products.map((p) => p.year));

  const brandNewProducts = products.filter(
    (product) => product.year === maxYear,
  );

  const hotPriceProducts = [...products]
    .filter((product) => product.fullPrice > product.price)
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    });

  const loader = Array(4)
    .fill(null)
    .map((_, i) => <ProductCartSkeleton key={i} />);

  const IMAGES = [
    'https://i.ibb.co/gFwSBpht/Phones.png',
    'https://i.ibb.co/zHD5rcYd/Tablets.png',
    'https://i.ibb.co/DyL6gQR/Accessories.png',
  ];

  const CATEGORIES = ['phones', 'tablets', 'accessories'];

  return (
    <>
      <div className="hero">
        <h1 className="hero_title">{t('homePage.title')}</h1>
        <Carousel />
      </div>

      {brandNewProducts.length > 0 ?
        <Section
          title="Brand new models"
          isSlide
        >
          {brandNewProducts.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
            />
          ))}
        </Section>
      : <Section>{loader}</Section>}

      <Section title="Shop by category">
        <div className="categories">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/catalog?category=${CATEGORIES[index]}`}
              style={{ flex: 1 }}
            >
              <CategoryCard image={IMAGES[index]} />
            </Link>
          ))}
        </div>
      </Section>

      {hotPriceProducts.length > 0 ?
        <Section
          title="Hot prices"
          isSlide
        >
          {hotPriceProducts.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
            />
          ))}
        </Section>
      : <Section>{loader}</Section>}
    </>
  );
};
