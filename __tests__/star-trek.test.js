const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('star-trek routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/star-trek should return a list of characters', async () => {
    const resp = await request(app).get('/star-trek');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        first_name: 'James',
        last_name: 'Tiberius',
        series: 'The Next Generation',
      },
      {
        id: '2',
        first_name: 'Jean-Luc',
        last_name: 'Picard',
        series: 'The Next Generation',
      },
      {
        id: '3',
        first_name: 'Miles',
        // prettier-ignore
        last_name: 'O\'brien',
        series: 'Deep Space Nine',
      },
    ]);
  });
  it('/star-trek/:id should return the character detail', async () => {
    const resp = await request(app).get('/star-trek/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      first_name: 'James',
      last_name: 'Tiberius',
      series: 'The Next Generation',
    });
  });
  it('POST /star-trek should create a new character', async () => {
    const resp = await request(app).post('/star-trek').send({
      first_name: 'JADZIA',
      last_name: 'DAX',
      series: 'Deep Space Nine',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.first_name).toEqual('JADZIA');
    expect(resp.body.last_name).toEqual('DAX');
    expect(resp.body.series).toEqual('Deep Space Nine');
    expect(resp.body.id).not.toBeUndefined();
  });

  it('PUT /star-trek/:id should update specific character', async () => {
    const resp = await request(app).put('/star-trek/2').send({
      first_name: 'RO',
      last_name: 'LAREN',
      series: 'The Next Generation',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.first_name).toEqual('RO');
    expect(resp.body.last_name).toEqual('LAREN');
    expect(resp.body.series).toEqual('The Next Generation');
  });
  it('DELETE /star-trek/:id should delete a character', async () => {
    const resp = await request(app).delete('/star-trek/2');
    expect(resp.body.id).toEqual('2');
    const { body } = await request(app).get('/star-trek/2');
    expect(body).toEqual('');
  });
  afterAll(() => {
    pool.end();
  });
});
