function error(req, res) {
  const auth = req.isAuthenticated();
  const admin = "user" in req ? req.user.admin : false;

  res.render(`error`, { auth: auth, admin: admin });
}

module.exports = error;
