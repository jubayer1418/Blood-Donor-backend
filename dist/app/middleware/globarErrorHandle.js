"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        const errmessages = err.issues.map((message) => {
            return {
                field: message.path[0],
                message: message.message,
            };
        });
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: errmessages.map((message) => message.message).toString(),
            errorDetails: { issues: errmessages },
        });
    }
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong",
        errorDetails: err,
    });
};
exports.default = globalErrorHandler;
