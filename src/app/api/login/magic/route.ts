import { auth, signIn } from "@/auth";
import prisma from "@/lib/db";
import { loginWithMagicLinkUseCase } from "@/use-cases/magic-link";
import { PrismaAdapter } from "@auth/prisma-adapter";
import crypto from "crypto";

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
    await signIn("credentials", { id: user.id });
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (error) {
    console.error("Error signing in with magic link", error);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/sign-in/magic/error",
      },
    });
  }
}
