import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { isProjectManger } from "../middlewares/auth-middleware.js";
import subtaskController from "../controllers/subtask-controller.js";

const router = express.Router();

router
  .route("/createsubtask")
  .post(authMiddleware, isProjectManger, subtaskController.createSubtask);
router
  .route("/getsubtasks/:taskId")
  .get(authMiddleware, subtaskController.getSubTasks);

export default router;
