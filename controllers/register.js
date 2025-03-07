const { body, validationResult } = require("express-validator");
const pool = require(`../db/pool`);
const passwordFunc = require(`../config/password`);

const validate = [
  body(`fullname`, `Fullname not be empty`).not().isEmpty(),
  body(`fullname`, `Fullname should contain only alphabets`).trim().isAlpha(),
  body(`username`, `Username should not be empty`).not().isEmpty(),
  body(`username`, `username should contain only alphabets`).trim().isAlpha(),
  body(`username`, `username should be between 1-10 characters`).isLength({
    min: 3,
    max: 10,
  }),
  body(`password`, `Password should not be empty`).not().isEmpty(),
  body(`password`, `Password should contain only alphabets`).trim().isAlpha(),
  body(`password`, `Password should be at least 8 characters`).isLength({
    min: 8,
  }),
];

const register = [
  validate,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render(`register`, { error: errors.array() });
    }
    const { fullname, username, password } = req.body;
    const { salt, hash } = passwordFunc.generatePass(password);
    // await pool.query(
    //   `INSERT INTO usernames (fullname,username,hash,salt,admin ) VALUES ('${fullname}', '${username}', '${hash}', '${salt}', '${admin}')`
    // );
    res.redirect(`/`);
  },
];

module.exports = register;
