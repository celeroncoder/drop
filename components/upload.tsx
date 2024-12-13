"use client";

import { createFile } from "@/service/file";
import { UploadDropzone } from "@/utils/uploadthing";
import { useAuth } from "@clerk/nextjs";
import { ClientUploadedFileData } from "uploadthing/types";

export function ImageDropzone() {
  const { userId } = useAuth();
  if (!userId) return null;

  const handleUpload = async (
    res: ClientUploadedFileData<{ uploadedBy: string | null }>[]
  ) => {
    for (const file of res) {
      await createFile({
        authId: userId,
        file,
      });
    }
  };

  return (
    <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={(res) => handleUpload(res)}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
