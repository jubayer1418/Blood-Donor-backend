"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileRouters = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const userProfile_controller_1 = require("./userProfile.controller");
const routes = express_1.default.Router();
routes.get("/my-profile", (0, auth_1.default)(), userProfile_controller_1.profileController.getUserProfile);
routes.put("/my-profile", (0, auth_1.default)(), userProfile_controller_1.profileController.updateProfile);
exports.userProfileRouters = routes;
