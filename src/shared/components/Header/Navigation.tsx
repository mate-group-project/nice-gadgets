import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import './Navigation.scss';

interface Props {
  className?: string;
}

export const Navigation = ({ className = '' }: Props) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  return (
    <ul className={cn('nav', className)}>
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
  );
};
