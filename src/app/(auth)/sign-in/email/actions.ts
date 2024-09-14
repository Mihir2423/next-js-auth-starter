"use server";

import { unauthenticatedAction } from "@/lib/safe-action";
import { createSessionUseCase, signInUseCase } from "@/use-cases/users";
import { redirect } from "next/navigation";
import { z } from "zod";

export const signInAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    })
  )
  .handler(async ({ input }) => {
    const user = await signInUseCase(input.email, input.password);
    await createSessionUseCase(user.id, user.salt);
    redirect("/");
  });
