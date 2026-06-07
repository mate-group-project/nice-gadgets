import * as React from 'react';
import { Carousel } from '@/shared/components/Carousel';
import { Section } from '@/shared/components/Section';
import { ProductCard } from '@/features/products/components/ProductCard';
import { CategoryCard } from '@/features/categories/components/CategoryCard';

export const HomePage: React.FC = () => {
  return (
    <>
      <div className="hero">
        <h1>Welcome to Nice Gadgets store!</h1>
        <Carousel />
      </div>
      <Section title="Brand new models">
        <div className="models">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Section>
      <Section title="Shop by category">
        <div className="categories">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </Section>
      <Section title="Hot prices">
        <div className="models">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Section>
    </>
  );
};
