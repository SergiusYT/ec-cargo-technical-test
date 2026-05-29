const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ error: message });
};

module.exports = errorHandler;

/*Esto lo hago para que capture cualquier error enviado con next(error) y devuelve
 una respuesta JSON limpia en lugar de que el servidor se caiga o muestre el error técnico al cliente.*/