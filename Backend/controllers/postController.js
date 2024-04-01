import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

//Create posts
export const createPostController = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await userModel.findById(userId);
    const newPost = await new postModel({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    }).save();

    const posts = await postModel.find();
    res.status(201).send({posts});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get all the posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(201).send({posts});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get only user posts
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.body;
    const posts = await postModel.find({ userId });
    res.status(201).send({posts});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Update likes
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await postModel.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    
    res.status(201).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
