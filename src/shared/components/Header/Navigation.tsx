import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import './Navigation.scss';

interface Props {
  className?: string;
  onNavigate?: () => void;
}

export const Navigation = ({ className = '', onNavigate }: Props) => {
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
          onClick={onNavigate}
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
          onClick={onNavigate}
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
         onClick={onNavigate}
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
          onClick={onNavigate}
        >
          Accessories
        </NavLink>
      </li>
    </ul>
  );
};
