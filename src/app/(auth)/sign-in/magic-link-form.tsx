"use client";

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
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { signInLinkMagicAction } from "./actions";

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
  const { execute, isPending } = useServerAction(signInLinkMagicAction, {
    onError({ err }) {
      toast.message("Something went wrong");
    },
  });
  async function onSubmit(values: z.infer<typeof magicLinkSchema>) {
    if (!values.email || !values.email.trim()) {
      return;
    }
    execute(values);
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
    </div>
  );
};
