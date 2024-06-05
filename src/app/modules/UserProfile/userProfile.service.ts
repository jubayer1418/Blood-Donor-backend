import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import AppError from "../../errors/AppError";

const getFromDb = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      userProfile: true,
    },
  });

  return result;
};
const updateFromDb = async (
  id: string,
  userPayload: any,
  userProfilePayload: any
) => {
  console.log("User payload:", userPayload);
  console.log("User profile payload:", userProfilePayload);

  let result: any = {};
  if (userPayload) {
    const data = await prisma.user.findUniqueOrThrow({ where: { id } });

    const user = await prisma.user.update({
      where: { id },
      data: userPayload,
    });
    result["user"] = user;
  }
  if (userProfilePayload) {
    await prisma.userProfile.findUniqueOrThrow({ where: { userId: id } });
    const profile = await prisma.userProfile.update({
      where: { userId: id },
      data: userProfilePayload,
    });
    result["userProfile"] = profile;
  }
  return result;
};

export const profileService = {
  getFromDb,
  updateFromDb,
};
