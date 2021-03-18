const Project = require("../models/Project.model");

//controlador para devolver todos los projectos

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (e) {
    res.status(400);
  }
};

exports.getProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate(
      "tasks",
      "lists"
    );
    res.status(200).json(project);
  } catch (e) {
    res.status(400);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    console.log(req.body);
    const newProject = await Project.create(req.body);
    res.status(200).json(newProject);
  } catch (e) {
    res.status(400);
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
      { new: true }
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
