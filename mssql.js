require('dotenv').config();
const sql = require('mssql');

let pool = new sql.ConnectionPool({
  user: process.env.MSSQLUSER,
  password: process.env.MSSQLPASSWORD,
  server: '192.168.0.47',
  database: process.env.MSSQLDATABASE,
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
});

pool.connect((err) => {
  console.log('Something went wrong...', err);
});

// async function myquery() {
//   try {
//     const result = await pool.query("SELECT GETDATE() 'Current Time';");
//     console.dir(result);
//   } catch (err) {
//     console.log('Something went wrong...', err);
//   }
// }

// myquery();

// sql.on('error', (err) => {
//   console.log('Something went wrong...', err);
// });
