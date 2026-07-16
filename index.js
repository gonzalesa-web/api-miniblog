require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const authorsRoutes = require('./routes/authors');
const postsRoutes = require('./routes/posts');

app.use('/authors', authorsRoutes);
app.use('/posts', postsRoutes);

// Middleware para capturar JSON mal formado
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON mal formado en el body' });
  }
  next(err);
});

// Middleware global de manejo de errores (debe ir al final)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});