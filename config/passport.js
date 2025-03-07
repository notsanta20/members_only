const passport = require(`passport`);
const LocalStrategy = require(`passport-local`).Strategy;
const pool = require(`../db/pool`);
const validatePassword = require(`./password`).validatePassword;

const verifyCallback = async (username, password, done) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE username = ${username}`
    );
    const user = rows[0];
    const match = false;
    if (!user) {
      return done(null, false, { message: `Incorrect Username` });
    }
    if (!match) {
      return done(null, false, { message: `Incorrect Password` });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);
