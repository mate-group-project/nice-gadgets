import './styles/productPage.scss';
import './ProductPageSkeleton.scss';

export const ProductPageSkeleton = () => (
  <section className="product-page product-page--skeleton">
    <div className="product-page-skeleton__breadcrumbs">
      <span className="product-page-skeleton__breadcrumb-home" />
      <span className="product-page-skeleton__breadcrumb-arrow" />
      <span className="product-page-skeleton__breadcrumb-page" />
      <span className="product-page-skeleton__breadcrumb-arrow" />
      <span className="product-page-skeleton__breadcrumb-product" />
    </div>

    <div className="product-page__back-link">
      <span className="product-page-skeleton__back-icon" />
      <span className="product-page-skeleton__back-text" />
    </div>

    <div className="product-page__container">
      <div className="product-page-skeleton__title" />

      <div className="product-page__content">
        <div className="product-page__main-info">
          <div className="product-page-skeleton__gallery">
            <div className="product-page-skeleton__thumbs">
              <span className="product-page-skeleton__thumb" />
              <span className="product-page-skeleton__thumb" />
              <span className="product-page-skeleton__thumb" />
              <span className="product-page-skeleton__thumb" />
            </div>

            <div className="product-page-skeleton__image" />
          </div>

          <div className="product-page-skeleton__actions">
            <div className="product-page-skeleton__selection">
              <div className="product-page-skeleton__selection-header">
                <span className="product-page-skeleton__label" />
                <span className="product-page-skeleton__id" />
              </div>

              <div className="product-page-skeleton__colors">
                <span className="product-page-skeleton__color" />
                <span className="product-page-skeleton__color" />
                <span className="product-page-skeleton__color" />
                <span className="product-page-skeleton__color" />
              </div>
            </div>

            <div className="product-page-skeleton__selection">
              <span className="product-page-skeleton__label" />

              <div className="product-page-skeleton__capacities">
                <span className="product-page-skeleton__capacity" />
                <span className="product-page-skeleton__capacity" />
                <span className="product-page-skeleton__capacity" />
              </div>
            </div>

            <div className="product-page-skeleton__purchase">
              <div className="product-page-skeleton__prices">
                <span className="product-page-skeleton__price-current" />
                <span className="product-page-skeleton__price-old" />
              </div>

              <div className="product-page-skeleton__buttons">
                <span className="product-page-skeleton__cart-button" />
                <span className="product-page-skeleton__fav-button" />
              </div>
            </div>

            <div className="product-page-skeleton__short-specs">
              <span className="product-page-skeleton__spec" />
              <span className="product-page-skeleton__spec" />
              <span className="product-page-skeleton__spec" />
              <span className="product-page-skeleton__spec" />
            </div>
          </div>
        </div>

        <div className="product-page__details">
          <div className="product-page-skeleton__about">
            <div className="product-page-skeleton__section-heading">
              <div className="product-page-skeleton__section-title" />
            </div>

            <div className="product-page-skeleton__about-block">
              <div className="product-page-skeleton__subtitle" />
              <div className="product-page-skeleton__text" />
              <div className="product-page-skeleton__text" />
              <div className="product-page-skeleton__text product-page-skeleton__text--short" />
            </div>

            <div className="product-page-skeleton__about-block">
              <div className="product-page-skeleton__subtitle" />
              <div className="product-page-skeleton__text" />
              <div className="product-page-skeleton__text product-page-skeleton__text--medium" />
            </div>
          </div>

          <div className="product-page-skeleton__tech">
            <div className="product-page-skeleton__section-heading product-page-skeleton__section-heading--tech">
              <div className="product-page-skeleton__section-title" />
            </div>

            <div className="product-page-skeleton__tech-list">
              <span className="product-page-skeleton__tech-row" />
              <span className="product-page-skeleton__tech-row" />
              <span className="product-page-skeleton__tech-row" />
              <span className="product-page-skeleton__tech-row" />
              <span className="product-page-skeleton__tech-row" />
              <span className="product-page-skeleton__tech-row" />
              <span className="product-page-skeleton__tech-row" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
