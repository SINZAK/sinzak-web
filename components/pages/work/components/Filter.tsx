import { AlignSelectFilter } from "@components/elements/filter/AlignSelectFilter";
import {
  useFilterContext,
  filterAlignAtom,
  filterOptions,
} from "@components/pages/work/states/filter";
import { useAtom } from "jotai/react";

export const Filter = () => {
  const store = useFilterContext();
  const [filterAlign, setFilterAlign] = useAtom(filterAlignAtom, { store });
  return (
    <>
      <AlignSelectFilter
        value={filterAlign}
        setValue={setFilterAlign}
        options={filterOptions}
      />
    </>
  );
};
