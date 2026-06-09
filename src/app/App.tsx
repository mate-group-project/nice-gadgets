import './App.scss';
import { Header } from '@/shared/components/Header';

import { Footer } from '@/shared/components/Footer';
import { Outlet } from 'react-router-dom';
import { UIKIT } from '@/shared/components/UIKIT';

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>

      <div className="app__content">
        <Outlet />
      </div>
      <div className="app__footer">
        <Footer />
      </div>
      <UIKIT />
    </div>
  );
}

export default App;
