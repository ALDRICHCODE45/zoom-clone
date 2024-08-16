import Image from "next/image";
import { type ReactElement } from "react";

export interface LoaderProps {}

export function Loader(props: LoaderProps): ReactElement {
  return (
    <div className="flex-center  h-screen w-full ">
      <Image
        src="/icons/loading-circle.svg"
        alt="loading"
        width={50}
        height={50}
      />
    </div>
  );
}
