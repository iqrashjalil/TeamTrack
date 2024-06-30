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
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return next(new ErrorHandler("Task Not Found", 400));
  }
  res.status(200).json({ success: true, message: "Task deleted successfully" });
});

//* Get sub tasks by task

// const getSubTasks = catchAsyncError(async (req, res, next) => {
//   const { taskId } = req.params;

//   const subtasks = await Subtask.find({ task: taskId }).populate("assignedTo");

//   res.status(200).json({ success: true, subtasks });
// });
export default { createTask, updateTask, deleteTask };
