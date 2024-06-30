import express from "express";
import projectController from "../controllers/project-controller.js";
import {
  authMiddleware,
  isAdmin,
  isProjectManger,
} from "../middlewares/auth-middleware.js";

const router = express.Router();

router
  .route("/createProject")
  .post(authMiddleware, isAdmin, projectController.createProject);
router
  .route("/updateproject/:id")
  .put(authMiddleware, isProjectManger, projectController.updateProject);
export default router;
