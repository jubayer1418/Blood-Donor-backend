import express from "express";
import { DonorController } from "./donor.controller";
const routes = express.Router();
routes.get("/donor-list", DonorController.getAllFromDb);
routes.post("/donation-request", DonorController.postFromDb);
routes.get("/donation-request", DonorController.getFromDb);
routes.put("/donation-request/:requestId", DonorController.updateFromDb);

export const DonorRoutes = routes;
