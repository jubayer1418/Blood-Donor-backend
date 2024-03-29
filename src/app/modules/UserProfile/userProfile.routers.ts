import express from "express";
import { userController } from "./user.controller";
const routes = express.Router();
routes.get("/my-profile", userController.createUser);
routes.put("/my-profile", userController.loginUser);

export const userProfileRouters = routes;
