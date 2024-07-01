import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../utils/error-handler.js";
import Task from "../models/task-model.js";
import Subtask from "../models/subtask-model.js";
import Project from "../models/project-model.js";

const createSubtask = catchAsyncError(async (req, res, next) => {
  const { title, description, assignedTo, taskId, dueDate } = req.body;

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  const subtask = new Subtask({
    title,
    description,
    assignedTo,
    task: taskId,
    dueDate,
  });

  await subtask.save();
  task.subtasks.push(subtask._id);
  await task.save();

  res.status(201).json({
    success: true,
    message: "Subtask created successfully",
    subtask,
  });
});

// * Get sub tasks by task

const getSubTasks = catchAsyncError(async (req, res, next) => {
  const { taskId } = req.params;

  const subtasks = await Subtask.find({ task: taskId }).populate("assignedTo");

  res.status(200).json({ success: true, subtasks });
});
export default { createSubtask, getSubTasks };
