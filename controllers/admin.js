function admin(req, res, next) {
  const auth = req.isAuthenticated();
  const admin = "user" in req ? req.user.admin : false;
  if (auth) {
    if (req.user.admin) {
      res.render(`admin`, { auth: auth, admin: admin });
    } else {
      res.redirect(`members-only`);
    }
  } else {
    res.redirect(`/log-in`);
  }
}

module.exports = admin;
