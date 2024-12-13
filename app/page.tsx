import ImageGrid from "@/components/image-grid";
import { ImageDropzone } from "@/components/upload";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="border rounded-full mb-4">
        <UserButton showName />
      </div>

      <ImageDropzone />

      <ImageGrid />
    </main>
  );
}
