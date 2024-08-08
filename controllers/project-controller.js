import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Project from "../models/project-model.js";
import Task from "../models/task-model.js";
import User from "../models/user-model.js";
import { ErrorHandler } from "../utils/error-handler.js";

//* Create project
const createProject = catchAsyncError(async (req, res, next) => {
  const { projectName, description, projectManager } = req.body;
  const manager = await User.findById(projectManager).populate(
    "managedTeamMembers"
  );

  if (!manager) {
    return res
      .status(404)
      .json({ success: false, message: "Project Manager not found" });
  }
  const project = new Project({
    projectName,
    description,
    createdBy: req.user._id,
    projectManager,
    members: manager.managedTeamMembers,
  });

  await project.save();
  res
    .status(201)
    .json({ success: true, message: "Project Created Successfully" });
});

//* Update Project

const updateProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { projectName, description, projectManager } = req.body;

  const manager = await User.findById(projectManager).populate(
    "managedTeamMembers"
  );

  // Find the project by ID
  let project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  // Update the project
  await project.updateOne({
    projectName,
    description,
    projectManager,
    ...(manager?.managedTeamMembers && {
      members: manager.managedTeamMembers,
    }),
  });

  res
    .status(200)
    .json({ success: true, message: "Project Updated Successfully" });
});

//* Add New Member In the project

const addMember = catchAsyncError(async (req, res, next) => {
  const { projectId, teamMemberId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    return next(new ErrorHandler("Project Not Found", 404));
  }

  // Check if the member is already in the members array
  if (project.members.includes(teamMemberId)) {
    return next(new ErrorHandler("Member Is Already Part Of The Project", 404));
  }

  // Add the new member to the members array
  project.members.push(teamMemberId);

  // Save the updated project
  await project.save();

  res.status(200).json({ success: true, message: "Member added successfully" });
});
//* Delete Project

const deleteProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const project = await Project.findByIdAndDelete(id);
  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }
  res
    .status(200)
    .json({ success: true, message: "Project Deleted Successfully" });
});

//* Get All Projects

const getAllProjects = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const userRole = req.user.role;

  let projects;

  if (userRole === "admin") {
    projects = await Project.find()
      .populate("projectManager")
      .populate("members");
  } else if (userRole === "project_manager") {
    projects = await Project.find({ projectManager: userId })
      .populate("projectManager")
      .populate("members");
  } else if (userRole === "team_member") {
    projects = await Project.find({ members: userId })
      .populate("projectManager")
      .populate("members");
  } else {
    return next(new ErrorHandler("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    All_Projects: projects,
  });
});

//* Get Single Project

const getProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id)
    .populate("members")
    .populate("task")
    .populate("projectManager");

  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    projectDetails: project,
  });
});

//* Get Project for a user

const getUserProjects = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const projects = await Project.find({ projectManager: userId });

  if (!projects) {
    return next(new ErrorHandler("No projects found for this user", 404));
  }

  res.status(200).json({
    success: true,
    projects: projects,
  });
});

//* Remove Team Member From Project
const removeMemberFromProject = catchAsyncError(async (req, res, next) => {
  const { projectId, teamMemberId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    res.status(404);
    throw new Error("project not found");
  }

  const memberIndex = project.members.indexOf(teamMemberId);
  if (memberIndex === -1) {
    res.status(404);
    throw new Error("Team member not found");
  }

  // Remove the team member
  project.members.splice(memberIndex, 1);

  // Save the updated user document
  await project.save();

  res
    .status(200)
    .json({ success: true, message: "Team member removed successfully" });
});

export default {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProject,
  getUserProjects,
  removeMemberFromProject,
  addMember,
};
