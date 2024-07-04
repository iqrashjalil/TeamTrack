import express from "express";
import authController from "../controllers/auth-controller.js";
import {
  authMiddleware,
  isAdmin,
  isProjectManger,
} from "../middlewares/auth-middleware.js";
import { upload } from "../upload.js";

const router = express.Router();

router
  .route("/register")
  .post(upload.single("profilePicture"), authController.register);
router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);
router.route("/getuser").get(authMiddleware, authController.getUser);
router.route("/getprofile/:id").get(authMiddleware, authController.getProfile);
router.route("/deleteuser/:id").delete(authController.deleteUser);
router.route("/updateuser/:id").put(authController.updateUser);
router
  .route("/getusers")
  .get(authMiddleware, isAdmin, authController.getAllUsers);
router
  .route("/getteammembers")
  .get(authMiddleware, isProjectManger, authController.getTeamMembers);
router
  .route("/getprojectmanagers")
  .get(authMiddleware, isAdmin, authController.getProjectManagers);
router
  .route("/assignteammember")
  .get(authMiddleware, isAdmin, authController.assignTeamMember);
router
  .route("/getunassignedteammembers")
  .get(authMiddleware, isAdmin, authController.getUnassignedTeamMembers);
export default router;
