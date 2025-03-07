const { body, validationResult } = require("express-validator");

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
    res.redirect(`/`);
  },
];

module.exports = register;
