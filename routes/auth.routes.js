const { Router } = require("express");
const route = Router();
//const { withAuth } = require("../middlewares/withAuth");
const fileParser = require("./../configs/cloudinary-setup.config");
const {
  login,
  signup,
  logout,
  getUser,
  updateUser,
  uploadImage,
} = require("../controllers/auth.controllers");

const { getSession } = require("../controllers/session.controller");

route
  .get("/session", getSession)
  .post("/signup", signup)
  .post("/login", login)
  .post("/logout", logout)
  .get("/user", getUser)
  .post("/upload", fileParser.single("file"), uploadImage)
  .patch("/:userId", updateUser);

module.exports = route;
