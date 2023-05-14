const app = require("./app");
// const mongodbConnect = require('./config/db/mongodb');
const { mysqlConnect } = require("./config/db/mysql");
// const { sqlsrvConnect } = require('./config/db/sqlsrv');
// const { postgresConnect } = require('./config/db/postgres');

const env = process.env.ENTORNO.toUpperCase();
const port = process.env.PORT || 9001;

app.listen(port, () => {
  console.log(`- Environment: ${env}`);
  console.log(`- Server started on port: ${port}`);
  // mongodbConnect();
  mysqlConnect();
  // sqlsrvConnect();
  // postgresConnect();
});
