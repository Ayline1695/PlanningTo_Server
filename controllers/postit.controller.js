const List = require("../models/PostIt.model");

exports.getLists = async (req, res) => {
  const lists = await List.find();
  res.status(200).json(lists);
};

exports.getList = async (req, res) => {
  const { listId } = req.params;
  const list = await List.findById(listId);
  res.status(200).json(list);
};

exports.createList = async (req, res) => {
  const list = await List.create(req.body);
  res.status(200).json(list);
};

exports.updateList = async (req, res) => {
  const { listId } = req.params;
  const list = await List.findByIdAndUpdate(listId, req.body);
  res.status(200).json(list);
};
exports.deleteList = async (req, res) => {
  const { listId } = req.params;
  await List.findOneAndDelete(listId);
  res.status(200).json({ message: "list removed", listId });
};
