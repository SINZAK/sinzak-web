import { CloseIcon } from "@lib/icons";
import { RESET } from "jotai/vanilla/utils";
import { SetStateAction, useEffect, useState } from "react";

type SetSearchStateAction = SetStateAction<string | undefined | typeof RESET>;

export const SearchInput = ({
  value,
  setValue,
}: {
  value: SetSearchStateAction;
  setValue: (val: SetSearchStateAction) => void;
}) => {
  const [search, setSearch] = useState("");
  const [filterSearch, setFilterSearch] = [value, setValue];

  useEffect(() => {
    if (!filterSearch) setSearch("");
  }, [filterSearch]);

  const reset = () => (setSearch(""), setFilterSearch(RESET));
  const isValid = search.length >= 2;

  return (
    <form
      className="relative"
      onSubmit={(e) => (
        e.preventDefault(), isValid ? setFilterSearch(search || RESET) : reset()
      )}
    >
      {(isValid || filterSearch) && (
        <button
          onClick={reset}
          type="button"
          className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-content-center rounded-full bg-red text-white"
        >
          <CloseIcon />
        </button>
      )}
      <input
        onKeyDown={(e) => {
          if (e.key === "Esc" || e.key === "Escape") reset();
        }}
        value={search}
        onChange={(e) =>
          e.target.value !== "" ? setSearch(e.target.value) : reset()
        }
        className="block w-full rounded-full bg-gray-100 px-5 py-3 placeholder-gray-800"
        placeholder={"의뢰 통합 검색"}
      />
    </form>
  );
};
