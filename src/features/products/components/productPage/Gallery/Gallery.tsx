import * as React from 'react';
import mainPhoto from '@/assets/img/category-phones.png';
import thumb from '@/assets/img/category-slide-phone.png';
import './gallery.scss';

export const Gallery: React.FC = () => {
  return (
    <div className="product-page__gallery gallery">
      <div className="gallery__thumbnails">
        <a
          href="#"
          className="gallery__thumb"
        >
          <img
            src={thumb}
            alt="Thumbnail 1"
          />
        </a>
        <a
          href="#"
          className="gallery__thumb"
        >
          <img
            src={thumb}
            alt="Thumbnail 2"
          />
        </a>
        <a
          href="#"
          className="gallery__thumb"
        >
          <img
            src={thumb}
            alt="Thumbnail 3"
          />
        </a>
        <a
          href="#"
          className="gallery__thumb"
        >
          <img
            src={thumb}
            alt="Thumbnail 4"
          />
        </a>
        <a
          href="#"
          className="gallery__thumb"
        >
          <img
            src={thumb}
            alt="Thumbnail 5"
          />
        </a>
      </div>

      <div className="gallery__main">
        <img
          className="gallery__main-image"
          src={mainPhoto}
          alt="Apple iPhone 11 Pro Max"
        />
      </div>
    </div>
  );
};
