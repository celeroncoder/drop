"use client";

import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, user } = useUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {isLoaded && user && (
        <p className="text-2xl mb-10">hey👋 {user.fullName}</p>
      )}
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
