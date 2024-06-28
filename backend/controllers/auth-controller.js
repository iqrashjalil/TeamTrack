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
export default { register };
