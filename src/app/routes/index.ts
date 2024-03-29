import express from "express";
import { DonorRoutes } from "../modules/donor-user/donor.routes";
import { userRouters } from "../modules/User/user.routes";
import { userProfileRouters } from "../modules/UserProfile/userProfile.routers";
const router = express.Router();
const modulerRoutes = [
  {
    path: "/",
    route: userRouters,
  },
  {
    path: "/",
    route: DonorRoutes,
  },
  {
    path: "/",
    route: userProfileRouters,
  },
];
modulerRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
