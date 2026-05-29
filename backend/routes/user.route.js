
import express from "express";
import { deleteProfile, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {  singleUpload,fileUpload } from "../middlewares/mutler.js"; // Ensure correct file name

const router = express.Router();

// User registration (POST) with file upload for profile pictures/resumes
router.route("/register").post(singleUpload, register);

// User login (POST)
router.route("/login").post(login);

// User logout (GET)
router.route("/logout").get(logout);

// Profile update (PUT) - Auth required before file upload
router.route("/profile/update").put(isAuthenticated, fileUpload, updateProfile);

router.route("/delete_user").delete(isAuthenticated,deleteProfile);


export default router;
