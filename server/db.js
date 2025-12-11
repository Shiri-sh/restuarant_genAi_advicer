import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: localhost,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
}).promise();

connection.getConnection()
  .then(() => console.log('Connected to the database.'))
  .catch(err => console.error('Database connection failed:', err));
  
module.exports = connection;