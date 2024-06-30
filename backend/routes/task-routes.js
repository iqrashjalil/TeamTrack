import express from "express";
import taskController from "../controllers/task-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { isProjectManger } from "../middlewares/auth-middleware.js";

const router = express.Router();

router
  .route("/createtask")
  .post(authMiddleware, isProjectManger, taskController.createTask);

export default router;
