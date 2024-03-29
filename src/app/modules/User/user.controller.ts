import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendRespons";
import { userService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.loginUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: result,
  });
});
export const userController = {
  createUser,
  loginUser,
};
