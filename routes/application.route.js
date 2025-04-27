import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyjob, getapplicant, getappliedJobs, updateStatus } from "../controllers/application.controller.js";
const router = express.Router();



router.route("/apply/:id").get(isAuthenticated, applyjob);
router.route("/get").get(isAuthenticated, getappliedJobs);
router.route("/get/:id/applicants").get(isAuthenticated, getapplicant);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;