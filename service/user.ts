"use server";

import { prisma } from "@/lib/db";
import { User } from "@clerk/nextjs/server";

export async function upsertUser({ user }: { user: User }) {
  return await prisma.user.upsert({
    where: { authId: user.id },
    update: {},
    create: {
      authId: user.id,
      email: user.primaryEmailAddress?.emailAddress || "",
      name: user.fullName,
    },
  });
}

export async function getDBUser({ authId }: { authId: string }) {
  return await prisma.user.findUnique({
    where: { authId },
  });
}
