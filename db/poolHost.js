const { Pool } = require(`pg`);
require(`dotenv`).config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function main() {
  console.log(`seeding`);
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, fullname VARCHAR (255), username VARCHAR (255), hash VARCHAR (255), salt VARCHAR (255), admin BOOLEAN)`
  );
  await pool.query(
    `CREATE TABLE user_posts (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, title VARCHAR (255), message VARCHAR (255), time VARCHAR (255), userID INTEGER, FOREIGN KEY (userID) REFERENCES users(id));`
  );
  console.log(`done`);
  const { rows } = await pool.query(`select * from users`);
  console.log(rows);
}
