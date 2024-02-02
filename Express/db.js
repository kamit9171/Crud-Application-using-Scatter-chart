const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost:2000',
  user: 'admin',
  password: 'sa',
  database: 'data',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;
