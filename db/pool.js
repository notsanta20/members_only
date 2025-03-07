const { Pool } = require(`pg`);
require(`dotenv`).config();

const pool = new Pool({
  host: process.env.LOCAL_HOST,
  user: process.env.LOCAL_USER,
  database: process.env.LOCAL_NAME,
  password: process.env.LOCAL_PASSWORD,
  port: process.env.LOCAL_PORT,
});

module.exports = pool;
