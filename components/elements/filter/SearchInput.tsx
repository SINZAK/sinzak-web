import { useEffect, useState } from "react";
import { RESET } from "jotai/vanilla/utils";
import { toast } from "sonner";

import { AtomWithHashFilterSearchValue } from "@components/pages/list/states/search";
import { CloseIcon } from "@lib/icons";
import { UseAtomWithResetResult } from "@types";

interface SearchInputProps {
  value: UseAtomWithResetResult<AtomWithHashFilterSearchValue>[0];
  setValue: UseAtomWithResetResult<AtomWithHashFilterSearchValue>[1];
  onSearch?: UseAtomWithResetResult<AtomWithHashFilterSearchValue>[1];
  autoFocus?: boolean;
  placeholder?: string;
  showToast?: boolean;
}

export const SearchInput = ({
  value,
  setValue,
  onSearch: externalOnSearch,
  autoFocus,
  placeholder,
  showToast,
}: SearchInputProps) => {
  const [search, setSearch] = useState("");
  const [filterSearch, setFilterSearch] = [value, setValue];

  useEffect(() => {
    if (!filterSearch) setSearch("");
  }, [filterSearch]);

  const reset = () => (setSearch(""), setFilterSearch(RESET));
  const onSearch: SearchInputProps["setValue"] = (val) => {
    externalOnSearch && externalOnSearch(val);
    setFilterSearch(val);
  };
  const isValid = search.length >= 2;

  return (
    <form
      className="relative max-md:h-full"
      onSubmit={(e) => (
        e.preventDefault(),
        isValid
          ? onSearch(search || RESET)
          : showToast && toast("검색어를 두 글자 이상 입력해주세요.")
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
        onChange={(e) => setSearch(e.target.value)}
        className="block w-full rounded-full bg-gray-100 placeholder-gray-800 max-md:h-full max-md:px-4 md:px-5 md:py-3"
        placeholder={placeholder}
      />
    </form>
  );
};
