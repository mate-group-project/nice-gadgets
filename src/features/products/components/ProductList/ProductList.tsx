import type { Product } from '@/features/products/types/Product.ts';
import { ProductCard } from '@/features/products/components/ProductCard';

interface Props {
  products: Product[];
  isLoading?: boolean;
  errorMessage?: string;
}

export const ProductList = ({ products, isLoading, errorMessage }: Props) => {
  if (errorMessage) {
    return errorMessage;
  }

  if (products.length === 0 || isLoading) return 'loading...';

  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </>
  );
};
