import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import Link from "next/link";
import React from "react";

import { createLayout } from "@components/layout/layout";

import { CategoryFilter } from "./components/CategoryFilter";
import { Filter } from "./components/Filter";
import { MobileHeader } from "./components/MobileHeader";
import { ProductsView } from "./components/ProductsView";
import { SearchInput } from "./components/SearchInput";
import { FilterProvider } from "./states/filter";

export default function Page() {
  return (
    <FilterProvider>
      <MobileHeader />
      <div className="fixed bottom-12 z-10 flex w-full justify-center p-3 md:hidden">
        <Link
          href="/build"
          className="bottom-0 right-0 mb-4 block rounded-full bg-red px-8 py-3 text-center font-bold text-white"
        >
          작품 등록하기
        </Link>
      </div>
      <div className="container flex flex-col">
        <div className="space-y-4 pt-3 pb-5 md:hidden">
          <Flicking
            bound
            moveType="freeScroll"
            align="prev"
            className="bleed"
            cameraClass="[&>*]:mr-3"
            renderOnSameKey
          >
            {CategoryFilter()}
          </Flicking>
          <span className="flex justify-between text-sm">
            <Filter />
          </span>
        </div>
        <div className="hidden h-16 items-center space-x-7 pb-7 md:flex">
          <span className="flex-[0_0_16rem] text-3xl font-bold">마켓</span>
          <span className="flex flex-1 items-center justify-end space-x-4">
            <Filter />
          </span>
        </div>
        <div className="flex items-start">
          <div className="mr-7 hidden flex-[0_0_16rem] pr-3.5 md:block">
            <Link
              href="/build"
              className="mb-4 block w-full rounded-full bg-red px-4 py-3 text-center font-bold text-white"
            >
              작품 등록하기
            </Link>
            <SearchInput />
            <div className="h-8" />
            <div className="flex flex-col items-start space-y-3">
              {CategoryFilter()}
            </div>
          </div>
          <ProductsView />
        </div>
      </div>
    </FilterProvider>
  );
}

Page.getLayout = createLayout({
  mobileNav: true,
});
