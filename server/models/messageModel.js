import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
