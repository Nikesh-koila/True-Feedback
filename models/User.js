import mongoose, { Schema, model } from "mongoose";

const msgSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "User name required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    verifyCode: {
      type: String,
      required: [true, "Verify code is required"],
    },
    verifyCodeExpiry: {
      type: Date,
      required: [true, "Verify code Expiry is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAcceptingMsg: {
      type: Boolean,
      default: true,
    },
    messages: [msgSchema],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

const userModel = mongoose.models.User || model("User", userSchema);

export default userModel;
