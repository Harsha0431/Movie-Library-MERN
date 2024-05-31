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
  thumbnail: {
    type: String,
    required: true,
    default:
      "https://images.pexels.com/photos/3052727/pexels-photo-3052727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
});

const UserLibrary = mongoose.model("UserLibrary", model);

module.exports = UserLibrary;
