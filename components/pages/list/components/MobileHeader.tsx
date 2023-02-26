import { useAtom } from "jotai/react";
import { RESET } from "jotai/vanilla/utils";

import { SearchInput } from "@components/elements/filter/SearchInput";
import { BackIcon, CloseIcon, SearchIcon } from "@lib/icons";
import { http } from "@lib/services/http";
import { UseAtomWithResetResult } from "@types";

import { useSearchHistoryQuery } from "../queries/searchHistory";
import {
  AtomWithHashFilterSearchValue,
  AtomWithHashMobileSearchOpenValue,
  mobileSearchOpenAtom,
} from "../states/search";

interface MobileHeaderProps {
  text: string;
  search: UseAtomWithResetResult<AtomWithHashFilterSearchValue>[0];
  setSearch: UseAtomWithResetResult<AtomWithHashFilterSearchValue>[1];
}

export const MobileHeader = ({
  text,
  search,
  setSearch,
}: MobileHeaderProps) => {
  const [searchOpen, setSearchOpen] = useAtom(mobileSearchOpenAtom);

  return (
    <>
      {searchOpen !== RESET && (
        <MobileFullpageSearch
          search={search}
          setSearch={setSearch}
          setSearchOpen={setSearchOpen}
        />
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
                  readOnly
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
              {text}
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

interface MobileFullpageSearchProps {
  search: UseAtomWithResetResult<AtomWithHashFilterSearchValue>[0];
  setSearchOpen: UseAtomWithResetResult<AtomWithHashMobileSearchOpenValue>[1];
  setSearch: UseAtomWithResetResult<AtomWithHashFilterSearchValue>[1];
}

const MobileFullpageSearch = ({
  search,
  setSearchOpen,
  setSearch,
}: MobileFullpageSearchProps) => {
  const { data, refetch } = useSearchHistoryQuery();

  return (
    <div className="fixed inset-0 z-30 flex min-h-0 min-w-0 flex-col bg-white md:hidden">
      <div className="sticky top-0">
        <div className="container relative flex h-12 items-center justify-between space-x-4 bg-white">
          <button
            className="-m-3 inline p-3"
            onClick={() => setSearchOpen(RESET)}
          >
            <BackIcon />
          </button>
          <span className="inline-block h-full flex-1 py-1">
            <SearchInput
              autoFocus
              onSearch={() => setSearchOpen(RESET)}
              value={search}
              setValue={setSearch}
            />
          </span>
        </div>
      </div>
      {data && (
        <div className="container overflow-y-auto pb-3 scrollbar-hide">
          <div className="flex justify-between py-3 text-sm text-gray-800">
            <span>최근 검색어</span>
            <button
              onClick={async () => {
                await http.post.default("/users/deletehistories");
                refetch();
              }}
            >
              전체 삭제
            </button>
          </div>
          <div className="ml-3">
            {data.map((history) => (
              <p
                key={history[0]}
                className="flex items-center justify-between py-2"
              >
                <button
                  className="flex-1 text-left"
                  onClick={() => {
                    setSearchOpen(RESET);
                    setSearch(history[1]);
                  }}
                >
                  {history[1]}
                </button>
                <button
                  onClick={async () => {
                    await http.post.json("/users/history", {
                      id: history[0],
                    });
                    refetch();
                  }}
                >
                  <CloseIcon />
                </button>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
