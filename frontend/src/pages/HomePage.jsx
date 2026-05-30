import { useState } from 'react';
import useProducts from '../hooks/useProducts';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import Spinner from '../components/Spinner';
import SearchBar from '../components/SearchBar';

const HomePage = ({ preloadedProducts }) => {
  const { products, loading, error, addProduct, searchProducts } = useProducts(preloadedProducts);
  const [spinnerDone, setSpinnerDone] = useState(false);

  const showSpinner = loading || !spinnerDone;

  return (
    <div className="home-page">
      {/* Spinner — aparece encima de todo mientras carga */}
      {showSpinner && (
        <Spinner
          minMs={2500}
          onDone={() => setSpinnerDone(true)}
        />
      )}

      <h1>Sistema de Inventario</h1>
      <div className="home-layout">

        <aside className="home-sidebar">
          <ProductForm onSubmit={addProduct} loading={loading} />
        </aside>

        <main className="home-content">
          <SearchBar onSearch={searchProducts} loading={loading} />
          {error && <div className="error-banner">{error}</div>}
          {products.length === 0 ? (
            <p className="empty-message">No hay productos disponibles</p>
          ) : (
            <ProductTable products={products} />
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;