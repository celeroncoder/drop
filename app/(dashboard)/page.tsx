import ImageGrid from "@/components/image-grid";
import { ThemeToggle } from "@/components/mode-toggle";
import { ImageDropzone } from "@/components/upload";
import { getFiles } from "@/service/file";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LoaderPinwheel } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();
  // if (!userId)
  //   return (
  //     <div className="min-h-screen w-full flex items-center justify-center">
  //       <LoaderPinwheel className="size-8 animate-spin" />
  //     </div>
  //   );
  const files = await getFiles({ authId: userId || "" });

  return (
    <main className="min-h-screen max-w-screen-md mx-auto">
      <header className="border-x-2 border-y-2 px-6">
        <div className="border-x-2 py-4">
          <div className="border-y-2 flex items-center justify-between px-4 py-2">
            <p className="font-mono font-semibold">drop</p>
            <UserButton />
          </div>
        </div>
      </header>

      <div className="border-x-2 my-0 py-4 px-6">
        <ImageDropzone />
      </div>

      <ImageGrid initialFiles={files} />

      {/* DOES NOTHING ONLY FOR THE UI */}
      <div className="w-full border-x-2 border-t-2 h-8" />

      <footer className="border-x-2 border-y-2 px-6">
        <div className="border-x-2 py-4">
          <div className="border-y-2 flex items-center justify-between px-4 py-2">
            <p className="font-mono font-semibold">drop</p>
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </main>
  );
}
