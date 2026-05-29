const { getAllProducts, searchProducts, createProduct } = require('../services/products.service');

const getProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const searchProductsCtrl = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Query param q is required' });
    }

    const products = await searchProducts(q);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const createProductCtrl = async (req, res, next) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts, searchProductsCtrl, createProductCtrl };