import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Icon } from '@/shared/components/Icon';
import './Actions.scss';

interface Props {
  className?: string;
  onNavigate?: () => void;
}

export const Actions = ({ className = '', onNavigate }: Props) => {
  return (
    <ul className={cn('actions', className)}>
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
        </NavLink>
      </li>
    </ul>
  );
};
