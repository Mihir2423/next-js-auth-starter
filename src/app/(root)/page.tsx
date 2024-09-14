import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex justify-center items-center w-full h-screen">
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </main>
  );
}
