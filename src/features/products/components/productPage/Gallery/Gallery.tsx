import './gallery.scss';
import { useState } from 'react';
import type { ProductDetails } from '@/features/products/types/Product';
import classNames from 'classnames';
import { BASE_URL } from '@/shared/api/endpoints';

type GalleryProps = {
  product: ProductDetails,
}

export const Gallery = ({ product }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div className="product-page__gallery gallery">
      <div className="gallery__thumbnails">
        {product.images.map(image => {
          return (
            <button
              key={image}
              className={classNames('gallery__thumb', {
                'gallery__thumb--active': image === selectedImage,
              })}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={`${BASE_URL}/${image}`}
                alt={image}
              />
            </button>
          )
        })}
      </div>

      <div className="gallery__main">
        <img
          className="gallery__main-image"
          src={`${BASE_URL}/${selectedImage}`}
          alt={product.name}
        />
      </div>
    </div>
  );
};
