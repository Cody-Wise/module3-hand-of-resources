const pool = require('../utils/pool');

class Fishing_Gear {
  id;
  item_name;
  price;

  constructor(row) {
    this.id = row.id;
    this.item_name = row.item_name;
    this.price = row.price;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM fishing_gear');
    return rows;
  }
  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM fishing_gear WHERE id = $1',
      [id]
    );
    return rows[0];
  }
  static async insert({ item_name, price }) {
    const { rows } = await pool.query(
      'INSERT INTO fishing_gear (item_name, price) VALUES ($1, $2) RETURNING * ',
      [item_name, price]
    );
    return new Fishing_Gear(rows[0]);
  }
  static async updateById(id, attrs) {
    const fishing_gear = await Fishing_Gear.getById(id);
    if (!fishing_gear) return null;
    const { item_name, price } = { ...fishing_gear, ...attrs };
    const { rows } = await pool.query(
      `
            UPDATE fishing_gear
            SET item_name=$2, price=$3
            WHERE id=$1 RETURNING *`,
      [id, item_name, price]
    );
    return new Fishing_Gear(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM fishing_gear WHERE id = $1 RETURNING *',
      [id]
    );
    return new Fishing_Gear(rows[0]);
  }
}
module.exports = { Fishing_Gear };
