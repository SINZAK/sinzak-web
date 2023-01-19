import { ProductElement } from "@components/elements/product/ProductElement";
import { createLayout } from "@components/layout/layout";

import "@egjs/react-flicking/dist/flicking.css";

export default function Page() {
  return (
    <>
      <div className="hidden h-12 md:block" />
      <div className="container flex flex-col">
        <div className="hidden items-center space-x-7 pb-7 md:flex">
          <span className="flex-[0_0_16rem] text-3xl font-bold">최신 작품</span>
        </div>
        <div className="h-7 md:hidden" />
        <div className="flex">
          <div className="flex flex-1 flex-wrap gap-x-3 gap-y-7 md:gap-x-7">
            {Array.from({ length: 20 }).map((_, i) => (
              <ProductElement
                className="flex-[1_1_40%] sm:flex-[1_1_200px]"
                key={i}
              />
            ))}
            {Array.from({ length: 2 }).map((_, i) => (
              <div className="flex-[1_1_40%] sm:flex-[1_1_200px]" key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
Page.getLayout = createLayout({
  mobileNav: true,
  rawHeader: (
    <>
      <div className="container relative flex h-12 items-center justify-between bg-white">
        <span className="absolute top-0 left-0 flex h-full w-full items-center justify-center font-bold">
          최신 작품
        </span>
        <span>
          <img src="/assets/icons/back.svg" className="h-6" />
        </span>
        <span></span>
      </div>
    </>
  ),
});
