import React from 'react';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="nav">
        <a href="/">Home</a>
        <a href="/catalog?category=phones">Phones</a>
        <a href="/catalog?category=tablets">Tablets</a>
        <a href="/catalog?category=accessories">Accessories</a>
      </div>
      <div className="nav">
        <a href="/favorites">Fav</a>
        <a href="/cart">Cart</a>
      </div>
    </div>
  );
};
