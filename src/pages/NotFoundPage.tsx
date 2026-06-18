import * as React from 'react';
import { Link } from 'react-router-dom';
import './NotFountPage.scss';
import { useTranslation } from '@/features/translations/hooks/useTranslation';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">{t('notFound.title') || 'Page not found'}</p>
      <Link
        to="/"
        className="not-found__link"
      >
        {t('notFound.backToHome') || 'Go back to home'}
      </Link>
    </div>
  );
};