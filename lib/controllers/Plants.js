const { Router } = require('express');
const { Plant } = require('../models/Plant');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Plant.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Plant.insert(req.body);
      console.log(data);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Plant.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Plant.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Plant.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
