import * as React from 'react';
import { Carousel } from '@/shared/components/Carousel';
import { Section } from '@/shared/components/Section';
import { ProductCard } from '@/features/products/components/ProductCard';
import { CategoryCard } from '@/features/categories/components/CategoryCard';
import { useProductsList } from '@/features/products/hooks/useProductsList.ts';
import { Link } from 'react-router-dom';
import { ProductCartSkeleton } from '@/features/products/components/ProductCard/ProductCartSkeleton.tsx';
import { useTranslation } from '@/features/translations/hooks/useTranslation.ts';
import { useHomeData } from '@/shared/hooks/useHomeData.ts';

export const HomePage: React.FC = () => {
  const { products } = useProductsList();
  const { t } = useTranslation();
  const { slides, categories: categoriesLang, language } = useHomeData();

  const maxYear = Math.max(...products.map((p) => p.year));

  const brandNewProducts = products.filter(
    (product) => product.year === maxYear,
  );

  const { total: phonesTotal } = useProductsList({ category: 'phones' });
  const { total: tabletsTotal } = useProductsList({ category: 'tablets' });
  const { total: accessoriesTotal } = useProductsList({
    category: 'accessories',
  });

  const COUNT_BY_CATEGORY: Record<string, number> = {
    phones: phonesTotal,
    tablets: tabletsTotal,
    accessories: accessoriesTotal,
  };

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

  const IMAGE_BY_CATEGORY: Record<string, string> = {
    phones: 'https://i.ibb.co/0RkY91SC/Phones-3x.png',
    tablets: 'https://i.ibb.co/LDW8zcC9/Phones.png',
    accessories: 'https://i.ibb.co/rftBtp2v/Phone.png',
  };

  return (
    <>
      <div className="hero">
        <h1 className="hero_title">{t('homePage.title')}</h1>
        <Carousel
          slides={slides}
          lang={language}
        />
      </div>

      {brandNewProducts.length > 0 ?
        <Section
          title={t('homePage.newModels')}
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

      <Section title={t('homePage.categories')}>
        <div className="categories">
          {categoriesLang.map((category) => (
            <Link
              key={category.name}
              to={`/catalog?category=${category.name}`}
              style={{ flex: 1 }}
            >
              <CategoryCard
                image={IMAGE_BY_CATEGORY[category.name] ?? category.image}
                title={category?.title[language] ?? ''}
                count={COUNT_BY_CATEGORY[category.name] ?? 0}
              />
            </Link>
          ))}
        </div>
      </Section>

      {hotPriceProducts.length > 0 ?
        <Section
          title={t('homePage.hotPrices')}
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
