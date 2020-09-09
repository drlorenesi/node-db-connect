require('dotenv').config();
const sql = require('mssql');

const pool = new sql.ConnectionPool({
  user: process.env.MSSQLUSER,
  password: process.env.MSSQLPASSWORD,
  server: process.env.MSSQLHOST,
  database: process.env.GRANADA20,
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
});
const db = pool.connect();

pool.on('error', (err) => {
  console.log('The following error ocurred: ', err);
});

async function messageHandler() {
  await db; // ensures that the pool has been created
  try {
    const request = pool.request(); // or: new sql.Request(pool1)
    const result = await request.query('select 1 as number');
    console.dir(result);
  } catch (err) {
    console.error('SQL error', err);
  }
}
messageHandler();
