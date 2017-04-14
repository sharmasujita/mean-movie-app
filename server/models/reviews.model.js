const mongoose = require("mongoose");

// schema definition
module.exports = mongoose.model("reviews", {
  
  movieId: {
    type: Number,
    default: null,
    required: true
  },
  name: {
    type: String,
    default: null,
    required: true,
  },
  description: {
    type: String,
    default: null,
    required: true,
  },
  rating: {
    type: Number,
    default: null,
    required: true
  }
});
