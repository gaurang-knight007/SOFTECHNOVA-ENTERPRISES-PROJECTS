const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
  },
  {
    timestamps: true,
  }
);

//create model
const Signupdata = mongoose.model("Signup", signupSchema);
module.exports = Signupdata;
