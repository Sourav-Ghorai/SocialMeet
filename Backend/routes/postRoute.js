import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getAllPosts,
  getUserPosts,
  likePost,
} from "../controllers/postController.js";

const router = express.Router();

//Get all posts
router.get("/", verifyToken, getAllPosts);
router.get("/:userId/post", verifyToken, getUserPosts);

//Update post
router.patch("/:id/like", verifyToken, likePost);

export default router;