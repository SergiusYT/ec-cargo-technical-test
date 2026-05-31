const AUTH_TOKEN = process.env.AUTH_TOKEN || 'ec-cargos-secret-token';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader;

  if (token !== AUTH_TOKEN) {
    return res.status(403).json({ error: 'Token inválido' });
  }

  next();
};

module.exports = authMiddleware;