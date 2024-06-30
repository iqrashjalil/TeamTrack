import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Project from "../models/project-model.js";
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
export default { createProject, updateProject };
