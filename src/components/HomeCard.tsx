"use client";

import Image from "next/image";
import { type ReactElement } from "react";

export interface HomeCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  bg: string;
  handleClick: Function;
}

export function HomeCard({
  bg,
  imageUrl,
  subtitle,
  title,
  handleClick,
}: HomeCardProps): ReactElement {
  return (
    <div
      onClick={() => handleClick()}
      className={` ${bg} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={imageUrl} alt="meeting" width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{subtitle}</p>
      </div>
    </div>
  );
}
