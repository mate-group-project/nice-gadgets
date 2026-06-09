import * as React from 'react';
import { Button } from '@base-ui/react';
import { Icon } from '@/shared/components/Icon';
import './productAction.scss';

export const ProductActions: React.FC = () => {
  return (
    <div className="product-page__actions product-actions">
      <div className="product-actions__content">
        <div className="product-actions__selection">
          <div className="product-actions__selection-header">
            <span className="product-actions__selection-title">
              Available colors
            </span>
            <span className="product-actions__id">ID: 802390</span>
          </div>
          <div className="product-actions__color-options">
            <a
              href="#"
              className="product-actions__color-option product-actions__color-option--pink"
              title="Pink"
            ></a>
            <a
              href="#"
              className="product-actions__color-option product-actions__color-option--dark-green"
              title="Dark Green"
            ></a>
            <a
              href="#"
              className="product-actions__color-option product-actions__color-option--dark-grey"
              title="Dark Grey"
            ></a>
            <a
              href="#"
              className="product-actions__color-option product-actions__color-option--light-grey"
              title="Light Grey"
            ></a>
          </div>
        </div>

        <div className="product-actions__selection">
          <span className="product-actions__selection-title">
            Select capacity
          </span>

          <div className="product-actions__capacity-options">
            <a
              href="#"
              className="product-actions__capacity-option capacity-btn capacity-btn--active"
            >
              64 GB
            </a>

            <a
              href="#"
              className="product-actions__capacity-option capacity-btn"
            >
              256 GB
            </a>

            <a
              href="#"
              className="product-actions__capacity-option capacity-btn"
            >
              512 GB
            </a>
          </div>
        </div>

        <div className="product-actions__purchase purchase">
          <div className="purchase__price">
            <span className="purchase__price-current">$799</span>
            <span className="purchase__price-old">$1199</span>
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
              onClick={() => {}}
            >
              <Icon name="heart" />
            </Button>
          </div>
        </div>

        <div className="product-actions__short-specs short-specs">
          <ul className="short-specs__list">
            <li className="short-specs__item">
              <span className="short-specs__name">Screen</span>
              <span className="short-specs__value">6.5” OLED</span>
            </li>
            <li className="short-specs__item">
              <span className="short-specs__name">Resolution</span>
              <span className="short-specs__value">2688x1242</span>
            </li>
            <li className="short-specs__item">
              <span className="short-specs__name">Processor</span>
              <span className="short-specs__value">Apple A12 Bionic</span>
            </li>
            <li className="short-specs__item">
              <span className="short-specs__name">RAM</span>
              <span className="short-specs__value">3 GB</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
