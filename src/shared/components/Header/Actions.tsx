import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Icon } from '@/shared/components/Icon';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuthUser } from '@/shared/hooks/useAuthUser';
import './Actions.scss';
import {
  useCart,
  useFavorites,
} from '@/features/products/hooks/useLocalStorageList';

interface Props {
  className?: string;
  onNavigate?: () => void;
  theme: string;
  onToggleTheme: () => void;
}

export const Actions = ({
  className = '',
  onNavigate,
  theme,
  onToggleTheme,
}: Props) => {
  const { items: cart } = useCart();
  const { items: favorites } = useFavorites();

  const location = useLocation();
  const isAccountPage = location.pathname === '/account';

  const user = useAuthUser();

  return (
    <ul className={cn('actions', className)}>
      <li className="actions__item actions__item--lang">
        <LanguageSwitcher onLanguageSelect={onNavigate} />
      </li>

      <li className="actions__item">
        <button
          type="button"
          className="actions__link"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <Icon name={theme === 'light' ? 'moon' : 'sun'} />
        </button>
      </li>
      <li className="actions__item">
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            cn('actions__link', {
              'actions__link--active': isActive,
            })
          }
          onClick={onNavigate}
        >
          <Icon name="heart" />
          {favorites.length > 0 && (
            <span className="actions__badge">{favorites.length}</span>
          )}
        </NavLink>
      </li>
      <li className="actions__item">
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            cn('actions__link', {
              'actions__link--active': isActive,
            })
          }
          onClick={onNavigate}
        >
          <Icon name="bag" />
          {cart.filter(Boolean).length > 0 && (
            <span className="actions__badge">
              {cart.filter(Boolean).length}
            </span>
          )}
        </NavLink>
      </li>
      {user ?
        <li className="actions__item actions__profile">
          <NavLink
            to="/account"
            className={cn('actions__link actions__profile-trigger', {
              'actions__link--active': isAccountPage,
            })}
            onClick={onNavigate}
          >
            {user.customer?.firstName ?
              <div className="actions__avatar">
                {user.customer.firstName[0]}
                {user.customer.lastName?.[0]}
              </div>
            : <Icon name="user" />}
          </NavLink>

          <div className="actions__dropdown">
            <div className="actions__dropdown-user">
              {user.customer?.firstName} {user.customer?.lastName}
            </div>
            <NavLink
              to="/account"
              className="actions__dropdown-link"
              onClick={onNavigate}
            >
              My Profile
            </NavLink>
            <button
              type="button"
              className="actions__dropdown-btn"
              onClick={() => {
                localStorage.removeItem('currentUser');
                window.location.href = '/';
              }}
            >
              Log out
            </button>
          </div>
        </li>
      : <li className="actions__item">
          <NavLink
            to="/auth?mode=login"
            className="actions__link"
            onClick={onNavigate}
          >
            <Icon name="user" />
          </NavLink>
        </li>
      }
    </ul>
  );
};
