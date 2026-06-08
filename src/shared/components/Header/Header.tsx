import React from 'react';
import cn from 'classnames';
import './Header.scss';
import { Icon } from '@/shared/components/Icon';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useScrolled } from '@/shared/hooks/useScrolled.ts';

const SCROLL_OFFSET = 20;

export const Header: React.FC = () => {
  const isScrolled = useScrolled(SCROLL_OFFSET);
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category');

  return (
    <header
      className={cn('header', {
        'header--scrolled': isScrolled,
      })}
    >
      <NavLink
        to="/"
        className="header__logo logo__link"
      >
        <img
          src="/logo.png"
          alt="logo"
          width="404"
          height="145"
          className="logo__image"
        />
      </NavLink>
      <ul className="header__nav nav">
        <li className="nav__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn('nav__link', {
                'nav__link--active': isActive,
              })
            }
          >
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/catalog?category=phones"
            className={cn('nav__link', {
              'nav__link--active': category === 'phones',
            })}
          >
            Phones
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/catalog?category=tablets"
            className={cn('nav__link', {
              'nav__link--active': category === 'tablets',
            })}
          >
            Tablets
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/catalog?category=accessories"
            className={cn('nav__link', {
              'nav__link--active': category === 'accessories',
            })}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
      <ul className="header__actions actions">
        <li className="actions__item">
          <NavLink
            to="/favorites"
            className="actions__link"
          >
            <Icon name="heart" />
          </NavLink>
        </li>
        <li className="actions__item">
          <NavLink
            to="/cart"
            className="actions__link"
          >
            <Icon name="bag" />
          </NavLink>
        </li>
      </ul>
    </header>
  );
};
