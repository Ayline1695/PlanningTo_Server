const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageUrl: { type: String, default: [true, "/img/user.png"] },
    project: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
