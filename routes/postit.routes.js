const { Router } = require("express");
const route = Router();
const {
  getList,
  getLists,
  updateList,
  deleteList,
  createList,
} = require("../controllers/postit.controller");

route
  .get("/", getLists)
  .get("/:listId", getList)
  .post("/", createList)
  .patch("/:listId", updateList)
  .delete("/:listId", deleteList);

module.exports = route;
