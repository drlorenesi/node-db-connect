require('dotenv').config();
const sql = require('mssql');

const pool = new sql.ConnectionPool({
  user: process.env.MSSQLUSER2,
  password: process.env.MSSQLPASSWORD2,
  server: process.env.MSSQLHOST2,
  database: process.env.MSSQLDATABASE2,
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
});

// Test connection
(async function () {
  try {
    const db = await pool.connect();
    console.log(`- Connected to ${db.config.database} on ${db.config.server}`);
    db.release();
  } catch (err) {
    // console.error('Database error -> ', err.message);
    console.log('Database error ->', err.message);
  }
})();

// Test query
(async function () {
  try {
    const db = await pool.connect();
    const { recordset } = await db.query('SELECT GETDATE()');
    console.log(recordset);
  } catch (err) {
    console.log('Database error -> ', err.message);
  }
})();
