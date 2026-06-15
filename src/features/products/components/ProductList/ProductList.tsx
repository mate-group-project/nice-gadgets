import type { Product } from '@/features/products/types/Product.ts';
import { ProductCard } from '@/features/products/components/ProductCard';
import { ProductCartSkeleton } from '@/features/products/components/ProductCard/ProductCartSkeleton.tsx';
import './ProductList.scss';

interface Props {
  products: Product[];
  isLoading?: boolean;
  errorMessage?: string;
}

export const ProductList = ({ products, isLoading, errorMessage }: Props) => {
  if (errorMessage) {
    return errorMessage;
  }

  const skeleton = Array(12).fill(null);

  if (products.length === 0 || isLoading)
    return (
      <div className="models">
        {skeleton.map((_, i) => (
          <ProductCartSkeleton key={i} />
        ))}
      </div>
    );

  return (
    <div className="models">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};
