import { filterSearchAtom, useFilterContext } from "../states/filter";
import {
  SearchInput as Input,
  SetSearchStateAction,
} from "@components/elements/filter/SearchInput";
import { useAtom } from "jotai/react";

export const SearchInput = (props: {
  onSearch?: (val: SetSearchStateAction) => void;
  autoFocus?: boolean;
}) => {
  const store = useFilterContext();
  const [search, setSearch] = useAtom(filterSearchAtom, {
    store,
  });
  return <Input value={search} setValue={setSearch} {...props} />;
};
