import React from 'react';
import './Footer.scss';
import { Button } from '@base-ui/react';
import { Icon } from '../Icon';
import { NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="logo">
        <NavLink
          to="/"
          onClick={() => window.scrollTo(0, 0)}
        >
          <img
            src="/logo.png"
            className="log"
            alt="logo"
          />
        </NavLink>
      </div>

      <div className="info">
        <a
          href="https://github.com/mate-group-project/nice-gadgets/tree/main"
          className="contact"
          target="blank"
        >
          github
        </a>

        <a
          href="/contact"
          className="contact"
        >
          contacts
        </a>

        <a
          href="/rights"
          className="contact"
        >
          rights
        </a>
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
