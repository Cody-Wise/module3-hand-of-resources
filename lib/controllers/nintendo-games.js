const Router = require('express');
const { Nintendo_Games } = require('../models/Nintendo-Games');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Nintendo_Games.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Nintendo_Games.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const data = await Nintendo_Games.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Nintendo_Games.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const data = await Nintendo_Games.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
