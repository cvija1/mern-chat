import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendConfirmationEmail } from "../config/nodemailer.config.js";
import { User } from "../models/userModel.js";
import { FriendRequest } from "../models/friendRequestModel.js";
import mongoose from "mongoose";
import { Message } from "../models/messageModel.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { conversationId, sender, text } = req.body;

  const conId = new mongoose.Types.ObjectId(conversationId);
  const senderId = new mongoose.Types.ObjectId(sender);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  try {
    const message = await Message.create({
      conversationId: conId,
      sender: senderId,
      text,
    });

    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

export const getMessages = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const conversationId = req.params.conversationId;

  const conId = new mongoose.Types.ObjectId(conversationId);

  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  try {
    const messages = await Message.find({
      conversationId: conId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});
