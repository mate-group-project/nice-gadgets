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
          href="#"
          className="contact"
        >
          github
        </a>

        <a
          href="#"
          className="contact"
        >
          contacts
        </a>

        <a
          href="#"
          className="contact"
        >
          rights
        </a>
      </div>
      <div className="container">
        <a
          href="#"
          className="back"
        >
          Back to top
        </a>
          <Button className="button__icon button--lg" onClick={() => {}} disabled > <Icon name="chevronUp" /> </Button>
      </div>
    </div>
  );
};
