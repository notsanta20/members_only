const pool = require(`../db/pool`);

async function home(req, res) {
  const auth = req.isAuthenticated();
  const admin = "user" in req ? req.user.admin : false;
  const { rows } = await pool.query(`SELECT title,message FROM user_posts`);

  res.render(`index`, { auth: auth, admin: admin, posts: rows });
}

module.exports = home;
