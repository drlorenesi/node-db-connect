require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool();

// Test connection
(async function () {
  try {
    const db = await pool.connect();
    console.log(`- Connected to ${db.database} on ${db.host}`);
    db.release(true);
  } catch (err) {
    console.error('Database error -> ', err.message);
    return;
  }
})();

(async function () {
  try {
    // const res1 = await pool.query('SELECT * FROM movies');
    const res2 = await pool.query('SELECT * FROM movies WHERE movie_id = $1', [
      1,
    ]);
    // console.log(res1.rows);
    console.log(res2.rows[0]);
  } catch (err) {
    console.log('Database error ->', err.message);
  }
})();

module.exports = pool;
