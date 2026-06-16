import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Icon } from '@/shared/components/Icon';
import { LanguageSwitcher } from './LanguageSwitcher';
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

export const Actions = ({ className = '', onNavigate, theme, onToggleTheme }: Props) => {
  const { items: cart } = useCart();
  const { items: favorites } = useFavorites();

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
    </ul>
  );
};