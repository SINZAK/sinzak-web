import { useAtom } from "jotai/react";
import { RESET } from "jotai/vanilla/utils";
import { useState } from "react";

import { BackIcon, CloseIcon, SearchIcon } from "@lib/icons";

import { filterSearchAtom, useFilterContext } from "../states/filter";
import { SearchInput } from "./SearchInput";

export const MobileHeader = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const store = useFilterContext();
  const [search, setSearch] = useAtom(filterSearchAtom, {
    store,
  });

  return (
    <>
      {searchOpen && (
        <div className="fixed inset-0 z-30 bg-white md:hidden">
          <div className="sticky top-0">
            <div className="container relative flex h-12 items-center justify-between space-x-4 bg-white">
              <button
                className="-m-3 inline p-3"
                onClick={() => setSearchOpen(false)}
              >
                <BackIcon />
              </button>
              <span className="inline-block h-full flex-1 py-1">
                <SearchInput autoFocus onSearch={() => setSearchOpen(false)} />
                {/* <span className="inline-block h-full w-full rounded-full bg-gray-100"></span> */}
              </span>
            </div>
          </div>
        </div>
      )}
      {search ? (
        <div className="sticky top-0 z-20 md:hidden">
          <div className="container relative flex h-12 items-center justify-between space-x-4 bg-white">
            <button
              className="-m-3 inline p-3"
              onClick={() => setSearch(RESET)}
            >
              <BackIcon />
            </button>
            <button className="inline-block h-full flex-1 py-1">
              <div className="relative max-md:h-full">
                <input
                  onClick={() => setSearchOpen(true)}
                  value={search}
                  className="block w-full rounded-full bg-gray-100 placeholder-gray-800 max-md:h-full max-md:px-4 md:px-5 md:py-3"
                />
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="sticky top-0 z-20 md:hidden">
          <div className="container relative flex h-12 items-center justify-between bg-white">
            <span className="absolute inset-y-0 left-1/2 grid -translate-x-1/2 place-items-center font-bold">
              마켓
            </span>
            <span></span>
            <button
              className="-m-3 inline p-3"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
