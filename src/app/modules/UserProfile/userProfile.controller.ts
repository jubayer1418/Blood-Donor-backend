import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendRespons";
import { profileService } from "./userProfile.service";

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await profileService.getFromDb();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile retrieved successfully",
    data: result,
  });
});
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await profileService.updateFromDb(req.user.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile updated successfully",
    data: result,
  });
});
export const profileController = {
  getUserProfile,
  updateProfile,
};
