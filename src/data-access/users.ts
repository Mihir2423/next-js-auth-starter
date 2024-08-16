import prisma from "@/lib/db";

export async function createUser(email: string) {
    const user = await prisma.user.create({
        data: { email }
    })
    return user;
}

export async function createMagicUser(email: string) {
    const user = await prisma.user.create({
        data: { email, emailVerified: new Date() }
    })
    await prisma.account.create({
        data: { userId: user.id, provider: "email", providerAccountId: email, type: "email" }
    })
    return user;
}

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    })
    return user;
}

export async function setEmailVerified(userId: string) {
    const user = await prisma.user.update({
        where: { id: userId },
        data: { emailVerified: new Date() }
    })
    return user;
}