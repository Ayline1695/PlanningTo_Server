const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageUrl: { type: String, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
