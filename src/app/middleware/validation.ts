import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../../shared/catchAsync";

const validation = (schema: AnyZodObject) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    await schema.parseAsync(req.body);
    return next();
  });

export default validation;
