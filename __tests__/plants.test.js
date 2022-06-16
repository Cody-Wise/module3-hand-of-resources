const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('plant routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/plants should return a list of plants', async () => {
    const resp = await request(app).get('/plants');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Cactus',
        scientific_name: 'Cactaceae',
      },
      {
        id: '2',
        name: 'Swiss Cheese Plant',
        scientific_name: 'Monstera deliciosa',
      },
      {
        id: '3',
        name: 'Rubber Plant',
        scientific_name: 'Ficus elastica',
      },
    ]);
  });

  it('/plants/:id should return the plant detail', async () => {
    const resp = await request(app).get('/plants/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Cactus',
      scientific_name: 'Cactaceae',
    });
  });

  it('POST /plants should create a new plant', async () => {
    const resp = await request(app).post('/plants').send({
      name: 'Paddle Plant',
      scientific_name: 'Kalancho thyrsiflora',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Paddle Plant');
    expect(resp.body.scientific_name).toEqual('Kalancho thyrsiflora');
    expect(resp.body.id).not.toBeUndefined();
  });

  it('PUT /plants/:id should update specific plant', async () => {
    const resp = await request(app).put('/plants/2').send({ name: 'Monstera' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Monstera');
  });

  it('DELETE /plants/:id should delete a specifc plant', async () => {
    const resp = await request(app).delete('/plants/2');
    expect(resp.status).toEqual(200);

    const { body } = await request(app).get('/plants/2');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
