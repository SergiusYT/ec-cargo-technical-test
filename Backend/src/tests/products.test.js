const request = require('supertest');
const app = require('../app');

const TOKEN = 'ec-cargos-secret-token';

describe('GET /products', () => {
  it('debe retornar un array de productos con status 200', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('cada producto debe tener las propiedades requeridas', async () => {
    const res = await request(app).get('/products');
    const product = res.body[0];
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('stock');
  });
});

describe('POST /products', () => {
  it('debe retornar 401 si no se envia token', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'Test', category: 'electronics', price: 100, stock: 5 });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Token requerido');
  });

  it('debe retornar 403 si el token es invalido', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', 'Bearer token-falso')
      .send({ name: 'Test', category: 'electronics', price: 100, stock: 5 });
    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Token inválido');
  });

  it('debe retornar 400 si faltan campos obligatorios', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({ name: 'Test' }); // faltan category, price, stock
    expect(res.status).toBe(400);
  });

  it('debe retornar 400 si el precio es negativo', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({ name: 'Test', category: 'electronics', price: -10, stock: 5 });
    expect(res.status).toBe(400);
  });

  it('debe retornar 400 si el stock es negativo', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({ name: 'Test', category: 'electronics', price: 100, stock: -1 });
    expect(res.status).toBe(400);
  });
});

describe('GET /products/search', () => {
  it('debe retornar 400 si no se envia el parametro q', async () => {
    const res = await request(app).get('/products/search');
    expect(res.status).toBe(400);
  });

  it('debe retornar un array al buscar con parametro valido', async () => {
    const res = await request(app).get('/products/search?q=jacket');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});