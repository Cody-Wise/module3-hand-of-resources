const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('fishing routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/fishing-gear should return a list of fishing-gear', async () => {
    const resp = await request(app).get('/fishing-gear');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        item_name: 'Fishing Rod',
        price: 10,
      },
      {
        id: '2',
        item_name: 'Fishing Line',
        price: 5,
      },
      {
        id: '3',
        item_name: 'Fishing Hooks',
        price: 5,
      },
    ]);
  });

  it('/fishing-gear/:id should return the gear detail', async () => {
    const resp = await request(app).get('/fishing-gear/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      item_name: 'Fishing Rod',
      price: 10,
    });
  });

  it('POST /fishing-gear should create a new fishing gear item', async () => {
    const resp = await request(app).post('/fishing-gear').send({
      item_name: 'Fishing Net',
      price: 8,
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.item_name).toEqual('Fishing Net');
    expect(resp.body.price).toEqual(8);
    expect(resp.body.id).not.toBeUndefined();
  });

  it('PUT /fishing-gear/:id should update specific fishing gear item', async () => {
    const resp = await request(app)
      .put('/fishing-gear/2')
      .send({ item_name: 'Dynamo Fishing Line' });
    expect(resp.status).toEqual(200);
    expect(resp.body.item_name).toEqual('Dynamo Fishing Line');
  });

  it('DELETE /fishing-gear/:id should delete a fishing gear item', async () => {
    const resp = await request(app).delete('/fishing-gear/2');
    expect(resp.body.id).toEqual('2');
    const { body } = await request(app).get('/fishing-gear/2');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
