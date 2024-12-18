import ImageGrid from "@/components/image-grid";
import { ImageDropzone } from "@/components/upload";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen max-w-screen-md mx-auto font-mono">
      <header className="border-x-2 border-y-2 px-6">
        <div className="border-x-2 py-4">
          <div className="border-y-2 flex items-center justify-between px-4 py-2">
            <p className="font-mono">drop</p>
            <UserButton showName />
          </div>
        </div>
      </header>

      <div className="border-x-2 my-0 py-4 px-6">
        <ImageDropzone />
      </div>
      <ImageGrid />
    </main>
  );
}
