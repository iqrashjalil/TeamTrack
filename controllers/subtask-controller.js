import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../utils/error-handler.js";
import Task from "../models/task-model.js";
import Subtask from "../models/subtask-model.js";

//* Create SubTask
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

//* Update SubTask

const updateSubtask = catchAsyncError(async (req, res, next) => {
  const { subtaskId } = req.params;
  const { title, description, assignedTo, status, dueDate } = req.body;

  const subtask = await Subtask.findByIdAndUpdate(
    subtaskId,
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

  if (!subtask) {
    return next(new ErrorHandler("SubTask Not Found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Subtask Updated Successfully",
    subtask,
  });
});

//* Delete SubTask

const deleteSubTask = catchAsyncError(async (req, res, next) => {
  const { subtaskId } = req.params;
  const subtask = await Subtask.findByIdAndDelete(subtaskId);
  if (!subtask) {
    return next(new ErrorHandler("Subtask Not Found", 404));
  }

  await Task.findByIdAndUpdate(subtask.task, {
    $pull: { subtasks: subtaskId },
  });
  res.status(200).json({
    success: true,
    message: "Subtask deleted successfully",
  });
});

//* Get SubTask By Id

const getSubtaskById = catchAsyncError(async (req, res, next) => {
  const { subtaskId } = req.params;
  const subtask = await Subtask.findById(subtaskId).populate("assignedTo");
  if (!subtask) {
    return next(new ErrorHandler("Subtask Not Found", 404));
  }
  res.status(200).json({
    success: true,
    subtask: subtask,
  });
});

// * Get sub tasks by task

const getSubTasks = catchAsyncError(async (req, res, next) => {
  const { taskId } = req.params;

  const subtasks = await Subtask.find({ task: taskId }).populate("assignedTo");

  res.status(200).json({ success: true, subtasks });
});
export default {
  createSubtask,
  getSubTasks,
  updateSubtask,
  deleteSubTask,
  getSubtaskById,
};
