import express from "express";
import { createUser, signIn } from "../controller/user-controller.js";

// Initialize express router
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", signIn);

// Export API routes
// module.exports = router;
export default router;
