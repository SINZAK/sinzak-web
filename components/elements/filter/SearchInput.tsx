import { RESET } from "jotai/vanilla/utils";
import { SetStateAction, useEffect, useState } from "react";

import { CloseIcon } from "@lib/icons";

export type SetSearchStateAction = SetStateAction<
  string | undefined | typeof RESET
>;

export const SearchInput = ({
  value,
  setValue,
  onSearch: externalOnSearch,
  autoFocus,
}: {
  value: SetSearchStateAction;
  setValue: (val: SetSearchStateAction) => void;
  onSearch?: (val: SetSearchStateAction) => void;
  autoFocus?: boolean;
}) => {
  const [search, setSearch] = useState("");
  const [filterSearch, setFilterSearch] = [value, setValue];

  useEffect(() => {
    if (!filterSearch) setSearch("");
  }, [filterSearch]);

  const reset = () => (setSearch(""), setFilterSearch(RESET));
  const onSearch = (val: SetSearchStateAction) => {
    externalOnSearch && externalOnSearch(val);
    setFilterSearch(val);
  };
  const isValid = search.length >= 2;

  return (
    <form
      className="relative max-md:h-full"
      onSubmit={(e) => (
        e.preventDefault(), isValid ? onSearch(search || RESET) : reset()
      )}
    >
      {(isValid || filterSearch) && (
        <button
          onClick={reset}
          type="button"
          className="absolute top-1/2 grid h-6 w-6 -translate-y-1/2 place-content-center rounded-full bg-red text-white max-md:right-2 md:right-3"
        >
          <CloseIcon />
        </button>
      )}
      <input
        autoFocus={autoFocus}
        onKeyDown={(e) => {
          if (e.key === "Esc" || e.key === "Escape") reset();
        }}
        value={search}
        onChange={(e) =>
          e.target.value !== "" ? setSearch(e.target.value) : reset()
        }
        className="block w-full rounded-full bg-gray-100 placeholder-gray-800 max-md:h-full max-md:px-4 md:px-5 md:py-3"
        placeholder={"의뢰 통합 검색"}
      />
    </form>
  );
};
