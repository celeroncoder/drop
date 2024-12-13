import { upsertUser } from "@/service/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const GET = async (req: Request) => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const dbUser = await upsertUser({ user });
  if (dbUser.id) return redirect("/");

  return redirect("/sign-in");
};
