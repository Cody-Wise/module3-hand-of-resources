const { Router } = require('express');
const { Fishing_Gear } = require('../models/Fishing-Gear');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Fishing_Gear.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Fishing_Gear.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Fishing_Gear.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Fishing_Gear.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Fishing_Gear.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
