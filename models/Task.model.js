const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
