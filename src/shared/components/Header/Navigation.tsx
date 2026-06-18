import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import './Navigation.scss';
import { useTranslation } from '@/features/translations/hooks/useTranslation.ts';

interface Props {
  className?: string;
  onNavigate?: () => void;
}

export const Navigation = ({ className = '', onNavigate }: Props) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { t } = useTranslation();

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
          {t('header.home')}
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
          {t('header.phones')}
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
          {t('header.tablets')}
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
          {t('header.accessories')}
        </NavLink>
      </li>
    </ul>
  );
};
