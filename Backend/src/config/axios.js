const axios = require('axios');

const fakeStoreClient = axios.create({
  baseURL: 'https://fakestoreapi.com', 
  /*API que me sugerieron para implementar usaremos la base de la URL
   para el resto de peticiones*/
  timeout: 5000,
});

module.exports = fakeStoreClient; 
//para que tengamos acceso en otros archivos para hacer las peticiones