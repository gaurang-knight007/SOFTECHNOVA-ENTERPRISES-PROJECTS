const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter name"],
  },
  year: {
    type: String,
    required: [true, "Please enter date"],
  },
  image: {
    type: String,
    required: [true, "Please enter imaglink"],
  },
  description: {
    type: String,
    required: [true, "Please enter Description"],
  },
});

const contentData = mongoose.model("Movies", contentSchema);
module.exports = contentData;
