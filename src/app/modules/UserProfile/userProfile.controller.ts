import { userProfileRouters } from './userProfile.routers';
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendRespons";
import { profileService } from "./userProfile.service";

const getUserProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await profileService.getFromDb(req.user.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile retrieved successfully",
      data: result,
    });
  }
);
const updateProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    console.log(req.body)
    const userProfilePayload =req.body.userProfilePayload
    const userPayload =req.body.userPayload
    const result = await profileService.updateFromDb(req.user.id, userPayload,userProfilePayload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile updated successfully",
      data: result,
    });
  }
);
export const profileController = {
  getUserProfile,
  updateProfile,
};
