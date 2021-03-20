const mongoose = require("mongoose");

const PostIt = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    status: { type: Boolean, default: false },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostIt", PostIt);
