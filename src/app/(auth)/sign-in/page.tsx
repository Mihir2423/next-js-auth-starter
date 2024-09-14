import { Fingerprint, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MagicLinkForm } from "./magic-link-form";
import { signIn } from "@/auth";
import { AuthLayout } from "@/components/auth/layout";
type Props = {};

const SignInPage = (props: Props) => {
  return (
    <AuthLayout type="Sign-In" text="Welcome back! Please sign in to continue">
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button
          className="flex justify-center items-center gap-2 border-gray-200 hover:scale-[1.02] hover:bg-[#fefbfb] shadow-gray-200 shadow-sm px-8 py-[6px] border rounded-md w-fit transition-all duration-150 ease-in-out"
          type="submit"
        >
          <Image
            sizes="(max-width: 80px) 80px, 160px"
            src={"/icons/google.svg"}
            alt="Sign in with Google"
            width={16}
            height={16}
          />
          <span className="text-sm">Sign in with Google</span>
        </button>
      </form>
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 border-gray-100 border w-full h-[2px]" />
        <span>or</span>
        <div className="flex-1 border-gray-100 border w-full h-[2px]" />
      </div>
      <MagicLinkForm />
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="border-t w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-100 dark:bg-gray-950 px-2 py-[6px] rounded-sm text-gray-500 dark:text-gray-400 select-none">
            Other options
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          href="/sign-in/email"
          className="flex justify-center hover:scale-[1.02] items-center gap-2 border-gray-200 hover:bg-[#fefbfb] shadow-gray-200 shadow-sm px-8 py-[6px] border rounded-md w-fit"
        >
          <Mail size={16} />
          <span className="text-sm">Sign in with Email</span>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
