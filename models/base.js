const pool = require('../utils/db.js');

class BaseSQLModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async executeQuery(query, params) {
    try {
      const [results] = await pool.query(query, params);
      return results;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    const results = await this.executeQuery(query);
    return results;
  }

  async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const results = await this.executeQuery(query, [id]);
    return results[0];
  }

  async findOne(field, value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${field} = ?`;
    const results = await this.executeQuery(query, [value]);
    return results[0];
  }

  async findMany(field, value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${field} = ?`;
    const results = await this.executeQuery(query, [value]);
    return results;
  }

  async create(data) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
    const result = await this.executeQuery(query, values);
    return result.insertId;
  }

  async update(id, data) {
    const query = `UPDATE ${this.tableName} SET ? WHERE id = ?`;
    const result = await this.executeQuery(query, [data, id]);
    return result.affectedRows;
  }

  async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const result = await this.executeQuery(query, [id]);
    return result.affectedRows;
  }
}

module.exports = BaseSQLModel;