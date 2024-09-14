"use server";

import { signIn } from "@/auth";
import { unauthenticatedAction } from "@/lib/safe-action";
import { registerUserUseCase } from "@/use-cases/users";
import { redirect } from "next/navigation";
import { z } from "zod";

export const signUpAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    })
  )
  .handler(async ({ input }) => {
    const user = await registerUserUseCase(input.email, input.password);
    await signIn("credentials", {
      redirect: false,
      id: user.id,
    });
    return redirect("/sign-in/magic");
  });
