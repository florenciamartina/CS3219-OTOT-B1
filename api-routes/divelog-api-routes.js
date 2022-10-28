import express from "express";
import {
  createDivelog,
  getDiveLogByYear,
  getDiveLogByName,
  updateDivelog,
  deleteDivelog,
} from "../controller/divelog-controller.js";
// import { verifyUser } from "../middleware/authJWT,js";

// Initialize express router
const router = express.Router();

router.post("/create-divelog", createDivelog);
router.get("/year", getDiveLogByYear);
router.get("/name", getDiveLogByName);
router.put("/update-divelog", updateDivelog);
router.delete("/delete-divelog", deleteDivelog);
// router.post("/create-divelog", verifyUser, createDivelog);
// router.get("/year", verifyUser, getDiveLogByYear);
// router.get("/name", verifyUser, getDiveLogByName);
// router.put("/update-divelog", verifyUser, updateDivelog);
// router.delete("/delete-divelog", verifyUser, deleteDivelog);

// Export API routes
// module.exports = router;
export default router;
