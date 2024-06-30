import express from "express";
import authController from "../controllers/auth-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);
router.route("/getprofile/:id").get(authMiddleware, authController.getProfile);
router.route("/deleteuser/:id").delete(authController.deleteUser);
router.route("/updateuser/:id").put(authController.updateUser);

export default router;
