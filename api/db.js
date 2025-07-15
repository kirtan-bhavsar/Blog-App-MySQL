import mysql from "mysql";
import dotenv from "dotenv/config";

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
});

console.log("database connected successfully");

export default db;
