import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


//Register controller
export const registerController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
    } = req.body;

    const imgPath = req.file.path;

    //Check for Existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered please login.",
      });
    }

   const userPic = await uploadOnCloudinary(imgPath, "UserPic");

   if (!userPic?.secure_url) {
     return res.status(500).send({
       success: false,
       message: "Error in uploading userpic",
     });
   }
   // console.log(userPic.secure_url)

   const hashedPassword = await hashPassword(password);
   const user = await new userModel({
     firstName,
     lastName,
     email,
     password: hashedPassword,
     picturePath: userPic.secure_url,
     friends,
     location,
     occupation,
     viewedProfile: Math.floor(Math.random() * 10000),
     impressions: Math.floor(Math.random() * 10000),
   }).save();
   res.status(201).send({
     success: true,
     message: "User Register Successfully",
     user,
   });
    
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//Login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(200).send({
         success: false,
         message: "Email is not registered.",
       });
    }

    // Compare passwords
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(200).send({
         success: false,
         message: "Invalid Password",
       });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Remove password from user object before sending response
    user.password = undefined;

    //Send the success status
    res.status(201).send({
      success: true,
      message: "Login Successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};
