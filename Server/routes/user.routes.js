import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  forgotPassword,
  resetPassword,
  register,
  updateUser,
  changePassword,
} from "../controllers/user.controller.js";
import { isLoggedin } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/register", upload.single("avatar"), register);

router.post("/login", login);
router.get("/logout", logout);
router.post("/me", isLoggedin, getProfile);
router.post("/reset", forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.post("/change-password", isLoggedin, changePassword);
router.put("/update/:id", isLoggedin, upload.single("avatar"), updateUser);

export default router;
