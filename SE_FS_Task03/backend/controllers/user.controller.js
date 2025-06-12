import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataURI from "../.utils/dataURI.js";
import cloudinary from "../.utils/cloudinary.js";

// Register Controller
export const register = async (req, res) => {
  try {
    const { fullname, email, password, role, contact } = req.body;

    const file = req.file;
    const photoURL = getDataURI(file);
    const cloudinaryResponse = await cloudinary.uploader.upload(photoURL.content);

    if (!fullname || !email || !password || !role || !contact) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User is already exist with this email.",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      password: hashPassword,
      contact,
      role,
      profile: {
        profilePhoto: cloudinaryResponse.secure_url,
      }
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email does not exist.",
        success: false,
      });
    }

    const storedPassword = await bcrypt.compare(password, user.password);
    if (!storedPassword) {
      return res.status(400).json({
        message: "Wrong Password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "User doesn't exist with this role",
        success: false,
      });
    }

    const tokenData = {
      id: user._id,
    };

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      contact: user.contact,
      role: user.role,
      profile: user.profile,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: 'strict',
      })
      .json({
        message: "User login successfully.",
        user,
        success: true,
      });

  } catch (error) {
    console.log(error);
  }
};

// Logged out controller
export const logout = async (req, res) => {
  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    message: "Logged out successfully",
    success: true,
  });
};

// Update controller
export const updateProfile = async (req, res) => {
  try {
    const { fullname, contact, bio, skills } = req.body;

    const file = req.file
    const fileuri = getDataURI(file);
    const cloudResponse = await cloudinary.uploader.upload(fileuri.content);

    let user = await User.findOne({ _id: req.id });

    // update
    if (fullname)
      user.fullname = fullname;
    if (contact)
      user.contact = contact;
    if (bio)
      user.profile.bio = bio;
    if (skills) {
      const skillsArray = skills.split(",");
      user.profile.skills = skillsArray;
    }
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      contact: user.contact,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Update successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
