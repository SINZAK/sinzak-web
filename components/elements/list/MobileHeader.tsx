import { useQuery } from "@tanstack/react-query";
import { SetStateActionWithReset } from "@types";
import { useAtom } from "jotai/react";
import { RESET } from "jotai/vanilla/utils";
import { SetStateAction } from "react";

import { BackIcon, CloseIcon, SearchIcon } from "@lib/icons";
import { useAuth } from "@lib/services/auth";
import { http } from "@lib/services/http";
import { atomWithHash } from "@lib/utils/atomWithHash";

import { SearchInput } from "../../pages/market/components/SearchInput";

const mobileSearchOpenAtom = atomWithHash<boolean | typeof RESET>(
  "msearch",
  RESET,
  {
    setHash: "nextRouterReplace",
  }
);

export const MobileHeader = ({
  text,
  useFilterSearchAtomResult,
}: {
  text: string;
  useFilterSearchAtomResult: [
    string | undefined,
    (_: SetStateActionWithReset<string | undefined>) => void
  ];
}) => {
  const [searchOpen, setSearchOpen] = useAtom(mobileSearchOpenAtom);
  const [search, setSearch] = useFilterSearchAtomResult;

  return (
    <>
      {searchOpen !== RESET && (
        <MobileFullpageSearch
          useFilterSearchAtomResult={useFilterSearchAtomResult}
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

const MobileFullpageSearch = ({
  setSearchOpen,
  useFilterSearchAtomResult,
}: {
  setSearchOpen(val: SetStateAction<boolean | typeof RESET>): void;
  useFilterSearchAtomResult: [
    string | undefined,
    (_: SetStateActionWithReset<string | undefined>) => void
  ];
}) => {
  const [, setSearch] = useFilterSearchAtomResult;
  const { user } = useAuth();
  const { data, refetch } = useQuery<
    {
      [val: number]: string;
    }[]
  >({
    queryKey: ["/users/history"],
    queryFn: async () => {
      return (await http.get("/users/history")).data;
    },
    enabled: !!user,
  });
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
            <SearchInput autoFocus onSearch={() => setSearchOpen(RESET)} />
          </span>
        </div>
      </div>
      {data && (
        <div className="container overflow-y-auto pb-3 scrollbar-hide">
          <div className="flex justify-between py-3 text-sm text-gray-800">
            <span>최근 검색어</span>
            <span>전체 삭제</span>
          </div>
          <div className="ml-3">
            {data.map((history) => (
              <p
                key={Object.keys(history[0])[0]}
                className="flex items-center justify-between py-2"
              >
                <button
                  className="flex-1 text-left"
                  onClick={() => {
                    setSearchOpen(RESET);
                    setSearch(Object.values(history[0])[0]);
                  }}
                >
                  {Object.values(history[0])[0]}
                </button>
                <button
                  onClick={async () => {
                    await http.post.json("/users/history", {
                      id: Object.keys(history[0])[0],
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
