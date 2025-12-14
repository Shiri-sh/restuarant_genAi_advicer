import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

const con = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || '',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || '',
  port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
});

con.getConnection()
  .then(() => console.log('Connected to the database.'))
  .catch(err => console.error('Database connection failed:', err));
  
export default con;