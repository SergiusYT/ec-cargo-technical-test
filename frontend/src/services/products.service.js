import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_AUTH_TOKEN; //Token para autentificar

const api = axios.create({
  baseURL: API_URL,
});

export const getProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const createProduct = async (product) => {
  const { data } = await api.post('/products', product, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return data;
};

export const searchProducts = async (query) => {
  const { data } = await api.get(`/products/search?q=${query}`);
  return data;
};