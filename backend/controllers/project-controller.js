import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Project from "../models/project-model.js";
import Task from "../models/task-model.js";
import { ErrorHandler } from "../utils/error-handler.js";

//* Create project
const createProject = catchAsyncError(async (req, res, next) => {
  const { projectName, description, projectManager } = req.body;

  const project = new Project({
    projectName,
    description,
    createdBy: req.user._id,
    projectManager,
  });

  await project.save();
  res
    .status(201)
    .json({ success: true, message: "Project Created Successfully" });
});

//* Update Project

const updateProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;
  console.log(updatedData);
  let project = await Project.findByIdAndUpdate(id);
  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  await project.updateOne(updatedData);
  res
    .status(200)
    .json({ success: true, message: "Project Updated Successfully" });
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
export default {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProject,
  getUserProjects,
};
