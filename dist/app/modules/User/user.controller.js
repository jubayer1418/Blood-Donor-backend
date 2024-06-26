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
exports.userController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendRespons_1 = __importDefault(require("../../../shared/sendRespons"));
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.createUser(req.body);
    (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User registered successfully",
        data: result,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.loginUser(req.body);
    (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User logged in successfully",
        data: result,
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.changePassword(req.user.id, req.body);
    (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User Change Password  successfully",
        data: result,
    });
}));
const changeRoleStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const result = yield user_service_1.userService.changeRoleStatus(req.user.id, req.body);
    (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User Change Role and Status  successfully",
        data: result,
    });
}));
exports.userController = {
    createUser,
    loginUser,
    changePassword,
    changeRoleStatus
};
