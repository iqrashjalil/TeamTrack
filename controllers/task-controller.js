import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../utils/error-handler.js";
import Task from "../models/task-model.js";
import Project from "../models/project-model.js";

//* Create Task
const createTask = catchAsyncError(async (req, res, next) => {
  const { title, description, assignedTo, projectId, dueDate } = req.body;

  const project = await Project.findById(projectId);
  if (!project) {
    return next(new ErrorHandler("Project not found", 400));
  }

  const task = new Task({
    title,
    description,
    assignedTo,
    project: projectId,
    dueDate,
  });

  await task.save();
  project.task.push(task._id);
  await project.save();

  res
    .status(201)
    .json({ success: true, message: "Task created successfully", task });
});

//* Update task

const updateTask = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, assignedTo, status, dueDate } = req.body;

  const task = await Task.findByIdAndUpdate(
    id,
    {
      title,
      description,
      assignedTo,
      status,
      dueDate,
      updatedAt: Date.now(),
    },
    { new: true }
  );

  if (!task) {
    return next(new ErrorHandler("Task Not Found", 400));
  }

  res.status(200).json({ success: true, message: "Task updated successfully" });
});

//* Delete Task

const deleteTask = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  if (!task) {
    return next(new ErrorHandler("Task Not Found", 400));
  }

  await Task.findByIdAndDelete(id);

  await Project.findByIdAndUpdate(task.project, {
    $pull: { task: id },
  });

  res.status(200).json({ success: true, message: "Task deleted successfully" });
});

//* Get Task By Id

const getTaskById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id)
    .populate("assignedTo")
    .populate("subtasks");
  if (!task) {
    return next(new ErrorHandler("Task Not Found", 400));
  }
  res.status(200).json({ success: true, Task: task });
});

//* Get Assigned Tasks

const getAssignedTasks = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;

  const tasks = await Task.find({ assignedTo: userId }).populate("subtasks");
  console.log(tasks);
  if (!tasks || tasks.length === 0) {
    return next(new ErrorHandler("No tasks found for this user", 404));
  }

  res.status(200).json({
    success: true,
    tasks,
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
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  getTaskById,
  getAssignedTasks,
};
