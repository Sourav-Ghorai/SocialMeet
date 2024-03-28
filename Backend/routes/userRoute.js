import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getFriendsController,
  getUserController,
  modifyFriendsController,
} from "../controllers/userController.js";

const router = express.Router();

//Read
router.get("/:id", verifyToken, getUserController);
router.get("/:id/friends", verifyToken, getFriendsController);

//Update friend list
router.patch("/:id/:friendId", verifyToken, modifyFriendsController);

export default router;
