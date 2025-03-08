function home(req, res) {
  const auth = req.isAuthenticated();
  const admin = "user" in req ? req.user.admin : false;
  res.render(`index`, { auth: auth, admin: admin });
}

module.exports = home;
