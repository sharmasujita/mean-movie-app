const mongoose = require("mongoose");

// schema definition
module.exports = mongoose.model("movies", {
  id: {
    type: Number,
    default: null,
    required: true,
    unique: true
  },
  title: {
    type: String,
    default: null,
    required: true,
    unique: true
  },
  genre: {
    type: String,
    default: null,
    required: true,
    
  },
  rating: {
    type: Number,
    default: null,
    required: true
  },
  boxOfficeEarning: {
    type: Number,
    default: null,
    required: true
  },
  releaseDate: {
    type: Date,
    default: null,
    required: true
  },
  poster: {
    type: String,
    default: null,
    required: true
  },
  shortSynopsis: {
    type: String,
    default: null,
    required: true
  },
  mainActors: {
    type: Array,
    default: null,
    required: true
  },
  director: {
    type: String,
    default: null,
    required: true
  },
  length: {
    type: Number,
    default: null,
    required: true
  },
});
