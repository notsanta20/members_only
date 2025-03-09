const { body, validationResult } = require("express-validator");
const pool = require(`../db/pool`);
const passwordFunc = require(`../config/password`);

const validate = [
  body(`fullname`, `Fullname should not be empty`).not().isEmpty(),
  body(`fullname`, `Fullname should contain only alphabets`)
    .trim()
    .isAlpha()
    .escape(),
  body(`username`, `Username should not be empty`).not().isEmpty(),
  body(`username`, `username should be between 3-10 characters`)
    .isLength({
      min: 3,
      max: 10,
    })
    .escape(),
  body(`password`, `Password should not be empty`).not().isEmpty(),
  body(`password`, `Password should be at least 8 characters`).isLength({
    min: 8,
  }),
];

const register = [
  validate,
  async (req, res, next) => {
    const auth = req.isAuthenticated();
    const adminCheck = "user" in req ? req.user.admin : false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render(`register`, {
        error: errors.array(),
        auth: auth,
        admin: adminCheck,
      });
    }
    const { fullname, username, password } = req.body;
    const { salt, hash } = passwordFunc.generatePass(password);
    const randomNum = Math.floor(Math.random() * 10);
    const admin = randomNum > 6 ? true : false;
    await pool.query(
      `INSERT INTO users (fullname,username,hash,salt,admin ) VALUES ('${fullname}', '${username}', '${hash}', '${salt}', '${admin}')`
    );
    res.redirect(`/`);
  },
];

module.exports = register;
