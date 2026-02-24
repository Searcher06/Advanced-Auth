import { Router } from "express";
import {
  loginHandler,
  registerHandler,
  verifyEmailHandler,
} from "../controllers/auth/auth.controller";

const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/verify-email", verifyEmailHandler);

export default router;
