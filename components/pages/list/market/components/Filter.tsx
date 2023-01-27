import { useAtom } from "jotai/react";


import { CheckBox } from "@components/atoms/CheckBox";
import { AlignSelectFilter } from "@components/elements/filter/AlignSelectFilter";

import {
  filterAlignAtom,
  filterOptions,
  filterSaleAtom,
  useFilterContext,
} from "../states/filter";

export const Filter = () => {
  const store = useFilterContext();
  const [filterAlign, setFilterAlign] = useAtom(filterAlignAtom, { store });
  const [filterSale, setFilterSale] = useAtom(filterSaleAtom, { store });
  return (
    <span className="flex h-6 flex-1 items-center justify-between max-md:px-0.5">
      <span className="inline-flex items-center font-medium text-gray-800">
        <CheckBox
          checked={filterSale}
          onCheckedChange={(_) => setFilterSale(!!_)}
        >
          판매중 작품만 보기
        </CheckBox>
      </span>
      <AlignSelectFilter
        value={filterAlign}
        setValue={setFilterAlign}
        options={filterOptions}
      />
    </span>
  );
};
