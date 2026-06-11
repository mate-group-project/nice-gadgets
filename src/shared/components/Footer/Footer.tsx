import React from 'react';
import './Footer.scss';
import { Button } from '@base-ui/react';
import { Icon } from '../Icon';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="logo">
        <a href="#">
          <img
            src="/logo.png"
            className="log"
            alt="logo"
          />
        </a>
      </div>

      <div className="info">
        <a
          href="https://github.com/mate-group-project/nice-gadgets/tree/main"
          className="contact"
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
          href="#"
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
