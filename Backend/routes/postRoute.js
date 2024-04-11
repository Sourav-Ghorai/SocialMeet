import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
   addComment,
   deletePost,
  getAllPosts,
  getUserPosts,
  likePost,
} from "../controllers/postController.js";

const router = express.Router();

//Get all posts
router.get("/", verifyToken, getAllPosts);
router.get("/:userId", verifyToken, getUserPosts);

//Update post
router.patch("/:id/like", verifyToken, likePost);

//Add comment
router.patch("/comment/:id", verifyToken, addComment);

//Delete Post
router.delete("/delete/:postId", verifyToken, deletePost);

export default router;