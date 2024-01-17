require('dotenv').config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'employees_db'
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
