import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Please add a email"],
    },
    username: {
      type: String,
      required: [true, "Please add username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    status: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    avatarUrl: { type: String },
    friends: [mongoose.Schema.Types.ObjectId],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
