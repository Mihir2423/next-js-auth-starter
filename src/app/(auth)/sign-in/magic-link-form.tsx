"use client";

import { signIn } from "@/auth";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendMagicLink } from "./action";

const magicLinkSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email address",
  }),
});

type Props = {};

export const MagicLinkForm = (props: Props) => {
  const form = useForm<z.infer<typeof magicLinkSchema>>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof magicLinkSchema>) {
    if (!values.email || !values.email.trim()) {
      return;
    }
    try {
      await sendMagicLink(values.email);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  return (
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
          <Button type="submit" className="w-full py-[4px] text-sm">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
