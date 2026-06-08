import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { CatalogPage } from '@/pages/CatalogPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { CartPage } from '@/pages/CartPage';

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
      path: 'favorites',
        element: <FavoritesPage />,
      },

      {
        path: 'cart',
        element: <CartPage />
      }
    ],
  },
]);
