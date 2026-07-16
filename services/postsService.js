const pool = require('../db/pool');

async function getAllPosts() {
  const result = await pool.query('SELECT * FROM posts ORDER BY id');
  return result.rows;
}

async function getPostById(id) {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];
}

async function getPostsByAuthorId(authorId) {
  const result = await pool.query('SELECT * FROM posts WHERE author_id = $1 ORDER BY id', [authorId]);
  return result.rows;
}

async function createPost({ title, content, author_id, published }) {
  const result = await pool.query(
    `INSERT INTO posts (title, content, author_id, published)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, content, author_id, published || false]
  );
  return result.rows[0];
}

async function updatePost(id, { title, content, author_id, published }) {
  const result = await pool.query(
    `UPDATE posts
     SET title = COALESCE($1, title),
         content = COALESCE($2, content),
         author_id = COALESCE($3, author_id),
         published = COALESCE($4, published)
     WHERE id = $5
     RETURNING *`,
    [title, content, author_id, published, id]
  );
  return result.rows[0];
}

async function deletePost(id) {
  const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByAuthorId,
  createPost,
  updatePost,
  deletePost,
};