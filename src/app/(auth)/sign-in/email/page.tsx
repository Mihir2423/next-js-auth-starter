"use client";

import { AuthLayout } from "@/components/auth/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { signUpAction } from "../../sign-up/actions";
import { toast } from "sonner";
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
import { ArrowDownLeftFromSquare, Loader2, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type Props = {};

const EmailPage = (props: Props) => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { execute, isPending, error } = useServerAction(signUpAction, {
    onError({ err }) {
      toast.error("Something went wrong");
    },
  });
  function onSubmit(values: z.infer<typeof signInSchema>) {
    // execute(values);
    console.log(values);
  }
  return (
    <AuthLayout type="Sign-In" text="Welcome back! Please sign in to continue">
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
            Login
            {isPending && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
          </Button>
        </form>
      </Form>
      <div>
        <div className="flex justify-center">
          <Button asChild variant="link">
            <Link href="/sign-in/forgot-password">Forgot Password?</Link>
          </Button>
        </div>

        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 border-gray-100 border w-full h-[2px]" />
          <span>or</span>
          <div className="flex-1 border-gray-100 border w-full h-[2px]" />
        </div>
      </div>
    </AuthLayout>
  );
};

export default EmailPage;
