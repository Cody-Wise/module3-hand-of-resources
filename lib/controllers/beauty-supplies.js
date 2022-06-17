const { Router } = require('express');
const { Beauty_Supplies } = require('../models/Beauty-Supplies');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Beauty_Supplies.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Beauty_Supplies.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Beauty_Supplies.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Beauty_Supplies.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Beauty_Supplies.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
