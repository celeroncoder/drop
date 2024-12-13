"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { File } from "@prisma/client";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { DownloadIcon, Loader2, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

export function ImageDialog({
  trigger,
  file,
}: {
  trigger: React.ReactNode;
  file: File;
}) {
  const fileUrl = `https://utfs.io/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/${file.key}`;
  const { toast } = useToast();

  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

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
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{file.name}</DialogTitle>
        </DialogHeader>

        <div className="border border-dashed rounded-lg border-black p-2">
          {!isImageLoaded && (
            <div className="width-full h-auto aspect-square flex items-center justify-center rounded-lg bg-gray-100 animate-pulse">
              <Loader2 className="size-8 animate-spin" />
            </div>
          )}
          <img
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(false)}
            src={fileUrl}
            alt={file.url}
            width={500}
            height={500}
            typeof={file.type}
            className={cn(
              "rounded-lg aspect-square border-dotted",
              !isImageLoaded && "hidden"
            )}
          />
        </div>

        <DialogFooter className="justify-end">
          <Button variant={"secondary"} className="flex items-center gap-2">
            <Trash2Icon className="size-4 text-red-400" />
            <span className="mb-px">Delete</span>
          </Button>
          <Button
            disabled={isDownloading}
            variant={"default"}
            className="flex items-center gap-2"
            onClick={handleDownload}
          >
            {isDownloading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <DownloadIcon className="size-4" />
            )}
            <span className="mb-px">Download</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
