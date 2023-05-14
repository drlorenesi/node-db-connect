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
  // const config = pool.pool.config.connectionConfig;
  // try {
  //   console.log(`- Connected to ${config.database} on ${config.host}`);
  // } catch (error) {
  //   console.error("Database connection error:", err.message);
  //   throw new Error(error);
  // }
}

// Query function
// const data = await query(`SELECT NOW()`);
// const { rows, fields } = await query(`SELECT NOW()`);
async function query(sql) {
  try {
    const [rows, fields] = await pool.query(sql);
    return { rows, fields };
  } catch (err) {
    console.log("Database error:", err.message);
  }
}

// Execute function
// const data = await execute(`SELECT NOW()`);
// const { rows, fields } = await execute(`SELECT NOW()`);
async function execute(sql, params) {
  try {
    const [rows, fields] = await pool.execute(sql, params);
    return { rows, fields };
  } catch (error) {
    console.log("Database erroror:", error.message);
  }
}

module.exports = { mysqlConnect, query, execute };
