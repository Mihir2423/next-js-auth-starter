import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function MagicLinkPage() {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 mx-auto py-24 max-w-[400px] h-screen">
      <div
        className="flex flex-col items-center gap-2 p-4 pt-7 rounded-xl"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.08) 0px 5px 15px 0px, rgba(25, 28, 33, 0.2) 0px 15px 35px -5px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px",
        }}
      >
        <h1 className="font-semibold text-3xl text-center leading-[28px]">
          Something went wrong
        </h1>
        <p className="mt-2 text-base text-center">
          {
            "Sorry, this token was either expired or already used. Please try logging in again"
          }
        </p>
        <Button asChild>
          <Link href="/sign-in" className="flex items-center gap-2 mt-4">
            Sign In <ExternalLink />
          </Link>
        </Button>
      </div>
    </div>
  );
}
