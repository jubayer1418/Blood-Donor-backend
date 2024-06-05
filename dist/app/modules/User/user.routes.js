"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouters = void 0;
const express_1 = __importDefault(require("express"));
const validation_1 = __importDefault(require("../../middleware/validation"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const routes = express_1.default.Router();
routes.post("/register", (0, validation_1.default)(user_validation_1.userValidation.createUser), user_controller_1.userController.createUser);
routes.post("/login", user_controller_1.userController.loginUser);
routes.post("/change_password", (0, auth_1.default)(), user_controller_1.userController.changePassword);
routes.put("/change_role_status", (0, auth_1.default)(), user_controller_1.userController.changeRoleStatus);
exports.userRouters = routes;
