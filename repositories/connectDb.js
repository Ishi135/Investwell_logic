const mysql = require("mysql")
const sqlData = require("../db.json")

const connectDb = mysql.createConnection(sqlData);

module.exports = connectDb;