require("dotenv").config(); // Required to run 'seed' script
const { ConnectionPool } = require("mssql");

const pool = new ConnectionPool({
  user: process.env.SQLSRV_USER,
  password: process.env.SQLSRV_PASSWORD,
  database: process.env.SQLSRV_DATABASE,
  server: process.env.SQLSRV_HOST,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
});

// Test connection during App startup
async function sqlsrvConnect() {
  try {
    const db = await pool.connect();
    console.log(`- Connected to ${db.config.database} on ${db.config.server}`);
  } catch (err) {
    console.error("Database connection error:", err.message);
    throw new Error(err);
  }
}

// Write async queries as:
// const { rows, rowsAffected, duration, } = await query(`SELECT NOW()`);
async function query(sql) {
  try {
    const start = Date.now();
    await pool.connect();
    const { recordset: rows, rowsAffected } = await pool.query(sql);
    const duration = Date.now() - start;
    return { rows, rowsAffected: rowsAffected[0], duration: `${duration} ms` };
  } catch (err) {
    console.log("Database error:", err.message);
    throw new Error(err);
  }
}

module.exports = { sqlsrvConnect, query };
