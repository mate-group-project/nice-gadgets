import { Button } from '@base-ui/react';
import { Icon } from '@/shared/components/Icon';
import './productAction.scss';
import type { Product, ProductDetails } from '@/features/products/types/Product';
import { formatProdductSpecs } from '@/features/products/utils/productSpecs';
import '../../ProductCard/ProductCard.scss';

import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useFavorites } from '../../../hooks/useLocalStorageList';
import { useTranslation } from '@/features/translations/hooks/useTranslation';

type ProductActionsProps = {
  productDetails: ProductDetails;
  product: Product;
};

const PRODUCT_COLORS: Record<string, string> = {
  'midnight': '#2e3641',
  'starlight': '#f0ece4',
  'space-gray': '#535150',
  'spacegray': '#535150',
  'graphite': '#41424c',
  'sierra-blue': '#a7c1d6',
  'sierrablue': '#a7c1d6',
  'alpine-green': '#505c4e',
  'alpinegreen': '#505c4e',
  'rose-gold': '#fad6d1',
  'rosegold': '#fad6d1',
  'gold': '#f9e4b7',
  'silver': '#ebebeb',
  'coral': '#ff6f61',
  'sky-blue': '#def0f9',
};

export const ProductActions = ({ productDetails, product }: ProductActionsProps) => {
  const { items: cart, saveItems } = useCart();
  const { items: favorites, saveItems: saveFavorites } = useFavorites();
  const specsConfig = formatProdductSpecs(productDetails);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isAdded = cart.map((item) => item.id).includes(product.id);

  const addToCart = () => {
    if (cart.map((item) => item.id).includes(product.id)) {
      navigate('/cart');
      return;
    }

    saveItems([...cart, { ...product, quantity: 1 }]);
  };

  const isFavorite = favorites.includes(product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      saveFavorites(favorites.filter((id) => id !== product.id));
      return;
    }

    saveFavorites([...favorites, product.id]);
  };

  const getSpecLabel = (label: string) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel === 'capacity') {
      return t('product.capacityLabel') || t('product.capacity') || label;
    }
    return t(`product.${lowerLabel}`) || label;
  };

  return (
    <div className="product-page__actions product-actions">
      <div className="product-actions__content">
        <div className="product-actions__selection">
          <div className="product-actions__selection-header">
            <span className="product-actions__selection-title">
              {t('product.colors') || 'Available colors'}
            </span>
            <span className="product-actions__id">ID: {productDetails.id}</span>
          </div>
          <div className="product-actions__color-options">
            {productDetails.colorsAvailable.map((color) => {
              return (
                <Link
                  key={color.id}
                  to={`/product/${color.id}`}
                >
                  <span
                    className={classNames('product-actions__color-option', {
                      'product-actions__color-option--active':
                        productDetails.id === color.id,
                    })}
                    title={color.name}
                    style={{
                      backgroundColor:
                        PRODUCT_COLORS[color.color.toLowerCase()] ||
                        color.color,
                    }}
                  ></span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="product-actions__selection">
          <span className="product-actions__selection-title">
            {t('product.selectCapacity') || 'Select capacity'}
          </span>

          <div className="product-actions__capacity-options">
            {productDetails.capacityAvailable.map((capacity) => {
              return (
                <Link
                  key={capacity.id}
                  to={`/product/${capacity.id}`}
                >
                  <span
                    className={classNames(
                      'product-actions__capacity-option',
                      'capacity-btn',
                      { 'capacity-btn--active': productDetails.id === capacity.id },
                    )}
                    title={capacity.name}
                  >
                    {capacity.capacity}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="product-actions__purchase purchase">
          <div className="purchase__price">
            {productDetails.priceDiscount === productDetails.priceRegular ?
              <span className="purchase__price-current">
                ${productDetails.priceRegular}
              </span>
            : <>
                <span className="purchase__price-current">
                  ${productDetails.priceRegular}
                </span>
                <span className="purchase__price-old">
                  ${productDetails.priceDiscount}
                </span>
              </>
            }
          </div>

          <div className="purchase__controls">
            <Button
              className={classNames('button product-actions__cart-button', {
                'is-active': isAdded,
              })}
              onClick={addToCart}
            >
              {isAdded 
                ? (t('product.addedToCart') || 'Added to cart') 
                : (t('product.addToCart') || 'Add to cart')}
            </Button>

            <Button
              className="button__icon button--lg product-actions__favorite-button"
              onClick={toggleFavorite}
            >
              <Icon
                name={isFavorite ? 'heartFilled' : 'heart'}
                className={classNames({ 'text--accent-secondary': isFavorite })}
              />
            </Button>
          </div>
        </div>

        <div className="product-actions__short-specs short-specs">
          <ul className="short-specs__list">
            {specsConfig.slice(0, 4).map((spec) => {
              return (
                <li
                  key={spec.label}
                  className="short-specs__item"
                >
                  <span className="short-specs__name">{getSpecLabel(spec.label)}</span>
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