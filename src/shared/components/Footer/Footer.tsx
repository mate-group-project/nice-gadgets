import './Footer.scss';
import { Button } from '@base-ui/react';
import { Icon } from '../Icon';
import { NavLink, Link } from 'react-router-dom';

type FooterProps = {
  theme: string;
};

export const Footer = ({ theme }: FooterProps) => {
  return (
    <div className="footer">
      <div className="logo">
        <NavLink
          to="/"
          onClick={() => window.scrollTo(0, 0)}
        >
          {theme === 'light' ?
            <img
              src="/dark-logo.png"
              className="log"
              alt="logo"
            />
          : <img
              src="/light-logo.png"
              className="log"
              alt="logo"
            />
          }
        </NavLink>
      </div>

      <div className="info">
        <Link
          to="https://github.com/mate-group-project/nice-gadgets/tree/main"
          className="contact"
          target="blank"
        >
          github
        </Link>

        <Link
          to="/about"
          className="contact"
        >
          about
        </Link>

        <Link
          to="/contacts"
          className="contact"
        >
          contacts
        </Link>

        <Link
          to="/rights"
          className="contact"
        >
          rights
        </Link>
      </div>
      <div className="footer__container">
        <a
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ cursor: 'pointer' }}
          className="back"
        >
          Back to top
        </a>
        <Button
          className="button__icon button--lg"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {' '}
          <Icon name="chevronUp" />{' '}
        </Button>
      </div>
    </div>
  );
};
