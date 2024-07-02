import express from "express";
import taskController from "../controllers/task-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { isProjectManger } from "../middlewares/auth-middleware.js";

const router = express.Router();

router
  .route("/createtask")
  .post(authMiddleware, isProjectManger, taskController.createTask);
router
  .route("/updatetask/:id")
  .put(authMiddleware, isProjectManger, taskController.updateTask);
router
  .route("/deletetask/:id")
  .delete(authMiddleware, isProjectManger, taskController.deleteTask);
router.route("/gettask/:id").get(authMiddleware, taskController.getTaskById);
router
  .route("/gettasks/:projectId")
  .get(authMiddleware, taskController.getTasks);
router.route("/mytasks").get(authMiddleware, taskController.getAssignedTasks);

export default router;
