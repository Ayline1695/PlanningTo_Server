const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    status: String,
    default: false,
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
