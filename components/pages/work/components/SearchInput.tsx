import { useAtom } from "jotai/react";

import { SearchInput as Input } from "@components/elements/filter/SearchInput";

import { filterSearchAtom, useFilterContext } from "../states/filter";

export const SearchInput = () => {
  const store = useFilterContext();
  const [search, setSearch] = useAtom(filterSearchAtom, {
    store,
  });
  return <Input value={search} setValue={setSearch} />;
};
