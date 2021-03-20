const express = require("express");
const route = express.Router();
const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/task.controllers");

route
  .post("/", createTask)
  .get("/:projectId/tasks", getTasks)
  .delete("/:taskId", deleteTask)
  .patch("/:taskId", updateTask);

module.exports = route;
