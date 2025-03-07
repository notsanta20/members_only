const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const pool = require(`./pool`);

const session = new pgSession({
  pool: pool,
  tableName: "user_session",
  createTableIfMissing: true,
});

module.exports = session;
