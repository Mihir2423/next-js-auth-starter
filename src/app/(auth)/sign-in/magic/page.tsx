import { MailIcon } from "lucide-react";

export default function MagicLinkPage() {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 mx-auto py-24 max-w-[400px] h-screen">
      <div
        className="border-[3px] bg-white p-2 border-black rounded-full w-fit translate-y-[35px]"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.08) 0px 5px 15px 0px",
        }}
      >
        <MailIcon className="mx-auto w-12 h-12 text-black" />
      </div>
      <div
        className="flex flex-col items-center gap-2 p-4 pt-7 rounded-xl"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.08) 0px 5px 15px 0px, rgba(25, 28, 33, 0.2) 0px 15px 35px -5px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px",
        }}
      >
        <h1 className="font-semibold text-3xl text-center leading-[28px]">
          Check your email
        </h1>
        <p className="mt-2 text-base text-center">
          {"You're almost there! We've sent you a magic link to sign in."}
        </p>
        <div className="bg-black hover:bg-[#222222] px-10 py-2 rounded-md transition-all duration-150 select-none ease-in-out hover:scale-[1.05]">
          <p className="font-base text-white transition-all duration-150 ease-in-out">
            Thank you!
          </p>
        </div>
        <i className="mt-2 text-center text-sm">
          {"Just click the link in the email to sign in."}If you {"don't"} see
          the email, <span className="font-semibold">check your spam</span>{" "}
          folder.
        </i>
      </div>
    </div>
  );
}
