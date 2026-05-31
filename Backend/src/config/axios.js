const axios = require('axios');

const fakeStoreClient = axios.create({
  baseURL: 'https://fakestoreapi.com', 
  /*API que me sugerieron para implementar usaremos la base de la URL
   para el resto de peticiones*/
  timeout: 5000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
});

module.exports = fakeStoreClient; 
//para que tengamos acceso en otros archivos para hacer las peticiones