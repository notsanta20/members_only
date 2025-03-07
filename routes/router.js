const express = require(`express`);
const router = express.Router();
const passport = require(`passport`);
const home = require(`../controllers/home`);
const loginForm = require(`../controllers/loginForm`);
const login = require(`../controllers/login`);
const registerForm = require(`../controllers/registerForm`);
const register = require(`../controllers/register`);
const error = require(`../controllers/error`);

router.get(`/`, home);
router.get(`/log-in`, loginForm);
router.post(`/log-in`, loginForm);
router.get(`/register`, registerForm);
router.post(`/register`, register);

router.get(`*`, error);
module.exports = router;
