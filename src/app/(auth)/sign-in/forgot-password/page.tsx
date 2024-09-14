"use client"

import { AuthLayout } from "@/components/auth/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { signInAction } from "../email/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const fortgotPasswordSchema = z.object({
  email: z.string().email(),
});

type Props = {};

const ForgotPasswordPage = (props: Props) => {
  const { execute, isPending, isSuccess } = useServerAction(signInAction, {
    onError({ err }) {
      toast.error("An error occurred. Please try again.");
    },
  });

  const form = useForm<z.infer<typeof fortgotPasswordSchema>>({
    resolver: zodResolver(fortgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof fortgotPasswordSchema>) {
    // execute(values);
    console.log(values);
  }
  return (
    <AuthLayout
      type="Forgot Password"
      text="Forgot your password? Enter your email below to reset it."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="">Email address</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full py-[4px] text-sm"
          >
            Continue
            {isPending && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
