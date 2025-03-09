function addMessage(req, res, next) {
  const auth = req.isAuthenticated();
  const admin = "user" in req ? req.user.admin : false;
  res.render(`addMessage`, { auth: auth, admin: admin });
}

module.exports = addMessage;
