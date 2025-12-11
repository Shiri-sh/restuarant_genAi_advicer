import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}).promise();

connection.getConnection()
  .then(() => console.log('Connected to the database.'))
  .catch(err => console.error('Database connection failed:', err));
  
module.exports = connection;