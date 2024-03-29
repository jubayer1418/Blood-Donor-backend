import express from "express";
import { userRouters } from "../modules/User/user.routes";
import { DonorRoutes } from "../modules/donor-user/donor.routes";
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
];
modulerRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
