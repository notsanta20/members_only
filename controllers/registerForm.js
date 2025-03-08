function register(req, res) {
  const auth = req.isAuthenticated();
  const admin = "user" in req ? req.user.admin : false;

  if (auth) {
    res.redirect(`members-only`);
  } else {
    res.render(`register`, { auth: auth, admin: admin });
  }
}

module.exports = register;
