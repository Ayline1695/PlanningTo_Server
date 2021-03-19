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
  getTasksProjects,
} = require("../controllers/project.controller");
const {
  createTaskProject,
  deleteTask,
} = require("../controllers/task.controllers");

route
  .get("/", getProjects)
  .get("/:projectId", getProject)
  .get("/:projectId/task/:taskId", getTasksProjects)
  .post("/:projectId/task/", createTaskProject)
  .post("/", createProject)
  .post("/upload", fileParser.single("file"), uploadImage)
  .put("/:projectId", updateProject)
  .delete("/:projectId", removeProject)
  .delete("/:projectId/task/:taskId", deleteTask);

module.exports = route;
