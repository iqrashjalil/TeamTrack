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
router.route("/updateproject/:id").put(projectController.updateProject);
router
  .route("/deleteproject/:id")
  .delete(authMiddleware, isAdmin, projectController.deleteProject);
router
  .route("/getallprojects")
  .get(authMiddleware, projectController.getAllProjects);
router
  .route("/getproject/:id")
  .get(authMiddleware, projectController.getProject);
router
  .route("/getuserprojects")
  .get(authMiddleware, isProjectManger, projectController.getUserProjects);

export default router;
