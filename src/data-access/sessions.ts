import prisma from "@/lib/db";

export const deleteSessionUseCase = async (userId: string, trx = prisma) => {
  await trx.session.deleteMany({
    where: { userId },
  });
};
