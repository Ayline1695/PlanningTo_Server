const express = require("express");
const route = express.Router();
const fileParser = require("./../configs/cloudinary-setup.config");
const {
  getProjects,
  getProject,
  createProject,
  uploadImage,
  updateProject,
  removeProject,
} = require("../controllers/project.controller");
//const { createTaskProject } = require("../controllers/task.controllers");

route
  .get("/", getProjects)
  .get("/:projectId", getProject)
  //.post("/:projectId/task/:taskId", createTaskProject)
  .post("/", createProject)
  .post("/upload", fileParser.single("file"), uploadImage)
  .put("/:projectId", updateProject)
  .delete("/:projectId", removeProject);

module.exports = route;
