import { Request } from "express";
import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../shared/prisma";
import { donorSearchAbleFields } from "./donor.constant";

const getAllFromDb = async (param: any, options: any) => {
  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, availability, ...filterData } = param;
  console.log(searchTerm);
  const andConditions: Prisma.UserWhereInput[] = [];
  if (searchTerm) {
    andConditions.push({
      OR: donorSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (availability !== undefined) {
    andConditions.push({
      availability:
        undefined ||
        (availability == "Available" && true) ||
        (availability == "Unavailable" && false) ||
        (availability == "" && undefined),
    });
  }
  if (filterData.bloodType == "") delete filterData.bloodType;
  if (filterData.location == "") delete filterData.location;
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((field) => ({
        [field]: {
          equals: filterData[field],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.user.findMany({
    where: whereConditions,

    skip,
    take: limit,

    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
    include: {
      userProfile: true,
    },
  });
  const total = await prisma.user.count({ where: whereConditions });
  return {
    meta: {
      page,
      limit,
      skip,
      total,
    },

    data: result,
  };
};

const postFromDb = async (id: string, payload: any) => {
  const result = await prisma.request.create({
    data: { ...payload, requesterId: id },

    include: {
      donor: {
        include: {
          userProfile: true,
        },
      },
      requester: {
        include: {
          userProfile: true,
        },
      },
    },
  });
  return result;
};
const getFromDb = async () => {
  const result = await prisma.request.findMany({
    include: {
      requester: true,
      donor: true,
    },
  });

  return result;
};
const updateFromDb = async (id: string, payload: any) => {
  console.log(id, payload);
  await prisma.request.findUniqueOrThrow({ where: { id } });
  const result = await prisma.request.update({
    where: { id },
    data: { requestStatus: payload.status },
  });
  return result;
};
const getSingleFromDb = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: { id },
    include: {
      userProfile: true,
    },
  });
  console.log(result);

  return result;
};
const getFromMeDb = async (id: string) => {
  console.log("me",id)
  const result = await prisma.request.findMany({
    where: { donorId: id },
    include: {
      requester: true,
      donor: true,
    },
  });
  console.log(result);

  return result;
};
const getFromMyRequestDb = async (id: string) => {
  console.log(id)
  const result = await prisma.request.findMany({
    where: { requesterId: id },
    include: {
      requester: true,
      donor: true,
    },
  });
  console.log(result);

  return result;
};

export const DonorService = {
  getAllFromDb,
  postFromDb,
  getFromDb,
  updateFromDb,
  getSingleFromDb,
  getFromMeDb,
  getFromMyRequestDb
};
