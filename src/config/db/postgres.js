// https://github.com/porsager/postgres
const postgres = require('postgres');

const sql = postgres({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  username: process.env.PGUSERNAME,
  password: process.env.PGPASSWORD,
});

// Test connection during App startup
async function postgresConnect() {
  try {
    console.log(
      `- Connected to ${sql.options.database} on ${sql.options.host[0]}`
    );
  } catch (err) {
    console.error('Database connection error: ', err.message);
  }
}

async function query(q) {
  try {
    const start = Date.now();
    const result = await q;
    const duration = Date.now() - start;
    return { result, duration: `${duration} ms` };
  } catch (err) {
    console.log('Database error: ', err.message);
  }
}

module.exports = { postgresConnect, query, sql };
