import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      fallbackRedirectUrl={"/api/auth/create-account"}
      forceRedirectUrl={"/api/auth/create-account"}
    />
  );
}
