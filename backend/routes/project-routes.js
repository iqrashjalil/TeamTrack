import express from "express";
import projectController from "../controllers/project-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = express.Router();

router
  .route("/createProject")
  .post(authMiddleware, projectController.createProject);
router
  .route("/updateproject/:id")
  .put(authMiddleware, projectController.updateProject);
export default router;
