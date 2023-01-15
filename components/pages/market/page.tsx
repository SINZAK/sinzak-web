import { createLayout } from "@components/layout/layout";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import React, { useState } from "react";
import Link from "next/link";
import {
  FilterProvider,
  filterSearchAtom,
  useFilterContext,
} from "./states/filter";
import { Filter } from "./components/Filter";
import { ProductsView } from "./components/ProductsView";
import { CategoryFilter } from "./components/CategoryFilter";
import { useAtom } from "jotai/react";
import { RESET } from "jotai/vanilla/utils";
import { CloseIcon } from "@lib/icons";

const SearchInput = () => {
  const store = useFilterContext();
  const [search, setSearch] = useState("");
  const [, setFilterSearch] = useAtom(filterSearchAtom, {
    store,
  });
  const reset = () => (setSearch(""), setFilterSearch(RESET));
  const isValid = search.length >= 2;

  return (
    <form
      className="relative"
      onSubmit={(e) => (
        e.preventDefault(), isValid ? setFilterSearch(search || RESET) : reset()
      )}
    >
      {isValid && (
        <button
          onClick={reset}
          type="button"
          className="absolute grid w-6 h-6 text-white -translate-y-1/2 rounded-full right-3 top-1/2 bg-red place-content-center"
        >
          <CloseIcon />
        </button>
      )}
      <input
        onKeyDown={(e) => {
          if (e.key === "Esc" || e.key === "Escape") reset();
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block w-full px-5 py-3 placeholder-gray-800 bg-gray-100 rounded-full"
        placeholder="작품 통합 검색"
      />
    </form>
  );
};

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
        <div className="pt-3 pb-4 space-y-4 md:hidden">
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
