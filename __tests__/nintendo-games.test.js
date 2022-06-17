const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('nintendo game routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/nintendo should return a list of nintendo games', async () => {
    const resp = await request(app).get('/nintendo-games');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        item_name: 'Super Mario Bros',
        price: 56,
      },
      {
        id: '2',
        item_name: 'Super Mario Bros 3',
        price: 54,
      },
      {
        id: '3',
        item_name: 'Metroid',
        price: 49,
      },
    ]);
  });
  it('/nintendo/:id should return the nintendo game detail', async () => {
    const resp = await request(app).get('/nintendo-games/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      item_name: 'Super Mario Bros',
      price: 56,
    });
  });
  it('POST /nintendo should create a new nintendo game item', async () => {
    const resp = await request(app).post('/nintendo-games').send({
      item_name: 'Super Mario Bros 2',
      price: 59,
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.item_name).toEqual('Super Mario Bros 2');
    expect(resp.body.price).toEqual(59);
    expect(resp.body.id).not.toBeUndefined();
  });
  it('PUT /nintendo/:id should update specific nintendo game item', async () => {
    const resp = await request(app)
      .put('/nintendo-games/2')
      .send({ item_name: 'Super Mario Bros 3' });
    expect(resp.status).toEqual(200);
    expect(resp.body.item_name).toEqual('Super Mario Bros 3');
  });
  it('DELETE /nintendo/:id should delete specific nintendo game item', async () => {
    const resp = await request(app).delete('/nintendo-games/1');
    expect(resp.status).toEqual(200);
    expect(resp.body.id).toEqual('1');
    const { body } = await request(app).get('/nintendo-games/1');
    expect(body).toEqual('');
  });
});
