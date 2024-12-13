"use client";

import { ContextMenuItem } from "@/components/ui/context-menu";
import { useToast } from "@/hooks/use-toast";
import { File } from "@prisma/client";
import { DownloadIcon, Loader2 } from "lucide-react";
import React from "react";

export function DownloadMenuItem({ file }: { file: File }) {
  const fileUrl = `https://utfs.io/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/${file.key}`;
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      toast({ title: `Downloading ${file.name}...` });
      const response = await fetch(fileUrl, { mode: "cors" }); // Ensure cross-origin is allowed
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();

      // Create a temporary link to trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = file.name; // The name of the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: `${file.name} downloaded successfully!`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error downloading the file:", error);
      toast({
        title: `Error downloading ${file.name}!`,
        variant: "destructive",
      });
    } finally {
    }
  };

  return (
    <ContextMenuItem className="cursor-pointer" onClick={handleDownload}>
      <DownloadIcon className="size-4 mr-2" />
      Download
    </ContextMenuItem>
  );
}
