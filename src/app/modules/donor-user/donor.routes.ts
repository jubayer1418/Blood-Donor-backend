import express from "express";
import auth from "../../middleware/auth";
import validation from "../../middleware/validation";
import { DonorController } from "./donor.controller";
import { DororValidation } from "./donor.validation";
const routes = express.Router();
routes.get("/donor-list", DonorController.getAllFromDb);
routes.get("/donor-list/:id", DonorController.getSingleFromDb);
routes.post(
  "/donation-request",
  validation(DororValidation.createDonor),
  auth(),
  DonorController.postFromDb
);
routes.get("/donation-request", auth(), DonorController.getFromDb);
routes.get("/donation-request-me", auth(), DonorController.getFromMeDb);
routes.get("/donation-request-my", auth(), DonorController.getFromMyRequestDb);
routes.put(
  "/donation-request/:requestId",
  auth(),
  DonorController.updateFromDb
);

export const DonorRoutes = routes;
