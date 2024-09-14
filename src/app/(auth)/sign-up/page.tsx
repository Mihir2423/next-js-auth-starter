"use client";

import { AuthLayout } from "@/components/auth/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useServerAction } from "zsa-react";
import { signUpAction } from "./actions";
import { toast } from "sonner";
import { Loader2, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const registrationSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

type Props = {};

const SignUpPage = (props: Props) => {
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  const { execute, isPending, error } = useServerAction(signUpAction, {
    onError({ err }) {
      toast.error("Something went wrong");
    },
  });

  function onSubmit(values: z.infer<typeof registrationSchema>) {
    execute(values);
    console.log(values);
  }
  return (
    <AuthLayout type="Sign-Up" text="Create an account to get started">
      <div className="w-full">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Uh-oh, we couldn&apos;t log you in</AlertTitle>
                <AlertDescription>{error?.message}</AlertDescription>
              </Alert>
            )}
            <Button
              disabled={isPending}
              type="submit"
              className="w-full py-[4px] text-sm"
            >
              Register
              {isPending && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
            </Button>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
