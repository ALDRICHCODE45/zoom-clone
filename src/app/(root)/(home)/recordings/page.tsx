import { CallList } from "@/components/CallList";
import { type ReactElement } from "react";

export interface pageProps {}

export default function RecordingPage({}: pageProps): ReactElement {
  return (
    <>
      <section className="flex size-full flex-col gap-10 text-white">
        <h1 className="text-3xl font-bold ">Recordings</h1>
        <CallList type="recordings" />
      </section>
    </>
  );
}
