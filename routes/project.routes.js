const express = require("express");
const route = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  removeProject,
} = require("../controllers/project.controller");
//const { createTaskProject } = require("../controllers/task.controllers");

route
  .get("/", getProjects)
  .get("/:projectId", getProject)
  //.post("/:projectId/task/:taskId", createTaskProject)
  .post("/", createProject)
  .put("/:projectId", updateProject)
  .delete("/:projectId", removeProject);

module.exports = route;
