import Image from "next/image";

import NotFoundillustration from "../../public/not-found.png";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="absolute grid h-full w-full place-items-center">
      <div className="flex flex-col items-center gap-5">
        <Image src={NotFoundillustration} alt="" role="presentation" />

        <span className="text-lg">The requested resource is not found</span>

        <Link
          className="btn btn-primary mt-5 font-normal"
          href="/"
          prefetch={false}
        >
          Go back to the app
        </Link>
      </div>
    </div>
  );
}
