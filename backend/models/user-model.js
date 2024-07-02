import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name"],
      maxLength: [30, "Name Should be less than 30 characters"],
      minLength: [3, "Name Should be more than 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
      validate: [validator.isEmail, "Please enter valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password should be more then 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "project_manager", "team_member"],
      default: "team_member",
    },
    managedTeamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(user.password, saltRound);
    user.password = hashed_password;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = model("User", userSchema);

export default User;
