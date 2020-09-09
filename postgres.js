require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

pool.connect(async (err, client) => {
  if (err) console.log('Database error ->', err.message);
  if (client) {
    console.log(`- Connected to ${client.database} on ${client.host}`);
  }
  client.release(true);
});

async function testQuery() {
  try {
    const res1 = await pool.query('SELECT * FROM movies');
    const res2 = await pool.query('SELECT * FROM movies WHERE movie_id = $1', [
      1,
    ]);
    console.log(res1.rows);
    console.log(res2.rows[0]);
  } catch (err) {
    console.log('Database error ->', err.message);
  }
}
testQuery();

module.exports = pool;
