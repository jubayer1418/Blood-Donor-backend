"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const donor_routes_1 = require("../modules/donor-user/donor.routes");
const user_routes_1 = require("../modules/User/user.routes");
const userProfile_routers_1 = require("../modules/UserProfile/userProfile.routers");
const router = express_1.default.Router();
const modulerRoutes = [
    {
        path: "/",
        route: user_routes_1.userRouters,
    },
    {
        path: "/",
        route: donor_routes_1.DonorRoutes,
    },
    {
        path: "/",
        route: userProfile_routers_1.userProfileRouters,
    },
];
modulerRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
