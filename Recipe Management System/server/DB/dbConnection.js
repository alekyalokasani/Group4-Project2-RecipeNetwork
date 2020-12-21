const mysql = require("mysql2/promise");

const mysqlConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "RecipeManagementsysyem",
  multipleStatements: true,
});

module.exports = mysqlConnection;
