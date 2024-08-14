import { Fingerprint, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MagicLinkForm } from "./magic-link-form";
import { signIn } from "@/auth";
type Props = {};

const SignInPage = (props: Props) => {
  return (
    <main className="flex justify-center items-center w-full h-screen">
      <div
        className="border-gray-200 border rounded-xl overflow-hidden"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.08) 0px 5px 15px 0px, rgba(25, 28, 33, 0.2) 0px 15px 35px -5px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px",
        }}
      >
        <div
          className="md:w-[450px]"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.03)), linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255))",
          }}
        >
          <div className="flex flex-col items-center gap-4 border-gray-200 bg-white p-6 border-b rounded-b-xl">
            <Fingerprint />
            <div className="flex flex-col items-center">
              <h1 className="font-bold text-[#212126] text-lg">
                Sign-In to Next App
              </h1>
              <p className="text-[#747686] text-sm">
                Welcome back! Please sign in to continue
              </p>
            </div>
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
          </div>
          <div className="p-4">
            <p className="text-[#747686] text-center text-sm">
              {"Don’t have an account?"}
              <span className="ml-1 font-medium text-[#212126]">Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
