const mongoose = require("mongoose");

const model = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  visibility: {
    type: String,
    enum: ["public", "private"],
    required: true,
  },
  userEmail: {
    type: String,
    ref: "User.email",
    required: true,
  },
});

const UserLibrary = mongoose.model("UserLibrary", model);

module.exports = UserLibrary;
