const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    description: { type: String, require: true },
    status: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
