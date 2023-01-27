import { useRouter } from "next/router";

import { BackIcon } from "@lib/icons";

import { MobileMenuButton } from "./Menu/MobileMenuButton";


export const MobileHeader = () => {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-30 md:hidden">
      <div className="container relative flex h-12 items-center justify-between bg-white">
        <button onClick={() => router.back()}>
          <BackIcon />
        </button>
        <MobileMenuButton />
      </div>
    </div>
  );
};
