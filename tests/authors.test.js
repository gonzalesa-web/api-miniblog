const request = require('supertest');
const app = require('../app');
const pool = require('../db/pool');

describe('Authors API', () => {
  afterAll(async () => {
    await pool.end();
  });

  test('POST /authors crea un nuevo author', async () => {
    const res = await request(app)
      .post('/authors')
      .send({
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        bio: 'Author de prueba'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test User');
  });

  test('POST /authors sin name ni email retorna 400', async () => {
    const res = await request(app)
      .post('/authors')
      .send({ bio: 'Falta name y email' });

    expect(res.statusCode).toBe(400);
  });

  test('GET /authors/:id obtiene un author existente', async () => {
    const created = await request(app)
      .post('/authors')
      .send({
        name: 'Author Para Obtener',
        email: `getme${Date.now()}@example.com`
      });

    const res = await request(app).get(`/authors/${created.body.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(created.body.id);
  });

  test('GET /authors/:id con id inexistente retorna 404', async () => {
    const res = await request(app).get('/authors/999999');
    expect(res.statusCode).toBe(404);
  });

  test('DELETE /authors/:id con id inexistente retorna 404', async () => {
    const res = await request(app).delete('/authors/999999');
    expect(res.statusCode).toBe(404);
  });
});