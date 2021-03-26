const Project = require("../models/Project.model");
const Task = require("../models/Task.model");
const User = require("../models/User.model");

//controlador para devolver todos los projectos

exports.getProjects = async (req, res) => {
  try {
    const { userId } = req.session;
    const { projects } = await User.findById(userId).populate("projects");
    res.status(200).json(projects);
  } catch (e) {
    res.status(400);
  }
};

exports.getProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    const tasks = await Task.find({ project: projectId });
    res.status(200).json({ project, tasks });
  } catch (e) {
    res.status(400);
  }
};

exports.createProject = async (req, res) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.status(400).json("no user");
    }
    const newProject = await Project.create(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { projects: newProject._id } },
      { new: true }
    );

    res.status(200).json({ updatedUser, newProject });
  } catch (e) {
    res.status(400).json(e);
  }
};

//Upload img
exports.uploadImage = async (req, res) => {
  console.log("req.file", req.file);
  if (!req.file) {
    next(new Error("No file uploaded"));
    return;
  }
  res.json(req.file.path);
};

exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      { new: true, omitUndefined: true }
    );
    res.status(200).json(updatedProject);
  } catch (e) {
    res.status(400);
  }
};

exports.removeProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    await Project.findByIdAndDelete(projectId);
    res.status(200).json({ message: "delete succesfull" });
  } catch (e) {
    res.status(400);
  }
};
//shallow deleted, donde se guardan lo que se ha borrado, una carpeta de basura, clase 9/03/2021

// tasks
