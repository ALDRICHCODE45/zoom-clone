import { SignIn } from "@clerk/nextjs";
import { type ReactElement } from "react";

export interface SignInPageProps {}

export default function SignInPage(props: SignInPageProps): ReactElement {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignIn />
    </main>
  );
}
