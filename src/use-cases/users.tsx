import { applicationName } from "@/app-config";
import { upsertMagicLink } from "@/data-access/magic-links";
import {
  createUser,
  getUserByEmail,
  verifyPassword,
} from "@/data-access/users";
import { MagicLinkEmail } from "@/emails/magic-link";
import { sendEmail } from "@/lib/send-email";
import crypto from "crypto";
import { hashPassword } from "./utils";
import { LoginError } from "./errors";
import axios from "axios";
import { signIn } from "@/auth";

export async function registerUserUseCase(email: string, password: string) {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("Email is already in use");
  }
  const salt = crypto.randomBytes(128).toString("base64");
  const hash = await hashPassword(password, salt);
  const user = await createUser(email, hash, salt);
  if (!user) {
    throw new Error("Error creating user");
  }
  console.log("User created", user.id);
  const token = await upsertMagicLink(email);
  console.log("Verify email token created", token);

  await sendEmail(
    email,
    `Your magic link for ${applicationName}`,
    MagicLinkEmail({ token })
  );
  return { id: user.id, salt };
}

export const createSessionUseCase = async (userId: string, salt: string | null) => {
  await signIn("credentials", { id: userId, salt });
};

export async function signInUseCase(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new LoginError();
  }
  const isPasswordCorrect = await verifyPassword(email, password);
  if (!isPasswordCorrect) {
    throw new LoginError();
  }
  return user;
}
