"use server";

import { prisma } from "@/lib/db";
import type { UploadedFileData } from "uploadthing/types";
import { getDBUser } from "./user";

export async function createFile({
  authId,
  file,
}: {
  authId: string;
  file: UploadedFileData;
}) {
  const dbUser = await getDBUser({ authId });

  if (!dbUser) {
    throw new Error("User not found");
  }

  const dbFile = await prisma.file.create({
    data: {
      userId: dbUser.id,
      key: file.key,
      url: file.url,
      type: file.type,
      name: file.name,
    },
  });

  console.log("file created", dbFile);

  return dbFile;
}

export async function getFiles({ authId }: { authId: string }) {
  const dbFiles = await prisma.file.findMany({
    where: { user: { authId } },
  });

  return dbFiles;
}
