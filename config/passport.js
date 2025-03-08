const passport = require(`passport`);
const LocalStrategy = require(`passport-local`).Strategy;
const pool = require(`../db/pool`);
const passwordFunc = require(`../config/password`);

const verifyCallback = async (username, password, done) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    const user = rows[0];
    if (!user) {
      return done(null, false, { message: `Incorrect Username` });
    }
    const match = passwordFunc.validatePassword(password, user.hash, user.salt);

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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE id = '${id}' `
    );
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
