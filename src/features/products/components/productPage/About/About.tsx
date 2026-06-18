import type { ProductDescription } from '@/features/products/types/Product';
import './about.scss';
import { useTranslation } from '@/features/translations/hooks/useTranslation';

type AboutProps = {
  productDescription: ProductDescription[];
};

export const About = ({ productDescription }: AboutProps) => {
  const { t } = useTranslation();

  return (
    <div className="product-page__about about">
      <h2 className="about__title">{t('product.about') || 'About'}</h2>

      <div className="about__content">
        {productDescription.map((desc, index) => (
          <article
            key={index}
            className="about__item"
          >
            <h3 className="about__subtitle">{desc.title}</h3>

            {desc.text.map((paragraph, i) => (
              <p
                key={i}
                className="about__text"
              >
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
};
