function login(req, res) {
  const auth = req.isAuthenticated();
  const admin = "user" in req ? req.user.admin : false;
  if (auth) {
    res.redirect(`members-only`);
  } else {
    res.render(`login`, { auth: auth, admin: admin });
  }
}

module.exports = login;
