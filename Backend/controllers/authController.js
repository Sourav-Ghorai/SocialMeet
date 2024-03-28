import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";

export const registerController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000)
    }).save();
    res.status(201).json(user);
  } catch (err) {
   res.status(500).json({error: err.message});
  }
};
