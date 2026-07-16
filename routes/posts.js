const express = require('express');
const router = express.Router();
const postsService = require('../services/postsService');
const authorsService = require('../services/authorsService');

router.get('/', async (req, res, next) => {
  try {
    const posts = await postsService.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await postsService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

router.get('/author/:authorId', async (req, res, next) => {
  try {
    const author = await authorsService.getAuthorById(req.params.authorId);
    if (!author) {
      return res.status(404).json({ error: 'Author no encontrado' });
    }

    const authorPosts = await postsService.getPostsByAuthorId(author.id);
    res.status(200).json({ author, posts: authorPosts });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, content, author_id, published } = req.body || {};

    if (!title || !content || !author_id) {
      return res.status(400).json({ error: 'title, content y author_id son obligatorios' });
    }

    const author = await authorsService.getAuthorById(author_id);
    if (!author) {
      return res.status(400).json({ error: 'author_id no corresponde a un author existente' });
    }

    const newPost = await postsService.createPost({ title, content, author_id, published });
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const existing = await postsService.getPostById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    const { title, content, author_id, published } = req.body || {};

    if (author_id !== undefined) {
      const author = await authorsService.getAuthorById(author_id);
      if (!author) {
        return res.status(400).json({ error: 'author_id no corresponde a un author existente' });
      }
    }

    const updated = await postsService.updatePost(req.params.id, { title, content, author_id, published });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await postsService.deletePost(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;