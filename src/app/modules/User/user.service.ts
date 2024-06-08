import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
const createUser = async (data: any) => {
  const hashPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    email: data.bloodDoner.email,
    password: hashPassword,
    name: data.bloodDoner.name,
    bloodType: data.bloodDoner.bloodType,
    location: data.bloodDoner.location || "",
    canDonateBlood: data.bloodDoner.canDonateBlood || false,
  };

  console.log(userData);
  const result = await prisma.$transaction(async (transactionClient) => {
    const createUser = await transactionClient.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        bloodType: true,
        location: true,

        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });
    const createdUserProfileData = await transactionClient.userProfile.create({
      data: { userId: createUser.id },
    });
    return { ...createUser, userProfile: createdUserProfileData };
  });

  return result;
};
// const createUser = async (data: any) => {
//   console.log(data);
//   const hashPassword: string = await bcrypt.hash(data.password, 12);

//   const userData = {
//     email: data.bloodDoner.email,
//     password: hashPassword,
//     name: data.bloodDoner.name,
//     bloodType: data.bloodDoner.bloodType,
//     location: data.bloodDoner.location || "",
//     canDonateBlood: data.bloodDoner.canDonateBlood || false,
//   };

//   const result = await prisma.user.create({
//     data: userData,
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       bloodType: true,
//       location: true,
//       password: false,
//       createdAt: true,
//       updatedAt: true,
//     },
//   });

//   return result;
// };
const updateUserProfile = async (userId: string, profileData: any) => {
  const updatedProfile = await prisma.userProfile.update({
    where: { id: userId },
    data: profileData,
  });

  return updatedProfile;
};
const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  if (!userData) {
    throw new Error("User not found");
  }
  const validPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!validPassword) {
    throw new Error("Invalid password");
  }
  const jwtToken = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
  };
  const accessToken = jwt.sign(jwtToken, config.jwt.jwt_secret as Secret, {
    expiresIn: config.jwt.expires_in,
  });
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    accessToken: accessToken,
  };
};

const changePassword = async (
  id: string,
  payload: { current_password: string; new_password: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const validPassword = await bcrypt.compare(
    payload.current_password,
    userData.password
  );
  if (!validPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid password");
  }
  const hashPassword: string = await bcrypt.hash(payload.new_password, 12);
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hashPassword,
    },
  });
  return result;
};
const changeRoleStatus = async (id: string, payload: any) => {
  console.log(payload);
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
    },
  });
  const admin = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  if (admin.role == "ADMIN") {
    const result = await prisma.user.update({
      where: {
        id: payload.id,
      },
      data: {
        role: payload.role,
        status: payload.status,
      },
    });
    return result;
  } else {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not admin");
  }
};
export const userService = {
  createUser,
  loginUser,
  changePassword,
  changeRoleStatus,
};
