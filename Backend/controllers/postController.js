import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

//Create posts
export const createPostController = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const postImg = req.file?.path;

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    let postPic;
    if (postImg) {
      postPic = await uploadOnCloudinary(postImg, "Posts");
      if (!postPic?.secure_url) {
        return res.status(500).send({
          success: false,
          message: "Error in uploading postPic",
        });
      }
    }

    const newPost = await new postModel({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath: postPic?.secure_url || null,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    }).save();

    const posts = await postModel.find().sort({ createdAt: -1 });
    res.status(201).send({ posts });
  } catch (err) {
    console.error("Error in createPostController:", err);
    res.status(500).json({ message: err.message });
  }
};

//Get all the posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });
    res.status(201).send({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get only user posts
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await postModel.find({ userId }).sort({ createdAt: -1 });
    res.status(201).send({ posts });
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

    res.status(201).send({ updatedPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Add Comment
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const post = await postModel.findById(id);
    post.comments.push(comment);
    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      { comments: post.comments },
      { new: true }
    );
    res.status(201).send({ updatedPost });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

//Delete Post
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postModel.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }

    const oldPost = post.picturePath;
    const postPath = "SocialMeet/Posts/";

    const deletedPost = await post.deleteOne();
    if (!deletedPost) {
      res.status(500).json({ message: "Error in deleting post" });
    }

    if(oldPost) {
      await deleteFromCloudinary(postPath, oldPost);
    }
    res.status(201).send({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
