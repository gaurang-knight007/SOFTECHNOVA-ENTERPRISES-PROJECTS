const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
    },
    username: {
      type: String,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const reviewData = mongoose.model("Reviews", reviewSchema);
module.exports = reviewData;
