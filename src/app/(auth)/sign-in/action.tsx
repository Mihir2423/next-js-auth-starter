"use server";

import { signIn } from "@/auth";

export async function sendMagicLink(email: string) {
  try {
    await signIn("resend", { email });
  } catch (error) {
    console.log("Something went wrong", error);
  }
}
