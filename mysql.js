require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  host: process.env.MYSQLHOST,
  database: process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async function () {
  try {
    const db = await pool.getConnection();
    console.log(`- Connected to ${db.config.database} on ${db.config.host}`);
    db.release();
  } catch (err) {
    console.error('Database error -> ', err.message);
  }
})();

(async function () {
  try {
    const [rows] = await pool.query('SELECT NOW()');
    console.log(rows);
  } catch (err) {
    console.log('Database error -> ', err.message);
  }
})();

module.exports = pool;
