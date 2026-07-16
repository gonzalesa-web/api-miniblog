function jsonParseErrorHandler(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON mal formado en el body' });
  }
  next(err);
}

function globalErrorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = { jsonParseErrorHandler, globalErrorHandler };
