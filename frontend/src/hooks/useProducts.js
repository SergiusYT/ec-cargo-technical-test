import { useState, useEffect } from 'react';
import { getProducts, createProduct, searchProducts as searchProductsAPI } from '../services/products.service';

const MIN_LOADING_MS = 2500;

const useProducts = (preloadedProducts = []) => {
  const [products, setProducts] = useState(preloadedProducts);
  const [loading, setLoading] = useState(preloadedProducts.length === 0);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const withMinLoading = async (fn) => {
    const start = Date.now();
    try {
      await fn();
    } finally {
      const remaining = MIN_LOADING_MS - (Date.now() - start);
      if (remaining > 0) await new Promise(r => setTimeout(r, remaining));
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    await withMinLoading(async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setProducts([]); // sin backend: lista vacía, sin error visible
      }
    });
  };

  useEffect(() => {
    if (preloadedProducts.length === 0) fetchProducts();
  }, []);

  const addProduct = async (productData) => {
    setLoading(true);
    setError(null);
    let result;
    await withMinLoading(async () => {
      try {
        const newProduct = await createProduct(productData);
        setProducts(prev => [...prev, newProduct]);
        result = { success: true };
      } catch (err) {
        const message = err.response?.data?.error || 'Error al crear el producto';
        setError(message);
        result = { success: false, message };
      }
    });
    return result;
  };

  const searchProducts = async (query) => {
    setLoading(true);
    setError(null);
    await withMinLoading(async () => {
      try {
        const data = query ? await searchProductsAPI(query) : await getProducts();
        setSearchQuery(query || '');
        setProducts(data);
      } catch {
        setError('Error al buscar productos');
      }
    });
  };

  return { products, loading, error, fetchProducts, addProduct, searchProducts };
};

export default useProducts;