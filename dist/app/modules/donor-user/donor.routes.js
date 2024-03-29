"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const validation_1 = __importDefault(require("../../middleware/validation"));
const donor_controller_1 = require("./donor.controller");
const donor_validation_1 = require("./donor.validation");
const routes = express_1.default.Router();
routes.get("/donor-list", donor_controller_1.DonorController.getAllFromDb);
routes.post("/donation-request", (0, validation_1.default)(donor_validation_1.DororValidation.createDonor), (0, auth_1.default)(), donor_controller_1.DonorController.postFromDb);
routes.get("/donation-request", (0, auth_1.default)(), donor_controller_1.DonorController.getFromDb);
routes.put("/donation-request/:requestId", (0, auth_1.default)(), donor_controller_1.DonorController.updateFromDb);
exports.DonorRoutes = routes;