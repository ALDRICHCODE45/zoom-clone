import { SignUp } from "@clerk/nextjs";
import { type ReactElement } from "react";

export interface SignInPageProps {}

export default function SignInPage({}: SignInPageProps): ReactElement {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignUp />
    </main>
  );
}
