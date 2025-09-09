// filepath: /home/juss-joosep/joga_mysql_oop/utils/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'joga_mysql_oop',
  password: 'qwerty',
  database: 'joga_mysql_oop',
  connectionLimit: 10
});

module.exports = pool;