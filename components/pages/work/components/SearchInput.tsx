import { useAtom } from "jotai/react";
import { useFilterContext, filterSearchAtom } from "../states/filter";

import { SearchInput as Input } from "@components/elements/filter/SearchInput";

export const SearchInput = () => {
  const store = useFilterContext();
  const [search, setSearch] = useAtom(filterSearchAtom, {
    store,
  });
  return <Input value={search} setValue={setSearch} />;
};
