"use server";

import { unauthenticatedAction } from "@/lib/safe-action";
import { changePasswordUseCase } from "@/use-cases/users";
import { z } from "zod";

export const changePasswordAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      token: z.string(),
      password: z.string().min(8),
    })
  )
  .handler(async ({ input: { token, password } }) => {
    await changePasswordUseCase(token, password);
  });
