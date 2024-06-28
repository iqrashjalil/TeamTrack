import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "project_manager", "team_member"],
      default: "team_member",
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);
