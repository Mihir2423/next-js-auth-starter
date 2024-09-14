import { TOKEN_LENGTH, TOKEN_TTL } from "@/app-config";
import { generateRandomToken } from "./utils";
import prisma from "@/lib/db";

export async function createPasswordResetToken(userId: string) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

  await prisma.resetToken.create({
    data: {
      userId,
      token,
      tokenExpiresAt,
    },
  });

  return token;
}
