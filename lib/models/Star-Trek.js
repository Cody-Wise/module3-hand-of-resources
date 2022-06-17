const pool = require('../utils/pool');

class Star_Trek {
  id;
  first_name;
  last_namne;
  series;

  constructor(row) {
    this.id = row.id;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    this.series = row.series;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from star_trek');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from star_trek WHERE id = $1', [
      id,
    ]);
    return rows[0];
  }
  static async insert({ first_name, last_name, series }) {
    const { rows } = await pool.query(
      'INSERT INTO star_trek (first_name, last_name, series) VALUES ($1, $2, $3) RETURNING * ',
      [first_name, last_name, series]
    );
    return new Star_Trek(rows[0]);
  }
  static async updateById(id, attrs) {
    const star_trek = await Star_Trek.getById(id);
    if (!star_trek) return null;
    const { first_name, last_name, series } = { ...star_trek, ...attrs };
    const { rows } = await pool.query(
      `
            UPDATE star_trek 
            SET first_name=$2, last_name=$3, series=$4
            WHERE id=$1 RETURNING *`,
      [id, first_name, last_name, series]
    );
    return new Star_Trek(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM star_trek WHERE id = $1 RETURNING *',
      [id]
    );
    return new Star_Trek(rows[0]);
  }
}
module.exports = { Star_Trek };
