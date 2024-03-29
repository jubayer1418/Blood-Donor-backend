import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../shared/prisma";
import { adminSearchAbleFields } from "./donor.constant";

const getAllFromDb = async (param: any, options: any) => {
  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = param;

  const andConditions: Prisma.UserWhereInput[] = [];
  if (searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.UserWhereInput = { AND: andConditions };
  const result = await prisma.user.findMany({
    where: whereConditions,

    skip,
    take: limit,
    include: {
      userProfile: true,
    },

    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
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

const postFromDb = async (payload: any) => {
  const result = await prisma.request.create({
    data: { ...payload, requesterId: "a99aeb98-a620-4f28-98dc-de1f42fb8a6f" },

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
