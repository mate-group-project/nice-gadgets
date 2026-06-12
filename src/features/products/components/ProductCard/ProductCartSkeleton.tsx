import './ProductCard.scss';
import './ProductCardSkeleton.scss';

export const ProductCartSkeleton = () => (
  <article className="product__card product__card--skeleton">
    <div>
      <div className="product__card__image"></div>
    </div>

    <div className="product__card__title"></div>

    <div className="product__card__price"></div>

    <section className="product__card__specs">
      <div className="product__card__spec">
        <div className="product__card__spec-label"></div>
        <span className="product__card__spec-value"></span>
      </div>

      <div className="product__card__spec">
        <div className="product__card__spec-label"></div>
        <span className="product__card__spec-value"></span>
      </div>
    </section>

    <div className="product__card__actions">
      <div className="product__card__button"></div>
      <div className="product__card__icon-button"></div>
    </div>
  </article>
);
