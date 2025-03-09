const pool = require(`../db/pool`);
const { format } = require(`date-fns`);
const { body, validationResult } = require("express-validator");

const validate = [
  body(`title`)
    .not()
    .isEmpty()
    .withMessage(`title should not be empty`)
    .isLength({ min: 5 })
    .withMessage(`username should be at least 5 characters`)
    .trim()
    .escape(),
  body(`message`)
    .not()
    .isEmpty()
    .withMessage(`message should not be empty`)
    .isLength({ min: 5 })
    .withMessage(`username should be at least 5 characters`)
    .trim()
    .escape(),
];

const addMessage = [
  validate,
  async (req, res, next) => {
    const auth = req.isAuthenticated();
    const adminCheck = "user" in req ? req.user.admin : false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render(`addMessage`, {
        error: errors.array(),
        auth: auth,
        admin: adminCheck,
      });
    }

    const id = req.user.id;
    const { title, message } = req.body;
    const time = format(new Date(), "do-LLL hh:mm a");
    await pool.query(
      `INSERT INTO user_posts (title,message,time,userid) VALUES ('${title}','${message}','${time}','${id}')`
    );
    res.redirect(`/members-only`);
  },
];

// async function addMessage(req, res, next) {
//   const id = req.user.id;
//   const { title, message } = req.body;
//   const time = format(new Date(), "do-LLL hh:mm a");
//   await pool.query(
//     `INSERT INTO user_posts (title,message,time,userid) VALUES ('${title}','${message}','${time}','${id}')`
//   );
//   res.redirect(`/members-only`);
// }

module.exports = addMessage;
