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
const updateFromDb = async (
  id = "1ad1d09e-9ca0-4ef1-a2c8-609b516cdd14",
  payload: any
) => {
  console.log(payload);
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
