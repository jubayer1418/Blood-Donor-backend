import prisma from "../../../shared/prisma";

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
const updateFromDb = async (id: string, payload: any) => {
  await prisma.userProfile.findUniqueOrThrow({ where: { id } });
  const result = await prisma.userProfile.update({
    where: { id },

    data: payload,
  });
  return result;
};
export const profileService = {
  getFromDb,
  updateFromDb,
};
