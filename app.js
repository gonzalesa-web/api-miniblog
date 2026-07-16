require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yaml');

app.use(cors());
app.use(express.json());

const authorsRoutes = require('./routes/authors');
const postsRoutes = require('./routes/posts');
const { jsonParseErrorHandler, globalErrorHandler } = require('./middlewares/errorHandler');

app.use('/authors', authorsRoutes);
app.use('/posts', postsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(jsonParseErrorHandler);
app.use(globalErrorHandler);

module.exports = app;