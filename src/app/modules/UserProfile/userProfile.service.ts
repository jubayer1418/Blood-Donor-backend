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
export const profileService = {
  getFromDb,
  updateFromDb,
};
