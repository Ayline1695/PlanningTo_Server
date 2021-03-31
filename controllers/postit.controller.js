const List = require("../models/PostIt.model");
const User = require("../models/User.model");

//exports.getLists = async (req, res) => {
//  const lists = await List.find();
//  res.status(200).json(lists);
//};
exports.getLists = async (req, res) => {
  try {
    const { userId } = req.session;
    const { lists } = await User.findById(userId).populate("lists");
    res.status(200).json(lists);
  } catch (e) {
    res.status(400);
  }
};

//exports.getList = async (req, res) => {
//  const { listId } = req.params;
//  const list = await List.findById(listId);
//  res.status(200).json(list);
//};

exports.getList = async (req, res) => {
  try {
    const { listId } = req.params;
    const list = await List.findById(listId);
    res.status(200).json({ list });
  } catch (e) {
    res.status(400);
  }
};

exports.createList = async (req, res) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.status(400).json("no user");
    }
    const list = await List.create(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { lists: list._id } },
      { new: true }
    );

    res.status(200).json({ updatedUser, list });
  } catch (e) {
    res.status(400).json(e);
  }
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
