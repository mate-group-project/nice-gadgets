import './App.scss';
import { Header } from '@/shared/components/Header';

import { Footer } from '@/shared/components/Footer';
import { Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/shared/components/ScrollToTop';
import { useEffect, useState } from 'react';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-item') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app">
      <div className="app__header">
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      </div>

      <ScrollToTop />

      <div className="app__content">
        <Outlet />
      </div>

      <div className="app__footer">
        <Footer theme={theme} />
      </div>
    </div>
  );
}

export default App;
