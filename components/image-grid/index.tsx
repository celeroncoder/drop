import { getFiles } from "@/service/file";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { DownloadIcon, Trash2Icon } from "lucide-react";
import { ImageDialog } from "./image-dialog";
import { DownloadMenuItem } from "./download-menu-item";

export default async function ImageGrid() {
  const { userId } = await auth();
  if (!userId) return null;

  const files = await getFiles({ authId: userId });
  if (!files) return <div>no files upload some!</div>;

  return (
    <div className="flex items-center justify-center flex-col border-x-2">
      <div className="flex items-center justify-center border-y-2 py-4 px-6 w-full">
        <p className="text-md font-mono">Uploaded Images</p>
      </div>
      <div className="w-full px-6">
        <div className="border-x-2 py-6">
          <div className="border-y-2 flex flex-wrap items-center justify-center ">
            {files.map((file) => (
              <ContextMenu key={file.id}>
                <ContextMenuTrigger className="h-full">
                  <ImageDialog
                    file={file}
                    trigger={
                      <div className="duration-200 border p-4 min-h-full">
                        <Image
                          src={`https://utfs.io/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/${file.key}`}
                          alt={file.url}
                          width={150}
                          height={150}
                          typeof={file.type}
                          className="aspect-square"
                        />
                      </div>
                    }
                  />
                </ContextMenuTrigger>
                <ContextMenuContent className="rounded-none">
                  <ContextMenuItem className="cursor-pointer">
                    <Trash2Icon className="size-4 mr-2 text-red-500" /> Delete
                  </ContextMenuItem>
                  <DownloadMenuItem file={file} />
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
