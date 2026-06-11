import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { CatalogPage } from '@/pages/CatalogPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { CartPage } from '@/pages/CartPage';
import { ProductPage } from '@/pages/ProductPage.tsx';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RightPage } from '@/pages/RightPage';

// routes
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: 'catalog',
        element: <CatalogPage />,
      },

      {
        path: 'product/:slug',
        element: <ProductPage />,
      },

      {
        path: 'favorites',
        element: <FavoritesPage />,
      },

      {
        path: 'cart',
        element: <CartPage />,
      },

      {
        path: '*',
        element: <NotFoundPage />,
      },

      {
        path: 'rights',
        element: <RightPage />,
      },
    ],
  },
]);
