import express from "express";
import validation from "../../middleware/validation";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";
const routes = express.Router();
routes.post(
  "/register",
  validation(userValidation.createUser),
  userController.createUser
);
routes.post("/login", userController.loginUser);

export const userRouters = routes;
