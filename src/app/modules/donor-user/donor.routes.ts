import express from "express";
import auth from "../../middleware/auth";
import { DonorController } from "./donor.controller";
const routes = express.Router();
routes.get("/donor-list", DonorController.getAllFromDb);
routes.post("/donation-request", auth, DonorController.postFromDb);
routes.get("/donation-request", auth, DonorController.getFromDb);
routes.put("/donation-request/:requestId", auth, DonorController.updateFromDb);

export const DonorRoutes = routes;
