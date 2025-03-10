function login(req, res) {
  const auth = req.isAuthenticated();
  const admin = "user" in req ? req.user.admin : false;
  if (auth) {
    res.redirect(`members-only`);
  } else {
    const error = req.session.messages[0];
    req.session.messages = [];
    res.render(`login`, { auth: auth, admin: admin, error: error });
  }
}

module.exports = login;
