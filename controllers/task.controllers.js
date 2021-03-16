const Task = require("../models/Task.model");
const Project = require("../models/Project.model");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
};

//exports.getTask = async (req, res) => {
//  const { taskId } = req.params;
//  const task = await Task.findById(taskId);
//  res.status(200).json(task);
//};

exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json(task);
};

exports.createTaskProject = async (req, res) => {
  const task = await Task.create(req.body).then((res) => {
    return Project.findByIdAndUpdate(req.body.project, {
      $push: { task: res._id },
    });
  });
  res.status(200).json(task);
};

//exports.updateTask = async (req, res) => {
//  const { taskId } = req.params;
//  const task = await Task.findByIdAndUpdate(taskId, req.body);
//  res.status(200).json(task);
//};
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  await Task.findOneAndDelete(taskId);
  res.status(200).json({ message: "task removed", taskId });
};
