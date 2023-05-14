require("dotenv").config(); // Required to run 'seed' script
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});

// Test connection
async function mysqlConnect() {
  try {
    const db = await pool.getConnection();
    console.log(`- Connected to ${db.config.database} on ${db.config.host}`);
  } catch (err) {
    console.error("Database connection error:", err.message);
    throw new Error(err);
  }
}

// Query function
// const data = await query(`SELECT NOW()`);
// const { rows, fields, duration  } = await query(`SELECT NOW()`);
async function query(sql) {
  const start = Date.now();
  try {
    const [rows, fields] = await pool.query(sql);
    const duration = Date.now() - start;
    return { rows, fields, duration: `${duration} ms` };
  } catch (err) {
    console.log("Database error:", err.message);
    throw new Error(err);
  }
}

// Execute function
// const { rows, fields, duration  } = await execute(`SELECT NOW()`);
async function execute(sql, params) {
  const start = Date.now();
  try {
    const [rows, fields] = await pool.execute(sql, params);
    const duration = Date.now() - start;
    return { rows, fields, duration: `${duration} ms` };
  } catch (err) {
    console.log("Database error:", err.message);
    throw new Error(err);
  }
}

module.exports = { mysqlConnect, query, execute };
