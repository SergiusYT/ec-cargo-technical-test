import useProducts from '../hooks/useProducts';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import Spinner from '../components/Spinner';
import SearchBar from '../components/SearchBar';

const HomePage = ({ preloadedProducts }) => {
  const { products, loading, error, addProduct, searchProducts } = useProducts(preloadedProducts);

  return (
    <div className="home-page">
      <h1>Sistema de Inventario</h1>
      <div className="home-layout">

        {/* Columna izquierda - Formulario */}
        <aside className="home-sidebar">
          <ProductForm onSubmit={addProduct} loading={loading} />
        </aside>

        {/* Columna derecha - Buscador y Tabla */}
        <main className="home-content">
          <SearchBar onSearch={searchProducts} loading={loading} />
          {error && <div className="error-banner">{error}</div>}
          {loading ? (
            <Spinner />
          ) : products.length === 0 ? (
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