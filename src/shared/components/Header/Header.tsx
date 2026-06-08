import React from 'react';
import './Header.scss';
import { Icon } from '@/shared/components/Icon';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="nav">
        <a href="/">Home</a>
        <a href="/catalog?category=phones">Phones</a>
        <a href="/catalog?category=tablets">Tablets</a>
        <a href="/catalog?category=accessories">Accessories</a>
        test
      </div>
      <div className="nav">
        <a href="/favorites">
          <Icon name="heart" />
        </a>
        <a href="/cart">
          <Icon name="bag" />
        </a>
      </div>
    </div>
  );
};
