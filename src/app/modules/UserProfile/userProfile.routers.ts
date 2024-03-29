import express from "express";
import auth from "../../middleware/auth";
import { profileController } from "./userProfile.controller";
const routes = express.Router();
routes.get("/my-profile", auth(), profileController.getUserProfile);
routes.put("/my-profile", auth(), profileController.updateProfile);

export const userProfileRouters = routes;
