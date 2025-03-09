const pool = require(`../db/pool`);

async function membersOnly(req, res, next) {
  const admin = "user" in req ? req.user.admin : false;
  const { rows } = await pool.query(
    `SELECT user_posts.id,title,time,username,message FROM user_posts INNER JOIN users ON user_posts.userid = users.id`
  );
  if (req.isAuthenticated()) {
    res.render(`membersOnly`, {
      auth: true,
      admin: admin,
      posts: rows,
    });
  } else {
    res.render(`unauthorized`, {
      auth: false,
      admin: admin,
      posts: rows,
    });
  }
}

module.exports = membersOnly;
