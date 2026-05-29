import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
    getAdminJobs,
    getAllJobs,
    getJobById,
    postJob,
    updateJobById,
    deleteJobById,
} from "../controllers/job.controller.js";

const router = express.Router();

// Protected routes (require authentication)
router.route("/post").post(isAuthenticated, postJob);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/get/:id").put(isAuthenticated, updateJobById);
router.delete("/:id", deleteJobById);

// Public route (accessible to all users)
router.route("/get").get(getAllJobs); // Removed isAuthenticated middleware

export default router;