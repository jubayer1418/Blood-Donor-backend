import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendRespons";
import { donorFilterableFields } from "./donor.constant";
import { DonorService } from "./donor.service";

const getAllFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = pick(req.query, donorFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await DonorService.getAllFromDb(filters, options);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Donors successfully found",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
const postFromDb = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await DonorService.postFromDb(req.user.id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Request successfully made!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getFromDb = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await DonorService.getFromDb();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Donation requests retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await DonorService.updateFromDb(
      req.params.requestId,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Donation request status successfully updated",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const DonorController = {
  getAllFromDb,
  getFromDb,
  postFromDb,
  updateFromDb,
};
