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
const changePassword = catchAsync(async (req: Request  & { user?: any }, res: Response) => {
  const result = await userService.changePassword(req.user.id,req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Change Password  successfully",
    data: result,
  });
});
const changeRoleStatus = catchAsync(async (req: Request  & { user?: any }, res: Response) => {
  console.log(req.body)
  const result = await userService.changeRoleStatus(req.user.id,req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Change Role and Status  successfully",
    data: result,
  });
});
export const userController = {
  createUser,
  loginUser,
  changePassword,
  changeRoleStatus
};
