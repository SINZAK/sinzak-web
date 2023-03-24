import { useAtom } from "jotai/react";

import { CheckBox } from "@components/atoms/CheckBox";

import { filterSaleAtom, useFilterContext } from "../states/filter";

export const Filter = () => {
  const store = useFilterContext();
  const [filterSale, setFilterSale] = useAtom(filterSaleAtom, { store });

  return (
    <span className="flex h-6 flex-1 items-center justify-between max-md:px-0.5">
      <span className="flex-1" />
      <span className="inline-flex items-center font-medium text-gray-800">
        <CheckBox checked={filterSale} onChange={(_) => setFilterSale(!!_)}>
          판매중 작품만 보기
        </CheckBox>
      </span>
    </span>
  );
};
