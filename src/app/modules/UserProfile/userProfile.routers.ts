import express from "express";
import { profileController } from "./userProfile.controller";
const routes = express.Router();
routes.get("/my-profile", profileController.getUserProfile);
routes.put("/my-profile", profileController.updateProfile);

export const userProfileRouters = routes;
