const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    imageUrl: { type: String },
    date: { type: String, default: Date.now },
    tasks: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Task", default: false },
    ],
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
