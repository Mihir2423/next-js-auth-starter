import { auth } from "@/auth";
import prisma from "@/lib/db";
import { loginWithMagicLinkUseCase } from "@/use-cases/magic-link";
import { PrismaAdapter } from "@auth/prisma-adapter";
import crypto from "crypto"

export async function GET(req: Request): Promise<Response> {
    try {
        const url = new URL(req.url);
        const token = url.searchParams.get("token");
        if (!token) {
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/sign-in/magic/error",
                },
            });
        }
        const user = await loginWithMagicLinkUseCase(token);
        if (!user) {
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/sign-in/magic/error",
                },
            });
        }
        // create a session
        const adapter = PrismaAdapter(prisma);
        if (!adapter || typeof adapter.createSession !== "function") {
            throw new Error("Adapter or createSession method not available");
        }
        const sessionToken = crypto.randomUUID();
        const sessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

        await adapter.createSession({
            sessionToken: sessionToken,
            userId: user.id,
            expires: sessionExpiry
        });

        // Set the session cookie
        const cookieValue = `${sessionToken}|${user.id}`;
        const cookie = `next-auth.session-token=${cookieValue}; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=${sessionExpiry.toUTCString()}`;

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/",
                'Set-Cookie': cookie,
            },
        })
    } catch (error) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/sign-in/magic/error",
            },
        });
    }
}