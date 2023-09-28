import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../config/uploader.js";
// import { uploadAvatarRoute } from "../config/uploader.js";
import multer from "multer";
import {
  registerUser,
  loginUser,
  verifyUser,
  getUserData,
  updateUser,
  uploadUserAvatar,
  getUsers,
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  getFriends,
  getFriendsRequest,
  getOtherUser,
} from "../controllers/userController.js";
import path from "path";

const router = express.Router();

router.get("/", protect, getUsers);
router.post("/", registerUser);
router.get("/friends", protect, getFriends);
router.get("/friends/request", protect, getFriendsRequest);
router.post("/login", loginUser);
router.get("/confirm/:confirmationCode", verifyUser);
router.get("/profile/:id", protect, getUserData);
router.put("/profile/:id", protect, updateUser);
router.put(
  "/profile/avatar/:id",
  protect,
  upload.single("data"),
  uploadUserAvatar
);
router.post("/request", protect, sendFriendRequest);
router.put("/request", protect, acceptFriendRequest);
router.delete("/request", protect, cancelFriendRequest);
router.get("/:userId", protect, getOtherUser);
export { router as userRoute };
