const express = require(`express`);
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const session = require(`express-session`);
const passport = require(`passport`);
const router = require(`./routes/router`);
const sessionStorage = require(`./db/sessionStore`);
require(`dotenv`).config();

const app = express();

app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStorage,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(router);

app.listen(
  process.env.SERVER_PORT,
  console.log(`Server Running at port ${process.env.SERVER_PORT}`)
);
