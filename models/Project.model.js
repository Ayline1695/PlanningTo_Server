const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    imageUrl: { type: String },
    date: { type: String, timestamps: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
