import { useState, useEffect } from 'react';
import { getProducts, createProduct, searchProducts } from '../services/products.service';

const useProducts = (preloadedProducts = []) => {
  const [products, setProducts] = useState(preloadedProducts);
  const [loading, setLoading] = useState(preloadedProducts.length === 0);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (preloadedProducts.length === 0) {
      fetchProducts();
    }
  }, []);


  const addProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const newProduct = await createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Error al crear el producto';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };


  const [searchQuery, setSearchQuery] = useState('');

    const searchProducts = async (query) => {
    setLoading(true);
    setError(null);
    try {
        let data;
        if (query) {
        data = await searchProductsAPI(query); // tu servicio
        setSearchQuery(query);
        } else {
        data = await getProducts();
        setSearchQuery('');
        }
        setProducts(data);
    } catch (err) {
        setError('Error al buscar productos');
    } finally {
        setLoading(false);
    }
    };

  return { products, loading, error, fetchProducts, addProduct, searchProducts };
};


export default useProducts;