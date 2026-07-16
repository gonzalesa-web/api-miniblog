require('dotenv').config();
const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yaml');

app.use(express.json());

const authorsRoutes = require('./routes/authors');
const postsRoutes = require('./routes/posts');
const { jsonParseErrorHandler, globalErrorHandler } = require('./middlewares/errorHandler');

app.use('/authors', authorsRoutes);
app.use('/posts', postsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middlewares de manejo de errores (deben ir al final)
app.use(jsonParseErrorHandler);
app.use(globalErrorHandler);

module.exports = app;