import mongoose from "mongoose";

const friendRequestSchema = mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const FriendRequest = mongoose.model(
  "FriendRequest",
  friendRequestSchema
);
