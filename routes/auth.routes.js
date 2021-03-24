const { Router } = require("express");
const route = Router();
const { withAuth } = require("../middlewares/withAuth");
const {
  login,
  signup,
  logout,
  getUser,
} = require("../controllers/auth.controllers");

const { getSession } = require("../controllers/session.controller");

route
  .get("/session", getSession)
  .post("/signup", signup)
  .post("/login", login)
  .post("/logout", logout)
  .get("/user", getUser);

module.exports = route;
