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
  const project = await Project.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }
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
  const projects = await Project.find();
  res.status(200).json({
    success: true,
    All_Projects: projects,
  });
});
//* Get Single Project

const getProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    projectDetails: project,
  });
});

//* Get Tasks by project Name
const getTasks = catchAsyncError(async (req, res, next) => {
  const { projectId } = req.params;

  const tasks = await Task.find({ project: projectId })
    .populate("subtasks")
    .populate("assignedTo");

  res.status(200).json({ success: true, tasks });
});
export default {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProject,
  getTasks,
};
