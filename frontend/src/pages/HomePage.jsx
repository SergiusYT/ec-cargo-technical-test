import useProducts from '../hooks/useProducts';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import Spinner from '../components/Spinner';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const { products, loading, error, addProduct, searchProducts } = useProducts();

  return (
    <div className="home-page">
      <h1>Sistema de Inventario</h1>

      <ProductForm onSubmit={addProduct} loading={loading} />

      <SearchBar onSearch={searchProducts} loading={loading} />

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <Spinner />
      ) : products.length === 0 ? (
        <p className="empty-message">No hay productos disponibles</p>
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
};

export default HomePage;