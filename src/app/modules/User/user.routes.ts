import express from "express";
import validation from "../../middleware/validation";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";
import auth from "../../middleware/auth";
const routes = express.Router();
routes.post(
  "/register",
  validation(userValidation.createUser),
  userController.createUser
);
routes.post("/login", userController.loginUser);
routes.post("/change_password",auth(), userController.changePassword);
routes.put("/change_role_status",auth(),userController.changeRoleStatus)

export const userRouters = routes;
