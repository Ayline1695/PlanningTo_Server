const express = require("express");
const route = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  removeProject,
} = require("../controllers/project.controller");

route
  .get("/", getProjects)
  .get("/:projectId", getProject)
  .post("/", createProject)
  .put("/:projectId", updateProject)
  .delete("/:projectId", removeProject);

module.exports = route;
