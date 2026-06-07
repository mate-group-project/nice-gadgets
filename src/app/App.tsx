import './App.scss';
import { Header } from '@/shared/components/Header';

import { Footer } from '@/shared/components/Footer';
import { HomePage } from '@/pages/HomePage.tsx';

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>

      <div className="app__content">
        ------------- content from pages here // use Outlet instead HomePage
        -------------
        <HomePage />
      </div>
      <div className="app__footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
