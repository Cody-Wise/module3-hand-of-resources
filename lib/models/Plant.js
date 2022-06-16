const pool = require('../utils/pool');

class Plant {
  id;
  name;
  scientific_name;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.scientific_name = row.scientific_name;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from plants');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from plants WHERE id = $1', [
      id,
    ]);
    return rows[0];
  }

  static async insert({ name, scientific_name }) {
    const { rows } = await pool.query(
      'INSERT INTO plants (name, scientific_name) VALUES ($1, $2) RETURNING * ',
      [name, scientific_name]
    );
    return new Plant(rows[0]);
  }

  static async updateById(id, attrs) {
    const plant = await Plant.getById(id);
    if (!plant) return null;
    const { name, scientific_name } = { ...plant, ...attrs };
    const { rows } = await pool.query(
      `
        UPDATE plants 
        SET name=$2, scientific_name=$3
        WHERE id=$1 RETURNING *`,
      [id, name, scientific_name]
    );
    return new Plant(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM plants WHERE id = $1 RETURNING *',
      [id]
    );
    return new Plant(rows[0]);
  }
}

module.exports = { Plant };
