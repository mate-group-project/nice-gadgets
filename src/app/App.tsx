import './App.scss';
import { Header } from '@/shared/components/Header';
import { Section } from '@/shared/components/Section';
import { ProductCard } from '@/features/products/components/ProductCard';
import { Carousel } from '@/shared/components/Carousel';
import { CategoryCard } from '@/features/categories/components/CategoryCard';
import { Footer } from '@/shared/components/Footer';

function App() {
  // use Outlet here
  return (
    <div className="app">
      <Header />
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
      <Footer />
    </div>
  );
}

export default App;
