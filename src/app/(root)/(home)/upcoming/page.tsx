import { CallList } from "@/components/CallList";
import { type ReactElement } from "react";

export interface pageProps {}

export default function UpcomingPage({}: pageProps): ReactElement {
  return (
    <>
      <section className="flex size-full flex-col gap-10 text-white">
        <h1 className="text-3xl font-bold ">UpcomingPage</h1>
        <CallList type="upcoming" />
      </section>
    </>
  );
}
