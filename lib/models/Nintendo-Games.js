const pool = require('../utils/pool');

class Nintendo_Games {
  id;
  item_name;
  price;

  constructor(row) {
    this.id = row.id;
    this.item_name = row.item_name;
    this.price = row.price;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM nintendo_games');
    return rows;
  }
  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM nintendo_games WHERE id = $1',
      [id]
    );
    return rows[0];
  }
  static async insert({ item_name, price }) {
    const { rows } = await pool.query(
      'INSERT INTO nintendo_games (item_name, price) VALUES ($1, $2) RETURNING * ',
      [item_name, price]
    );
    return new Nintendo_Games(rows[0]);
  }
  static async updateById(id, attrs) {
    const nintendo_games = await Nintendo_Games.getById(id);
    if (!nintendo_games) return null;
    const { item_name, price } = { ...nintendo_games, ...attrs };
    const { rows } = await pool.query(
      `
                    UPDATE nintendo_games
                    SET item_name=$2, price=$3
                    WHERE id=$1 RETURNING *`,
      [id, item_name, price]
    );
    return new Nintendo_Games(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM nintendo_games WHERE id = $1 RETURNING *',
      [id]
    );
    return new Nintendo_Games(rows[0]);
  }
}
module.exports = { Nintendo_Games };
