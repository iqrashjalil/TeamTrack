import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import User from "../models/user-model.js";
import sendToken from "../utils/jwtToken.js";
import { ErrorHandler } from "../utils/error-handler.js";

//* Register
const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, role, profilePicture } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(
      new ErrorHandler(`User wtih email:${email} Already Exist`, 400)
    );
  }
  const user = await User.create({
    name,
    email,
    password,
    role,
    profilePicture,
  });

  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    data: user,
  });
});

//* Login
const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }
  sendToken(user, 200, res);
});

//* Logout User

const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(0) });
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

//* Get Profile

const getProfile = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  res.status(200).json({
    success: true,
    profile: user,
  });
});

//* Delete User

const deleteUser = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

//* Update User

const updateUser = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const updates = req.body;
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    data: user,
  });
});

export default { register, login, logout, getProfile, deleteUser, updateUser };
