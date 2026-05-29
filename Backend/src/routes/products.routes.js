const { Router } = require('express');
const { getProducts, searchProductsCtrl, createProductCtrl } = require('../controllers/products.controller');

const router = Router();

router.get('/', getProducts);
router.get('/search', searchProductsCtrl);
router.post('/', createProductCtrl);

module.exports = router;