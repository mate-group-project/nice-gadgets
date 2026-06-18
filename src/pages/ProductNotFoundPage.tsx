import './ProductNotFoundPage.scss';
import { Link, useParams } from 'react-router-dom';

const getCatalogPath = (slug = '') => {
  const normalizedSlug = slug.toLowerCase();

  if (normalizedSlug.includes('ipad')) {
    return '/catalog?category=tablets';
  }

  if (normalizedSlug.includes('watch')) {
    return '/catalog?category=accessories';
  }

  return '/catalog?category=phones';
};

export const ProductNotFoundPage: React.FC = () => {
  const { slug } = useParams();

  const catalogPath = getCatalogPath(slug);

  return (
    <div className="product-not-found">
      <h1 className="product-not-found__title">404</h1>
      <p className="product-not-found__text">Product not found</p>
      <Link
        to={catalogPath}
        className="product-not-found__link"
      >
        Go back to catalogue
      </Link>
    </div>
  );
};
