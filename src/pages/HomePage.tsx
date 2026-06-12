import * as React from 'react';
import { Carousel } from '@/shared/components/Carousel';
import { Section } from '@/shared/components/Section';
import { ProductCard } from '@/features/products/components/ProductCard';
import { CategoryCard } from '@/features/categories/components/CategoryCard';
import { UIKIT } from '@/shared/components/UIKIT.tsx';
import { useProductsList } from '@/features/products/hooks/useProductsList.ts';

export const HomePage: React.FC = () => {
  const { products } = useProductsList();

  const brandNewProducts = products.filter(
    product => product.price === product.fullPrice,
  );

  const hotPriceProducts = [...products]
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
  });

  return (
    <>
      <div className="hero">
        <h1 className="hero_title">Welcome to Nice Gadgets store!</h1>
        <Carousel />
      </div>

      {brandNewProducts.length > 0 && 
        <Section
          title="Brand new models"
          // isSlide
        >
          {brandNewProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </Section>}

      <Section title="Shop by category">
        <div className="categories">
          <CategoryCard image="https://i.ibb.co/gFwSBpht/Phones.png" />
          <CategoryCard image="https://i.ibb.co/zHD5rcYd/Tablets.png" />
          <CategoryCard image="https://i.ibb.co/DyL6gQR/Accessories.png" />
        </div>
      </Section>

      {hotPriceProducts.length > 0 && 
        <Section 
          title="Hot prices"
          isSlide
        >
          {hotPriceProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </Section>}

      <UIKIT />
    </>
  );
};
