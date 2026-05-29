const { getAllProducts, searchProducts, createProduct } = require('../services/products.service');

/*El controller como me gusta llamar el Orquestador de todo, es el que nos ayudara a manejar todo
este llamara todos los servicios necesarios y enviara las respuestas*/ 

const getProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts(); //servicio que tengo en Service
    res.json(products); //respuesta en JSON
  } catch (err) {
    next(err);
  }
};

const searchProductsCtrl = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) { //valido si tiene parametro (el producto a buscar y filtrar)
      return res.status(400).json({ error: 'Se requiere el parámetro de la consulta' });
    }

    const products = await searchProducts(q); //busca en el servicio que cree en service
    res.json(products); //responde en formato json
  } catch (err) {
    next(err);
  }
};

const createProductCtrl = async (req, res, next) => {
  try {
    const product = await createProduct(req.body); //basicamente traigo el cuerpo de la peticion del usuario, en este caso lo que quiere crear el Input, lo que recibira el API
    res.status(201).json(product); //respuesta en json con un status 201 que significa operacion exitosa
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts, searchProductsCtrl, createProductCtrl };