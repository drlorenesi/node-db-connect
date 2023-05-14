// https://node-postgres.com/
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test connection during App startup
async function postgresConnect() {
  try {
    const db = await pool.connect();
    console.log(`- Connected to ${db.database} on ${db.host}`);
  } catch (err) {
    console.error('Database connection error: ', err.message);
  }
}

// Query Function
// Write async queries as:
// const { duration, rows } = await query('SELECT NOW()');
async function query(sql) {
  try {
    const start = Date.now();
    const { rows } = await pool.query(sql);
    const duration = Date.now() - start;
    return { rows, duration: `${duration} ms` };
  } catch (err) {
    console.log('Database error: ', err.message);
  }
}

module.exports = { postgresConnect, query };
