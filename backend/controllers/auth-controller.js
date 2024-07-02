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

//* Get All Users

const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new ErrorHandler("No Users Found", 404));
  }
  res.status(200).json({
    success: true,
    All_Users: users,
  });
});

//* Get All Team_Members

const getTeamMembers = catchAsyncError(async (req, res, next) => {
  const projectManagerId = req.user.id;

  const projectManager = await User.findById(projectManagerId);

  console.log("Project Manager:", projectManager);

  if (!projectManager) {
    return next(new ErrorHandler("Project Manager not found", 404));
  }

  console.log("Managed Team Members:", projectManager.managedTeamMembers);

  if (
    !projectManager.managedTeamMembers ||
    projectManager.managedTeamMembers.length === 0
  ) {
    return next(new ErrorHandler("No Managed Team Members Found", 404));
  }

  const teamMembers = await User.find({
    role: "team_member",
    _id: { $in: projectManager.managedTeamMembers },
  });

  console.log("Team Members Found:", teamMembers);

  if (!teamMembers || teamMembers.length === 0) {
    return next(new ErrorHandler("No Team Members Found", 404));
  }

  res.status(200).json({
    success: true,
    team_members: teamMembers,
  });
});

//* Assign Team Members to Project Manager

const assignTeamMember = catchAsyncError(async (req, res, next) => {
  const { projectManagerId, teamMemberId } = req.body;

  const projectManager = await User.findById(projectManagerId);

  if (!projectManager) {
    return next(new ErrorHandler("Project Manager not found", 404));
  }

  const teamMember = await User.findById(teamMemberId);

  if (!teamMember || teamMember.role !== "team_member") {
    return next(new ErrorHandler("Team Member not found or invalid role", 404));
  }
  if (projectManager.managedTeamMembers.includes(teamMember._id)) {
    return next(
      new ErrorHandler(
        "Team Member already assigned to this Project Manager",
        400
      )
    );
  }
  projectManager.managedTeamMembers.push(teamMember._id);
  await projectManager.save();

  res.status(200).json({
    success: true,
    message: "Team Member assigned successfully",
    managedTeamMembers: projectManager.managedTeamMembers,
  });
});

//*  fetch unassigned team members
const getUnassignedTeamMembers = catchAsyncError(async (req, res, next) => {
  const projectManagers = await User.find({ role: "project_manager" });

  let assignedTeamMembers = [];
  projectManagers.forEach((pm) => {
    assignedTeamMembers = assignedTeamMembers.concat(pm.managedTeamMembers);
  });

  const unassignedTeamMembers = await User.find({
    role: "team_member",
    _id: { $nin: assignedTeamMembers },
  });

  if (!unassignedTeamMembers || unassignedTeamMembers.length === 0) {
    return next(new ErrorHandler("No unassigned Team Members Found", 404));
  }

  res.status(200).json({
    success: true,
    team_members: unassignedTeamMembers,
  });
});

//* Get All Project_managers

const getProjectManagers = catchAsyncError(async (req, res, next) => {
  const projectManagers = await User.find({ role: "project_manager" });
  if (!projectManagers) {
    return next(new ErrorHandler("No Project Managers Found", 404));
  }
  res.status(200).json({
    success: true,
    project_managers: projectManagers,
  });
});
export default {
  register,
  login,
  logout,
  getProfile,
  deleteUser,
  updateUser,
  getAllUsers,
  getProjectManagers,
  getTeamMembers,
  assignTeamMember,
  getUnassignedTeamMembers,
};
