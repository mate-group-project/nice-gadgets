import { formatProdductSpecs } from '@/features/products/utils/productSpecs';
import './techSpecs.scss';
import type { ProductDetails } from '@/features/products/types/Product';
import { useTranslation } from '@/features/translations/hooks/useTranslation';

type TechSpecsProps = {
  product: ProductDetails;
};

export const TechSpecs = ({ product }: TechSpecsProps) => {
  const specsConfig = formatProdductSpecs(product);
  const { t } = useTranslation();

  const getSpecLabel = (label: string) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel === 'capacity') {
      return t('product.capacityLabel') || t('product.capacity') || label;
    }
    return t(`product.${lowerLabel}`) || label;
  };

  return (
    <div className="product-page__tech-specs tech-specs">
      <h2 className="tech-specs__title">
        {t('product.techSpecs') || 'Tech specs'}
      </h2>
      <ul className="tech-specs__list">
        {specsConfig.map((spec) => (
          <li
            key={spec.label}
            className="tech-specs__item"
          >
            <span className="tech-specs__name">{getSpecLabel(spec.label)}</span>
            <span className="tech-specs__value">{spec.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};