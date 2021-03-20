const Task = require("../models/Task.model");

exports.getTasks = async (req, res) => {
  const { projectId } = req.params;
  const tasks = await Task.find({ project: projectId });
  res.status(200).json(tasks);
};

exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json(task);
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  await Task.findOneAndDelete(taskId);
  res.status(200).json({ message: "task removed", taskId });
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.status, {
      omitUndefined: true,
    });

    res.status(200).json(updatedTask);
  } catch (e) {
    res.status(400).json(e);
  }
};
