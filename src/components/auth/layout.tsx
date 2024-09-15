import { Fingerprint } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  type: "Sign-In" | "Sign-Up" | "Forgot Password" | "Reset Password";
  text: string;
};

export const AuthLayout = ({ children, type, text }: Props) => {
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
                {type}{" "}
                {type !== "Forgot Password" &&
                  type !== "Reset Password" &&
                  "to Next App"}
              </h1>
              <p className="text-[#747686] text-sm">{text}</p>
            </div>
            {children}
          </div>
          <div className="flex justify-center items-center p-4">
            <Link href={type === "Sign-In" ? "/sign-up" : "/sign-in"}>
              <p className="hover:border-gray-400 hover:border-b w-fit text-[#747686] text-center text-sm transition-all duration-200 ease-in-out">
                {type === "Sign-In"
                  ? "Don’t have an account?"
                  : "Already have an account?"}
                <span className="ml-1 font-medium text-[#212126]">
                  {type === "Sign-In" ? "Sign up" : "Sign in"}
                </span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
