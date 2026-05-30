import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import WelcomeScreen from './components/WelcomeScreen';
import { getProducts } from './services/products.service';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [fading, setFading] = useState(false);
  const [preloadedProducts, setPreloadedProducts] = useState([]);

  useEffect(() => {
    getProducts().then(data => setPreloadedProducts(data)).catch(() => {});
  }, []);

  const handleFinish = () => {
    setFading(true);
    setTimeout(() => setShowWelcome(false), 1000);
  };

  return (
    <>
      {/* HomePage siempre montada, solo invisible detrás del welcome */}
      <div style={{ visibility: showWelcome ? 'hidden' : 'visible' }}>
        <HomePage preloadedProducts={preloadedProducts} />
      </div>

      {/* Welcome encima, desaparece con fade */}
      {showWelcome && (
        <WelcomeScreen onFinish={handleFinish} fading={fading} />
      )}
    </>
  );
};

export default App;