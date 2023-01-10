import { CheckBox } from "@components/atoms/CheckBox";
import { ProductElement } from "@components/elements/product/ProductElement";
import { createLayout } from "@components/layout/layout";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import React from "react";
import { Listbox } from "@headlessui/react";
import { AlignIcon } from "@lib/icons";

const options = [
  { id: "recommend", name: "신작추천순" },
  { id: "popular", name: "인기순" },
  { id: "recent", name: "최신순" },
  { id: "low", name: "낮은가격순" },
  { id: "high", name: "높은가격순" },
];

export default function Page() {
  return (
    <>
      <div className="md:block hidden h-12" />
      <div className="container flex flex-col">
        <div className="md:flex hidden space-x-7 items-center pb-7">
          <span className="flex-[0_0_16rem] text-3xl font-bold">최신 작품</span>
        </div>
        <div className="md:hidden h-7" />
        <div className="flex">
          <div className="flex-1 flex flex-wrap gap-x-3 md:gap-x-7 gap-y-7">
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
      <div className="h-12 flex container items-center justify-between bg-white relative">
        <span className="font-bold absolute w-full flex top-0 left-0 h-full items-center justify-center">
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
