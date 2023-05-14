const fs = require("fs");
const { mysqlConnect, query } = require("../src/config/db/mysql");

// Read SQL seed query
const seedQuery = fs.readFileSync("./setup/mysql.sql", { encoding: "UTF-8" });

const parseSqlFile = (sqlFile) => {
  return sqlFile
    .toString()
    .replace(/(\r\n|\n|\r)/gm, " ") // remove newlines
    .replace(/\s+/g, " "); // excess white space
};

async function seedData() {
  try {
    await mysqlConnect();
    await query(parseSqlFile(seedQuery));
    console.log("- SQL seed completed!");
    process.exit(0);
  } catch (error) {
    console.log("An error ocurred:", error.message);
    process.exit(1);
  }
}

seedData();
