import React from 'react';
import './Header.scss';
import { Icon } from '@/shared/components/Icon';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/catalog?category=phones">Phones</NavLink>
        <NavLink to="/catalog?category=tablets">Tablets</NavLink>
        <NavLink to="/catalog?category=accessories">Accessories</NavLink>
        test
      </div>
      <div className="nav">
        <NavLink to="/favorites">
          <Icon name="heart" />
        </NavLink>
        <NavLink to="/cart">
          <Icon name="bag" />
        </NavLink>
      </div>
    </div>
  );
};
