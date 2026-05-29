const fakeStoreClient = require('../config/axios'); //traigo la API que deje en exios.js

const localProducts = []; // productos creados en esta sesión


/*ENDPOINTS*/

//Obtengo todos los productos directamente desde la API
//GET /products
const getAllProducts = async () => {
  const { data } = await fakeStoreClient.get('/products'); //peticion

  const fakeProducts = data.map(product => ({
    id: product.id,
    name: product.title,
    category: product.category,
    price: parseFloat((product.price * 1.19).toFixed(2)), // impuesto 19%
    stock: Math.floor(Math.random() * 20) + 1, // Fake Store no tiene stock
  }));
    return [...fakeProducts, ...localProducts]; // combina los productos de la API con los que vayamos creando en la sesión
};

//Filtrar los productos mediante coincidencia
//POST /products
const searchProducts = async (query) => {
  const products = await getAllProducts(); //peticion
  return products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) //filtro
  );
};


//Registrar un producto
//POST /products

const createProduct = async (productData) => {
  const { name, category, price, stock } = productData; //propiedades minimas requeridas en el producto
//       nombre   categoria   precio  disponibilidad

// Validaciones que hago para el registro de un producto
  if (!name || !category || !price || stock === undefined) { //valido si los campos estan llenos
    const error = new Error('Todos los campos son obligatorios');
    error.status = 400;
    throw error;
  }

//validacion que realice para determinar valores positivos en los valores de precio y cantidad (stock)
  if (price < 0 || stock < 0) {
    const error = new Error('El precio y las existencias deben ser valores positivos');
    error.status = 400;
    throw error;
  }

  // Validacion de duplicado por nombre, identificar si el producto existe ya
  const existingProducts = await getAllProducts();
  const duplicate = existingProducts.find(
    product => product.name.toLowerCase() === name.toLowerCase()
  );

  if (duplicate) {
    const error = new Error(`El producto "${name}" ya existe`);
    error.status = 409; // 409 Conflict
    throw error;
  }

// peticion POST a  la API Fake Store como intermediario
  await fakeStoreClient.post('/products', { //aca realizo la petición
    title: name,
    category,
    price,
  });

  /* Como la API es falsa, los datos no persisten realmente enntonces decidi
  guardar los productos que creemos localmente mientras el servidor este en ejecucion
  me refiero que los productos persistiran solo en sesion despues de apagar el server, se pierden*/

  //NOTA: Si quisieramos una persistencia de datos mas robustas seria la opcion A directamnete a una Base de datos
  const newProduct = {
    id: existingProducts.length + 1,
    name,
    category,
    price: parseFloat((price * 1.19).toFixed(2)),
    stock,
  };


  localProducts.push(newProduct);
  return newProduct;
};

module.exports = { getAllProducts, searchProducts, createProduct };