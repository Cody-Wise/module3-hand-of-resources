const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('beauty-supplies routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/beauty-supplies should return a list of beauty-supplies', async () => {
    const resp = await request(app).get('/beauty-supplies');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        item_name: 'Lipstick',
        price: 10,
      },
      {
        id: '2',
        item_name: 'Lip Gloss',
        price: 5,
      },
      {
        id: '3',
        item_name: 'Lip Balm',
        price: 5,
      },
    ]);
  });
  it('/beauty-supplies/:id should return the beauty-supplies detail', async () => {
    const resp = await request(app).get('/beauty-supplies/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      item_name: 'Lipstick',
      price: 10,
    });
  });
  it('POST /beauty-supplies should create a new beauty-supplies item', async () => {
    const resp = await request(app).post('/beauty-supplies').send({
      item_name: 'Foundation',
      price: 7,
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.item_name).toEqual('Foundation');
    expect(resp.body.price).toEqual(7);
    expect(resp.body.id).not.toBeUndefined();
  });
  it('PUT /beauty-supplies/:id should update specific beauty-supplies item', async () => {
    const resp = await request(app)
      .put('/beauty-supplies/2')
      .send({ item_name: 'Shiny Lip Gloss' });
    expect(resp.status).toEqual(200);
    expect(resp.body.item_name).toEqual('Shiny Lip Gloss');
  });
  it('DELETE /beauty-supplies/:id should delete specific beauty-supplies item', async () => {
    const resp = await request(app).delete('/beauty-supplies/1');
    expect(resp.status).toEqual(200);
    expect(resp.body.id).toEqual('1');
    const { body } = await request(app).get('/beauty-supplies/1');
    expect(body).toEqual('');
  });
});
