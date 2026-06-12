import { Button } from '@base-ui/react';
import { Icon } from '@/shared/components/Icon';
import './productAction.scss';
import type { ProductDetails } from '@/features/products/types/Product';
import { formatProdductSpecs } from '@/features/products/utils/productSpecs';
;
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type ProductActionsProps = {
  product: ProductDetails;
}

const PRODUCT_COLORS: Record<string, string> = {
  midnight: '#2e3641',
  starlight: '#f0ece4',
  'space-gray': '#535150',
  spacegray: '#535150',
  graphite: '#41424c',
  'sierra-blue': '#a7c1d6',
  sierrablue: '#a7c1d6',
  'alpine-green': '#505c4e',
  alpinegreen: '#505c4e',
  'rose-gold': '#fad6d1',
  rosegold: '#fad6d1',
  gold: '#f9e4b7',
  silver: '#ebebeb',
  coral: '#ff6f61',
  'sky-blue': '#def0f9',
};

export const ProductActions = ({ product }: ProductActionsProps) => {
  const specsConfig = formatProdductSpecs(product);

  return (
    <div className="product-page__actions product-actions">
      <div className="product-actions__content">
        <div className="product-actions__selection">
          <div className="product-actions__selection-header">
            <span className="product-actions__selection-title">
              Available colors
            </span>
            <span className="product-actions__id">ID: {product.id}</span>
          </div>
          <div className="product-actions__color-options">
            {product.colorsAvailable.map(color => {
              return (
                <Link key={color.id} to={`/product/${color.id}`}>
                  <span
                    className={classNames(
                      'product-actions__color-option',
                      { 'product-actions__color-option--active': product.id === color.id }
                    )}
                    title={color.name}
                    style={{ backgroundColor: PRODUCT_COLORS[color.color.toLowerCase()] || color.color }}
                  >
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="product-actions__selection">
          <span className="product-actions__selection-title">
            Select capacity
          </span>

          <div className="product-actions__capacity-options">
            {product.capacityAvailable.map(capacity => {
              return (
                <Link key={capacity.id} to={`/product/${capacity.id}`}>
                  <span
                    className={classNames(
                      'product-actions__capacity-option',
                      'capacity-btn',
                      { 'capacity-btn--active': product.id === capacity.id }
                    )}
                    title={capacity.name}
                  >
                    {capacity.capacity}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="product-actions__purchase purchase">
          <div className="purchase__price">
            {product.priceDiscount === product.priceRegular ?
              (<span className="purchase__price-current">${product.priceRegular}</span>) :
              (<>
                <span className="purchase__price-current">${product.priceRegular}</span>
                <span className="purchase__price-old">${product.priceDiscount}</span>
              </>
              )
            }
          </div>

          <div className="purchase__controls">
            <Button
              className="button"
              style={{ width: '260px' }}
            >
              Add to cart
            </Button>

            <Button
              className="button__icon button--lg"
              onClick={() => { }}
            >
              <Icon name="heart" />
            </Button>
          </div>
        </div>

        <div className="product-actions__short-specs short-specs">
          <ul className="short-specs__list">
            {specsConfig.slice(0, 4).map(spec => {
              return (<li key={spec.label} className="short-specs__item">
                <span className="short-specs__name">{spec.label}</span>
                <span className="short-specs__value">{spec.value}</span>
              </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
