import React from 'react';
import './Pagination.scss';

import { Button } from '@base-ui/react';
import { Icon } from '../Icon';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const getPages = (current: number, total: number) => {
  const delta = 1;

  const range: number[] = [];
  const rangeWithDots: (number | string)[] = [];

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }

  if (current - delta > 2) {
    rangeWithDots.push(1, '...');
  } else {
    rangeWithDots.push(1);
  }

  rangeWithDots.push(...range);

  if (current + delta < total - 1) {
    rangeWithDots.push('...', total);
  } else {
    rangeWithDots.push(total);
  }

  return rangeWithDots;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pagesArray = getPages(currentPage, totalPages);

  return (
    <div className="pagination">
      <Button
        className="button__icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon name="chevronLeft" />
      </Button>

      {pagesArray.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`dots-${index}`} className="pagination__dots">
              ...
            </span>
          );
        }

        return (
          <Button
            key={page}
            className={`button__icon ${
              currentPage === page ? 'is-active' : ''
            }`}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </Button>
        );
      })}

      <Button
        className="button__icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon name="chevronRight" />
      </Button>
    </div>
  );
};