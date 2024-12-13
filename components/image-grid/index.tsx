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
    <div className="flex items-center justify-center flex-col">
      <p className="text-xl mb-2">Uploaded Images...</p>
      <div className="grid grid-cols-3 gap-4 p-10 border-t">
        {files.map((file) => (
          <ContextMenu key={file.id}>
            <ContextMenuTrigger>
              <ImageDialog
                file={file}
                trigger={
                  <Card className="hover:scale-105 duration-200 hover:shadow-lg">
                    <CardContent className="p-2">
                      <Image
                        src={`https://utfs.io/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/${file.key}`}
                        alt={file.url}
                        width={150}
                        height={150}
                        typeof={file.type}
                        className="rounded-lg aspect-square border-dotted"
                      />
                    </CardContent>
                  </Card>
                }
              />
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem className="cursor-pointer">
                <Trash2Icon className="size-4 mr-2 text-red-500" /> Delete
              </ContextMenuItem>
              <DownloadMenuItem file={file} />
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
    </div>
  );
}
