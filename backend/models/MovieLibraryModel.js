const mongoose = require("mongoose");

const model = new mongoose.Schema({
  libraryTitle: {
    type: String,
    ref: "UserLibrary.title",
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

model.index({ libraryTitle: 1, movieId: 1 }, { unique: true });

const MovieLibrary = mongoose.model("MovieLibrary", model);

module.exports = MovieLibrary;
