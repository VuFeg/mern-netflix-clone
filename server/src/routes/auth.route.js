import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  authCheckController,
  logInController,
  logOutController,
  signupController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", logInController);
router.post("/logout", logOutController);

router.get("/auth-check", protectRoute, authCheckController);

export default router;
