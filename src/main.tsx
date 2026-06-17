import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router.tsx';
import { TranslationProvider } from './shared/context/TranslationContext.tsx';


createRoot(document.getElementById('root')!).render(
  <TranslationProvider>
    <RouterProvider router={router}/>,
  </TranslationProvider>
);
