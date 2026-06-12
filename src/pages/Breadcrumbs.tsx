import React from 'react';
import { Icon } from '@/shared/components/Icon';
import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';

type Crumb = {
  label: string;
  url?: string;
};

type Props = {
  crumbs: Crumb[];
};

export const Breadcrumbs: React.FC<Props> = ({ crumbs = [] }) => {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <Link to="/">
          <Icon
            className="container__icon"
            name="home"
          />
        </Link>
        {crumbs.map((crumb) => (
          <React.Fragment key={crumb.label}>
            <span className="icon">›</span>
            {crumb.url ?
              <Link
                to={crumb.url}
                className="page"
              >
                {crumb.label}
              </Link>
            : <span className="page">{crumb.label}</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
