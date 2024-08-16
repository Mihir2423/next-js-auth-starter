import { TOKEN_LENGTH, TOKEN_TTL } from "@/app-config";
import { generateRandomToken } from "./utils";
import prisma from "@/lib/db";

export async function upsertMagicLink(email: string) {
    const token = await generateRandomToken(TOKEN_LENGTH);
    const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

    // Save the token and its expiration date to the database
    await prisma.magicLink.upsert({
        where: { email },
        update: { token, tokenExpiresAt },
        create: { email, token, tokenExpiresAt }
    });
    return token;
}

export async function getMagicLinkByToken(token: string) {
    // Get the magic link from the database
    // (couldn't use prisma.magicLink.findUnique() because it token isn't unique)
    const existingToken = await prisma.magicLink.findFirst({
        where: { token }
    })
    return existingToken;
}

export async function deleteMagicLinkByToken(token: string) {
    // Delete the magic link from the database 
    // (couldn't use prisma.magicLink.delete() because it token isn't unique)
    await prisma.magicLink.deleteMany({
        where: { token }
    })
}