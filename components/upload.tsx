"use client";

import { useToast } from "@/hooks/use-toast";
import { createFile } from "@/service/file";
import { UploadDropzone } from "@/utils/uploadthing";
import { useAuth } from "@clerk/nextjs";
import { useQueryClient } from "react-query";
import { ClientUploadedFileData } from "uploadthing/types";

export function ImageDropzone() {
  const { userId } = useAuth();
  if (!userId) return null;

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleUpload = async (
    res: ClientUploadedFileData<{ uploadedBy: string | null }>[]
  ) => {
    for (const file of res) {
      await createFile({
        authId: userId,
        file,
      });
    }

    void queryClient.invalidateQueries(["files", userId]);
    toast({
      title: "Successfully uploaded",
      description: "Your files have been uploaded",
    });
  };

  return (
    <UploadDropzone
      className="mb-4 rounded-none"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => handleUpload(res)}
      onUploadError={(error: Error) => {
        // Do something with the error.
        toast({
          title: "Uh Oh! Some error occured!",
          description: error.message,
        });
      }}
    />
  );
}
