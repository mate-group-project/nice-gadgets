import type { Product } from '@/features/products/types/Product.ts';
import { ProductCard } from '@/features/products/components/ProductCard';
import { ProductCartSkeleton } from '@/features/products/components/ProductCard/ProductCartSkeleton.tsx';
import './ProductList.scss';
import { useTranslation } from '@/features/translations/hooks/useTranslation';

interface Props {
  products: Product[];
  isLoading?: boolean;
  errorMessage?: string;
}

export const ProductList = ({ products, isLoading, errorMessage }: Props) => {
  const { t } = useTranslation();

  if (errorMessage) {
    return errorMessage;
  }

  const skeleton = Array(12).fill(null);

  if (isLoading) {
    return (
      <div className="models">
        {skeleton.map((_, i) => (
          <ProductCartSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="models__empty">
        <p className="models__empty-title">{t('products.notFound') || 'No items found'}</p>
        <p className="models__empty-text">{t('products.emptyList') || "You haven't added anything yet"}</p>
      </div>
    );
  }

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