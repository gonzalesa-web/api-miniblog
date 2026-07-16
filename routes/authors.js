const express = require('express');
const router = express.Router();
const authorsService = require('../services/authorsService');

router.get('/', async (req, res, next) => {
  try {
    const authors = await authorsService.getAllAuthors();
    res.status(200).json(authors);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const author = await authorsService.getAuthorById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: 'Author no encontrado' });
    }
    res.status(200).json(author);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, bio } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ error: 'name y email son obligatorios' });
    }

    const exists = await authorsService.emailExists(email);
    if (exists) {
      return res.status(400).json({ error: 'El email ya está en uso' });
    }

    const newAuthor = await authorsService.createAuthor({ name, email, bio });
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const existing = await authorsService.getAuthorById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Author no encontrado' });
    }

    const { name, email, bio } = req.body || {};

    if (name !== undefined && !name) {
      return res.status(400).json({ error: 'name no puede estar vacío' });
    }
    if (email !== undefined && !email) {
      return res.status(400).json({ error: 'email no puede estar vacío' });
    }

    if (email) {
      const exists = await authorsService.emailExists(email, req.params.id);
      if (exists) {
        return res.status(400).json({ error: 'El email ya está en uso' });
      }
    }

    const updated = await authorsService.updateAuthor(req.params.id, { name, email, bio });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await authorsService.deleteAuthor(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Author no encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;