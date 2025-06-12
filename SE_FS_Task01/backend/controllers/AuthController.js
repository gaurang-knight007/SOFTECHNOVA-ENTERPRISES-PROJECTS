const Signupdata = require("../models/SignupModel");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const token = jwt.sign(
  {
    data: "foobar",
  },
  "secret",
  // { expiresIn: "1h" }
  { expiresIn: "10s" }
);

const Register = async (req, res) => {
  // res.json({message:"I am working"})
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(401).json({ message: "Please fillup the fields" });
  }
  const checkemail = await Signupdata.findOne({ email });
  if (checkemail) {
    return res.json("Email already taken");
  }
  //hash password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = await Signupdata.create({
    name,
    email,
    password: hash,
  });

  if (!user) {
    res.status(400).json({ message: "Fail in creating a new user" });
  }
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: "Lax",
  });
  res.status(200).json({ user, token });
};

const Login = async (req, res) => {
  // res.status(200).json({message:"working"})
  const { email, password } = req.body;

  const user = await Signupdata.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  const checkpassword = bcrypt.compareSync(password, user.password); // true
  if (!checkpassword) {
    return res.status(401).json({ message: "Invalid Password" });
  }
  res.cookie("jwt", token, {
    withCredentials: true,
    httpOnly: false,
  });
  res.status(200).json({ user, token });
};

module.exports = {
  Register,
  Login,
};
