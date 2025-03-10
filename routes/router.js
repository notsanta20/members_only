const express = require(`express`);
const router = express.Router();
const passport = require(`passport`);
const home = require(`../controllers/home`);
const loginForm = require(`../controllers/loginForm`);
const registerForm = require(`../controllers/registerForm`);
const register = require(`../controllers/register`);
const membersOnly = require(`../controllers/membersOnly`);
const logout = require(`../controllers/logout`);
const admin = require(`../controllers/admin`);
const addMessageForm = require(`../controllers/addMessageForm`);
const addMessage = require(`../controllers/addMessage`);
const deletePost = require(`../controllers/deletePost`);
const error = require(`../controllers/error`);

router.get(`/`, home);
router.get(`/log-in`, loginForm);
router.post(
  `/log-in`,
  passport.authenticate(`local`, {
    successRedirect: "/members-only",
    failureRedirect: "/log-in",
    failureMessage: true,
  })
);
router.get(`/register`, registerForm);
router.post(`/register`, register);
router.get(`/members-only`, membersOnly);
router.get(`/logout`, logout);
router.get(`/admin`, admin);
router.get(`/addMessage`, addMessageForm);
router.post(`/addMessage`, addMessage);
router.get(`/delete/:id`, deletePost);

router.get(`*`, error);
module.exports = router;
