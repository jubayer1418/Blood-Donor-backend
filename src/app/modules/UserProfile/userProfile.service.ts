import prisma from "../../../shared/prisma";

const getFromDb = async () => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: "8b9c2c10-bf61-411d-8865-78106179e2bf",
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
