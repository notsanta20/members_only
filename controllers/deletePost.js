const pool = require(`../db/pool`);

async function deletePost(req, res, next) {
  const id = req.params.id;
  await pool.query(`DELETE FROM user_posts WHERE id = ${id}`);
  res.redirect(`/members-only`);
}

module.exports = deletePost;
