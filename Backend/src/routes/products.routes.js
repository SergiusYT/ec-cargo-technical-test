const { Router } = require('express');
const { getProducts, searchProductsCtrl, createProductCtrl } = require('../controllers/products.controller');
const authMiddleware = require('../middlewares/authMiddleware'); //Autentificacion

const router = Router();

//Pongo rutas de todos los metodos que se encuentran en el controller para la interaccion con la API
router.get('/', getProducts); //GETAll
router.get('/search', searchProductsCtrl); //Get con filtro
router.post('/', authMiddleware, createProductCtrl); //Post para crear un producto pero ahora protegido

module.exports = router;