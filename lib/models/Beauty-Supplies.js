const pool = require('../utils/pool');

class Beauty_Supplies {
  id;
  item_name;
  price;

  constructor(row) {
    this.id = row.id;
    this.item_name = row.item_name;
    this.price = row.price;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from beauty_supplies');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * from beauty_supplies WHERE id = $1',
      [id]
    );
    return rows[0];
  }

  static async insert({ item_name, price }) {
    const { rows } = await pool.query(
      'INSERT INTO beauty_supplies (item_name, price) VALUES ($1, $2) RETURNING * ',
      [item_name, price]
    );
    return new Beauty_Supplies(rows[0]);
  }

  static async updateById(id, attrs) {
    const beauty_supplies = await Beauty_Supplies.getById(id);
    if (!beauty_supplies) return null;
    const { item_name, price } = { ...beauty_supplies, ...attrs };
    const { rows } = await pool.query(
      `
                  UPDATE beauty_supplies
                  SET item_name=$2, price=$3
                  WHERE id=$1 RETURNING *`,
      [id, item_name, price]
    );
    return new Beauty_Supplies(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM beauty_supplies WHERE id = $1 RETURNING *',
      [id]
    );
    return new Beauty_Supplies(rows[0]);
  }
}

module.exports = { Beauty_Supplies };
