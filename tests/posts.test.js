const request = require('supertest');
const app = require('../app');
const pool = require('../db/pool');

describe('Posts API', () => {
  let authorId;

  beforeAll(async () => {
    const author = await request(app)
      .post('/authors')
      .send({
        name: 'Author para Posts',
        email: `postsauthor${Date.now()}@example.com`
      });
    authorId = author.body.id;
  });

  afterAll(async () => {
    await pool.end();
  });

  test('POST /posts crea un nuevo post', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Post de prueba',
        content: 'Contenido de prueba',
        author_id: authorId,
        published: true
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Post de prueba');
  });

  test('POST /posts sin title/content/author_id retorna 400', async () => {
    const res = await request(app)
      .post('/posts')
      .send({ published: true });

    expect(res.statusCode).toBe(400);
  });

  test('POST /posts con author_id inexistente retorna 400', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Post inválido',
        content: 'Contenido',
        author_id: 999999
      });

    expect(res.statusCode).toBe(400);
  });

  test('GET /posts/:id con id inexistente retorna 404', async () => {
    const res = await request(app).get('/posts/999999');
    expect(res.statusCode).toBe(404);
  });

  test('DELETE /posts/:id con id inexistente retorna 404', async () => {
    const res = await request(app).delete('/posts/999999');
    expect(res.statusCode).toBe(404);
  });

  test('GET /posts/author/:authorId retorna author con sus posts', async () => {
    const res = await request(app).get(`/posts/author/${authorId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('author');
    expect(res.body).toHaveProperty('posts');
    expect(Array.isArray(res.body.posts)).toBe(true);
  });
});