function admin(req, res, next) {
  const auth = req.isAuthenticated();
  const admin = "user" in req ? req.user.admin : false;
  console.log(req.session);
  if (req.user.admin) {
    res.render(`admin`, { auth: auth, admin: admin });
  } else {
    res.redirect(`members-only`);
  }
}

module.exports = admin;
