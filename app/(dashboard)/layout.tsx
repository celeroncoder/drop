import { getDBUser } from "@/service/user";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  // check if db-user present or not?
  const dbUser = await getDBUser({ authId: userId });
  if (!dbUser) return redirect("/api/auth/create-account");

  return <>{children}</>;
}
