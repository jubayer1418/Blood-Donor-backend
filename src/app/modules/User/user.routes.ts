import express from "express";
import { userController } from "./user.controller";
const routes = express.Router();
routes.post("/register", userController.createUser);
routes.post("/login", userController.loginUser);

export const userRouters = routes;
