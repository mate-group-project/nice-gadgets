import './Header.scss';
import { NavLink } from 'react-router-dom';
import { Navigation } from '@/shared/components/Header/Navigation.tsx';
import { Actions } from '@/shared/components/Header/Actions.tsx';
import { Menu } from '@/shared/components/Header/Menu.tsx';

type HeaderProps = {
  theme: string;
  onToggleTheme: () => void;
}

export const Header = ({ theme, onToggleTheme }: HeaderProps) => {
  return (
    <header className="header">
      <NavLink
        to="/"
        className="header__logo logo__link"
      >
        {theme === 'light' ? (
          <img
            src="/dark-logo.png"
            alt="logo"
            width="404"
            height="145"
            className="logo__image"
          />
        ) : (
          <img
            src="/light-logo.png"
            alt="logo"
            width="404"
            height="145"
            className="logo__image"
          />
        )}
      </NavLink>

      <div className="header__nav">
        <Navigation />
      </div>

      <div className="header__actions">
        <Actions theme={theme} onToggleTheme={onToggleTheme} />
      </div>

      <div className="header__menu">
        <Menu />
      </div>
    </header>
  );
};
