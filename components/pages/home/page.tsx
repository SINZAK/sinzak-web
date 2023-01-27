import { createLayout } from "@components/layout/layout";

import { BannerView } from "./components/BannerView";
import { FeaturedView } from "./components/FeaturedView";
import { GenreView } from "./components/GenreView";


export default function Page() {
  return (
    <>
      <div className="container mb-8 flex h-16 items-center justify-between md:hidden">
        <img alt="logo" src="/assets/logo-type.svg" className="h-7" />
        <img alt="noti" src="/assets/icons/noti.svg" className="h-8" />
      </div>
      <BannerView />
      <div className="container flex flex-col">
        <div className="h-12 md:h-16" />
        <FeaturedView />
        <div className="h-12 md:h-24" />
        <GenreView />
      </div>
    </>
  );
}

Page.getLayout = createLayout({
  mobileNav: true,
});
