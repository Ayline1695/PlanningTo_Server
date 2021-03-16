const express = require("express");
const route = express.Router();
const {
  getTasks,
  createTask,
  deleteTask,
} = require("../controllers/task.controllers");

route.get("/", getTasks).post("/", createTask).delete("/:taskId", deleteTask);

module.exports = route;
