import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      fallbackRedirectUrl={"/api/auth/create-account"}
      forceRedirectUrl={"/api/auth/create-account"}
    />
  );
}
