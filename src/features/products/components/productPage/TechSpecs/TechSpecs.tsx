import { formatProdductSpecs } from '@/features/products/utils/productSpecs';
import './techSpecs.scss';
import type { ProductDetails } from '@/features/products/types/Product';

type TechSpecsProps = {
  product: ProductDetails;
};

export const TechSpecs = ({ product }: TechSpecsProps) => {
  const specsConfig = formatProdductSpecs(product);

  return (
    <div className="product-page__tech-specs tech-specs">
      <h2 className="tech-specs__title">Tech specs</h2>
      <ul className="tech-specs__list">
        {specsConfig.map((spec) => (
          <li
            key={spec.label}
            className="tech-specs__item"
          >
            <span className="tech-specs__name">{spec.label}</span>
            <span className="tech-specs__value">{spec.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
