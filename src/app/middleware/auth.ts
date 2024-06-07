import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";
import catchAsync from "../../shared/catchAsync";
import prisma from "../../shared/prisma";
import AppError from "../errors/AppError";

const auth = () => {
  return catchAsync(
    async (
      req: Request & { user?: any },
      res: Response,
      next: NextFunction
    ) => {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "No JWT is provided in the request headers!"
        );
      }
      let decoded;
      console.log(token)
      try {
        decoded = jwt.verify(token, config.jwt.jwt_secret as Secret);
      } catch (error) {
        console.log(error)
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "The provided JWT (JSON Web Token) has expired."
        );
      }
      const { id } = decoded as JwtPayload;

      const user = await prisma.user.findUniqueOrThrow({ where: { id } });

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
      }

      req.user = decoded as JwtPayload;
      next();
    }
  );
};
export default auth;
