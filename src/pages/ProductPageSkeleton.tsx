import './styles/productPage.scss';
import '../features/products/components/productPage/Gallery/gallery.scss';
import '../features/products/components/productPage/ProductActions/productAction.scss';
import '../features/products/components/productPage/About/about.scss';
import '../features/products/components/productPage/TechSpecs/techSpecs.scss';
import './ProductPageSkeleton.scss';

export const ProductPageSkeleton = () => (
  <section className="product-page product-page--skeleton">
    <div className="product-page__breadcrumbs-skeleton" />

    <div className="product-page__back-link">
      <span className="product-page__back-icon-skeleton" />
      <span className="product-page__back-text-skeleton" />
    </div>

    <div className="product-page__container">
      <div className="product-page__title" />

      <div className="product-page__content">
        <div className="product-page__main-info">
          <div className="product-page__gallery gallery">
            <div className="gallery__thumbnails">
              <div className="gallery__thumb gallery__thumb--skeleton" />
              <div className="gallery__thumb gallery__thumb--skeleton" />
              <div className="gallery__thumb gallery__thumb--skeleton" />
              <div className="gallery__thumb gallery__thumb--skeleton" />
            </div>

            <div className="gallery__main">
              <div className="gallery__main-image-skeleton" />
            </div>
          </div>

          <div className="product-page__actions product-actions">
            <div className="product-actions__content">
              <div className="product-actions__selection">
                <div className="product-actions__selection-header">
                  <span className="product-actions__selection-title-skeleton" />
                  <span className="product-actions__id-skeleton" />
                </div>

                <div className="product-actions__color-options">
                  <span className="product-actions__color-option" />
                  <span className="product-actions__color-option" />
                  <span className="product-actions__color-option" />
                  <span className="product-actions__color-option" />
                </div>
              </div>

              <div className="product-actions__selection">
                <span className="product-actions__selection-title-skeleton" />

                <div className="product-actions__capacity-options">
                  <span className="capacity-btn" />
                  <span className="capacity-btn" />
                  <span className="capacity-btn" />
                </div>
              </div>

              <div className="product-actions__purchase purchase">
                <div className="purchase__price">
                  <span className="purchase__price-current" />
                  <span className="purchase__price-old" />
                </div>

                <div className="purchase__controls">
                  <span className="product-actions__cart-button button" />
                  <span className="product-actions__favorite-button button__icon button--lg" />
                </div>
              </div>

              <div className="product-actions__short-specs short-specs">
                <ul className="short-specs__list">
                  <li className="short-specs__item" />
                  <li className="short-specs__item" />
                  <li className="short-specs__item" />
                  <li className="short-specs__item" />
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="product-page__details">
          <div className="product-page__about about">
            <div className="about__title" />

            <div className="about__item">
              <div className="about__subtitle" />
              <div className="about__text" />
              <div className="about__text" />
              <div className="about__text about__text--short" />
            </div>

            <div className="about__item">
              <div className="about__subtitle" />
              <div className="about__text" />
              <div className="about__text about__text--medium" />
            </div>
          </div>

          <div className="product-page__tech-specs tech-specs">
            <div className="tech-specs__title" />

            <ul className="tech-specs__list">
              <li className="tech-specs__item" />
              <li className="tech-specs__item" />
              <li className="tech-specs__item" />
              <li className="tech-specs__item" />
              <li className="tech-specs__item" />
              <li className="tech-specs__item" />
              <li className="tech-specs__item" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);