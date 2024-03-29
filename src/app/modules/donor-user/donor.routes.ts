import express from "express";
import auth from "../../middleware/auth";
import validation from "../../middleware/validation";
import { DonorController } from "./donor.controller";
import { DororValidation } from "./donor.validation";
const routes = express.Router();
routes.get("/donor-list", DonorController.getAllFromDb);
routes.post(
  "/donation-request",
  validation(DororValidation.createDonor),
  auth(),
  DonorController.postFromDb
);
routes.get("/donation-request", auth(), DonorController.getFromDb);
routes.put(
  "/donation-request/:requestId",
  auth(),
  DonorController.updateFromDb
);

export const DonorRoutes = routes;
