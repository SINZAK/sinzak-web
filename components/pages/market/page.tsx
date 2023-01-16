import { createLayout } from "@components/layout/layout";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import React from "react";
import Link from "next/link";
import { FilterProvider } from "./states/filter";
import { Filter } from "./components/Filter";
import { ProductsView } from "./components/ProductsView";
import { CategoryFilter } from "./components/CategoryFilter";
import { SearchInput } from "./components/SearchInput";

export default function Page() {
  return (
    <FilterProvider>
      <div className="fixed z-50 flex justify-center w-full p-3 bottom-12 md:hidden">
        <Link
          href="/build"
          className="bottom-0 right-0 block px-8 py-3 mb-4 font-bold text-center text-white rounded-full bg-red"
        >
          작품 등록하기
        </Link>
      </div>
      <div className="container flex flex-col">
        <div className="pt-3 pb-5 space-y-4 md:hidden">
          <Flicking
            bound
            moveType="freeScroll"
            align="prev"
            className="bleed"
            cameraClass="[&>*]:mr-3"
            useFindDOMNode={true}
            renderOnSameKey
          >
            {CategoryFilter()}
          </Flicking>
          <span className="flex justify-between text-sm">
            <Filter />
          </span>
        </div>
        <div className="items-center hidden h-16 md:flex space-x-7 pb-7">
          <span className="flex-[0_0_16rem] text-3xl font-bold">마켓</span>
          <span className="flex items-center justify-end flex-1 space-x-4">
            <Filter />
          </span>
        </div>
        <div className="flex items-start">
          <div className="md:block flex-[0_0_16rem] hidden mr-7 pr-3.5">
            <Link
              href="/build"
              className="block w-full px-4 py-3 mb-4 font-bold text-center text-white rounded-full bg-red"
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
  rawHeader: (
    <>
      <div className="container relative flex items-center justify-between h-12 bg-white">
        <span className="absolute top-0 left-0 flex items-center justify-center w-full h-full font-bold">
          마켓
        </span>
        <span></span>
        <span>
          <img src="/assets/icons/search.svg" className="h-6" />
        </span>
      </div>
    </>
  ),
});
