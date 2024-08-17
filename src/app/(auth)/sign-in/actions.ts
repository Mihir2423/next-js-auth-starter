"use server"

import { unauthenticatedAction } from "@/lib/safe-action"
import { sendMagicLinkUseCase } from "@/use-cases/magic-link"
import { redirect } from "next/navigation"
import { z } from "zod"

export const signInLinkMagicAction = unauthenticatedAction.createServerAction()
    .input(
        z.object({
            email: z.string().email(),
        })
    ).handler(async ({ input }) => {
        try {
            await sendMagicLinkUseCase(input.email);
            redirect("/sign-in/magic");
        } catch (error) {
            console.error('Error sending magic link:', error);
            redirect("/sign-in/magic/error");
        }
    })