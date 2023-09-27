import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  newConversation,
  getConversationsOfUser,
  getConversationOfTwoUser,
} from "../controllers/conversationController.js";

const router = express.Router();

router.post("/", protect, newConversation);
router.get("/:userId", protect, getConversationsOfUser);
router.get(
  "/find/:firstUserId/:secondUserId",
  protect,
  getConversationOfTwoUser
);

export { router as conversationRoute };
