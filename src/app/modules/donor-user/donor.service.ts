import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../shared/prisma";
import { donorSearchAbleFields } from "./donor.constant";

const getAllFromDb = async (param: any, options: any) => {
  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = param;

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
  console.log(id);
  const result = await prisma.request.create({
    data: { ...payload, requesterId: id },

    include: {
      donor: {
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

export const DonorService = {
  getAllFromDb,
  postFromDb,
  getFromDb,
  updateFromDb,
};
