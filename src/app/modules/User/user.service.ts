import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";
import prisma from "../../../shared/prisma";
const createUser = async (data: any) => {
  const hashPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    email: data.email,
    password: hashPassword,
    name: data.name,
    bloodType: data.bloodType,
    location: data.location,
  };
  const userProfileData = {
    bio: data.bio,

    age: data.age,
    lastDonationDate: data.lastDonationDate,
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
        availability: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });
    const createdUserProfileData = await transactionClient.userProfile.create({
      data: { ...userProfileData, userId: createUser.id },
    });
    return { ...createUser, userProfile: createdUserProfileData };
  });

  return result;
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
export const userService = {
  createUser,
  loginUser,
};
