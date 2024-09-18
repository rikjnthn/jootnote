"use client";
import Image from "next/image";

import ErrorIllustration from "../../public/error.png";

export default function Error() {
  return (
    <div className="absolute grid h-full w-full place-items-center">
      <div className="flex flex-col items-center gap-5">
        <Image src={ErrorIllustration} alt="" />

        <span className="text-lg">An error has occured</span>
      </div>
    </div>
  );
}
