import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import { Conversation } from "../models/conversationModel.js";
import mongoose from "mongoose";

export const newConversation = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { senderId, receiverId } = req.body;

  const senderID = new mongoose.Types.ObjectId(senderId);
  const receiverID = new mongoose.Types.ObjectId(receiverId);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  try {
    const newConversation = await Conversation.create({
      members: [senderID, receiverID],
    });

    res.status(200).json(newConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

export const getConversationsOfUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const userId = new mongoose.Types.ObjectId(req.params.userId);

  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }

  try {
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

export const getConversationOfTwoUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const firstUserId = new mongoose.Types.ObjectId(req.params.firstUserId);
  const secondUserId = new mongoose.Types.ObjectId(req.params.secondUserId);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }

  try {
    const conversation = await Conversation.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});
