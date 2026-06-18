import React from 'react';
import './CategoryCard.scss';

type Props = {
  image: string;
  title: string;
  count: number;
};

export const CategoryCard: React.FC<Props> = ({ image, title, count }) => {
  return (
    <article className="category__card">
      <div className="image-wrapper">
        <img
          src={image}
          className="phone"
        />
      </div>
      <h3>{title}</h3>
      <p>{count} models</p>
    </article>
  );
};
