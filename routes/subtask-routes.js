import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { isProjectManger } from "../middlewares/auth-middleware.js";
import subtaskController from "../controllers/subtask-controller.js";

const router = express.Router();

router
  .route("/createsubtask")
  .post(authMiddleware, isProjectManger, subtaskController.createSubtask);
router
  .route("/updatesubtask/:subtaskId")
  .put(authMiddleware, isProjectManger, subtaskController.updateSubtask);
router
  .route("/deletesubtask/:subtaskId")
  .delete(authMiddleware, isProjectManger, subtaskController.deleteSubTask);
router
  .route("/getsubtask/:subtaskId")
  .get(authMiddleware, subtaskController.getSubtaskById);
router
  .route("/getsubtasks/:taskId")
  .get(authMiddleware, subtaskController.getSubTasks);

export default router;
