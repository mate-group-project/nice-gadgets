import React from 'react';
import './CategoryCard.scss';


type Props = {
  image: string,
};

export const CategoryCard: React.FC<Props> = ({image}) => {
  return (
     <article className="category__card">
        <img src={image} className='phone'/>
     </article>
  )
};
