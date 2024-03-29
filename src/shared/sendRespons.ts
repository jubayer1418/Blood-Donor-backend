import { Response } from "express";

const sendResponse = <T>(
  res: Response,
  data: {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: {
      page: number;
      limit: number;
      skip: number;
      total: number;
    };
    data: T | null | undefined;
  }
) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
  });
};
export default sendResponse;
