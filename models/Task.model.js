const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "progress", "done"],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
