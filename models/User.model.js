const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageUrl: {
      type: String,
      default: "https://www.shankarainfra.com/img/avatar.png",
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostIt",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
