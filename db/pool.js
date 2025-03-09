const { Pool } = require(`pg`);
require(`dotenv`).config();

// Local Database
const pool = new Pool({
  host: process.env.LOCAL_HOST,
  user: process.env.LOCAL_USER,
  database: process.env.LOCAL_NAME,
  password: process.env.LOCAL_PASSWORD,
  port: process.env.LOCAL_PORT,
});

// Aiven Database
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

module.exports = pool;
