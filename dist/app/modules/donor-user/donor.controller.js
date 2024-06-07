"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonorController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendRespons_1 = __importDefault(require("../../../shared/sendRespons"));
const donor_constant_1 = require("./donor.constant");
const donor_service_1 = require("./donor.service");
const getAllFromDb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, donor_constant_1.donorFilterableFields);
        const options = (0, pick_1.default)(req.query, ["page", "limit", "sortBy", "sortOrder"]);
        const result = yield donor_service_1.DonorService.getAllFromDb(filters, options);
        (0, sendRespons_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Donors successfully found",
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
});
const postFromDb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield donor_service_1.DonorService.postFromDb(req.user.id, req.body);
        (0, sendRespons_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Request successfully made!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getFromDb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield donor_service_1.DonorService.getFromDb();
        (0, sendRespons_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Donation requests retrieved successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateFromDb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield donor_service_1.DonorService.updateFromDb(req.params.requestId, req.body);
        (0, sendRespons_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Donation request status successfully updated",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleFromDb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params);
        const result = yield donor_service_1.DonorService.getSingleFromDb(req.params.id);
        (0, sendRespons_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Single Donar successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getFromMeDb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield donor_service_1.DonorService.getFromMeDb(req.user.id);
        (0, sendRespons_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Request successfully made!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getFromMyRequestDb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield donor_service_1.DonorService.getFromMyRequestDb(req.user.id);
        (0, sendRespons_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Request successfully made!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.DonorController = {
    getAllFromDb,
    getFromDb,
    postFromDb,
    updateFromDb,
    getSingleFromDb,
    getFromMeDb,
    getFromMyRequestDb
};
