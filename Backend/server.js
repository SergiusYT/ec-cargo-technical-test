require('dotenv').config(); //Variables de entorno
const app = require('./src/app'); // importacion de la app express que cree en App.js

const PORT = process.env.PORT || 3000; //Usa el PORT de la variable de entorno si no es ese por defecto el 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); //Inicio de server
});


//Esto si es una prueba que hice para ver si la Api si se conectaba o no, pues en este caso si funciono
const fakeStoreClient = require('./src/config/axios');

fakeStoreClient.get('/products').then(res => {
  console.log('Fake Store connected, products count:', res.data.length);
}).catch(err => {
  console.error('Fake Store connection failed:', err.message);
});