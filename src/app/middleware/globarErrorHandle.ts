import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    const errmessages = err.issues.map((message) => {
      return {
        field: message.path[0],
        message: message.message,
      };
    });
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: errmessages.map((message) => message.message).toString(),
      errorDetails: { issues: errmessages },
    });
  }
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err?.message || "Something went wrong",
    errorDetails: err,
  });
};

export default globalErrorHandler;
