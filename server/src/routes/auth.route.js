import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  authCheckController,
  logInController,
  logOutController,
  registerController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", logInController);
router.post("/logout", logOutController);

router.get("/auth-check", protectRoute, authCheckController);

export default router;
