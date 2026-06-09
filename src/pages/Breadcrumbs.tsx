import React from 'react';
import { Icon } from '@/shared/components/Icon';
import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';

type Props = {
  page: string;
};

export const Breadcrumbs: React.FC<Props> = ({ page }) => {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <Link to="/">
          <Icon name="home" />
        </Link>
        <span className="icon">›</span>
        <span className="page">{page}</span>
      </div>
    </div>
  );
};
