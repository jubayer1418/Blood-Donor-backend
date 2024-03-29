import prisma from "../../../shared/prisma";

const getFromDb = async () => {
  const result = await prisma.user.findMany({
    include: {
      userProfile: true,
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
export const profileService = {
  getFromDb,
  updateFromDb,
};
