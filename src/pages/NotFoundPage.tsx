import * as React from 'react';
import { Link } from 'react-router-dom';
import './NotFountPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Page not found</p>
      <Link
        to="/"
        className="not-found__link"
      >
        Go back to home
      </Link>
    </div>
  );
};
