const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: String,
    date: Date,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
