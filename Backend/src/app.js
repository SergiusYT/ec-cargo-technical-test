const express = require('express'); //Framework para poder contruir mi servidor
const cors = require('cors'); //para que me permita realizar peticiones de diferentes sitios en este caso a la API
const errorHandler = require('./middlewares/errorHandler'); //el errorHandler.js que tengo
const productRoutes = require('./routes/products.routes'); //routes

const app = express(); //crear la app express

app.use(cors());
app.use(express.json()); //Peticiones en JSON
app.use('/products', productRoutes); //Esto lo agrego para que funcione todo lo relacion con peticiones con la API

app.get('/health', (req, res) => {
  res.json({ status: 'ok' }); //Mini test para que pueda verficar si el server me responde
});

app.use(errorHandler);

module.exports = app;