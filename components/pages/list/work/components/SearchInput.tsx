import { useAtom } from "jotai/react";

import { SearchInput as Input } from "@components/elements/filter/SearchInput";
import { UseAtomWithResetResult } from "@types";

import {
  AtomWithHashFilterSearchValue,
  filterSearchAtom,
} from "../../states/search";
import { useFilterContext } from "../states/filter";

interface SearchInputProps {
  onSearch?: UseAtomWithResetResult<AtomWithHashFilterSearchValue>[1];
  autoFocus?: boolean;
}

export const SearchInput = (props: SearchInputProps) => {
  const store = useFilterContext();
  const [search, setSearch] = useAtom(filterSearchAtom, {
    store,
  });
  return (
    <Input
      showToast={true}
      placeholder="의뢰 통합 검색"
      value={search}
      setValue={setSearch}
      {...props}
    />
  );
};
