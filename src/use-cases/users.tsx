import { applicationName } from "@/app-config";
import { upsertMagicLink } from "@/data-access/magic-links";
import { createUser, getUserByEmail } from "@/data-access/users";
import { MagicLinkEmail } from "@/emails/magic-link";
import { sendEmail } from "@/lib/send-email";
import crypto from "crypto";
import { hashPassword } from "./utils";

export async function registerUserUseCase(email: string, password: string) {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("Email is already in use");
  }
  const salt = crypto.randomBytes(128).toString("base64");
  const hash = await hashPassword(password, salt);
  const user = await createUser(email, hash);
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
  return { id: user.id };
}
