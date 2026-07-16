const pool = require('../db/pool');

async function getAllAuthors() {
  const result = await pool.query('SELECT * FROM authors ORDER BY id');
  return result.rows;
}

async function getAuthorById(id) {
  const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
  return result.rows[0];
}

async function createAuthor({ name, email, bio }) {
  const result = await pool.query(
    'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
    [name, email, bio || null]
  );
  return result.rows[0];
}

async function updateAuthor(id, { name, email, bio }) {
  const result = await pool.query(
    `UPDATE authors
     SET name = COALESCE($1, name),
         email = COALESCE($2, email),
         bio = COALESCE($3, bio)
     WHERE id = $4
     RETURNING *`,
    [name, email, bio, id]
  );
  return result.rows[0];
}

async function deleteAuthor(id) {
  const result = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

async function emailExists(email, excludeId = null) {
  const result = excludeId
    ? await pool.query('SELECT id FROM authors WHERE email = $1 AND id != $2', [email, excludeId])
    : await pool.query('SELECT id FROM authors WHERE email = $1', [email]);
  return result.rows.length > 0;
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  emailExists,
};