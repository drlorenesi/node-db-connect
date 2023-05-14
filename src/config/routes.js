// Routes
const mongodb = require("../routes/mongodb");
const mysql = require("../routes/mysql");
const pg = require("../routes/pg");
const postgres = require("../routes/postgres");
const sqlsrv = require("../routes/sqlsrv");
// Utils
const estado = require("../routes/utils/estado");
const debug = require("../routes/utils/debug");

module.exports = (app) => {
  // Routes
  app.use("/v1/mongodb", mongodb);
  app.use("/v1/mysql", mysql);
  app.use("/v1/pg", pg);
  app.use("/v1/postgres", postgres);
  app.use("/v1/sqlsrv", sqlsrv);
  // Utils
  app.use("/v1/utils/estado", estado);
  app.use("/v1/utils/debug", debug);
};
