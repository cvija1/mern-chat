import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:conversationId", protect, getMessages);

export { router as messageRoute };
