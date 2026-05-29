const { Router } = require('express');
const { getProducts, searchProductsCtrl, createProductCtrl } = require('../controllers/products.controller');

const router = Router();

//Pongo rutas de todos los metodos que se encuentran en el controller para la interaccion con la API
router.get('/', getProducts); //GETAll
router.get('/search', searchProductsCtrl); //Get con filtro
router.post('/', createProductCtrl); //Post para crear un producto

module.exports = router;