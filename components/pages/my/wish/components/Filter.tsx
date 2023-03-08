import { useAtom } from "jotai/react";
import { twMerge } from "tailwind-merge";

import { CheckBox } from "@components/atoms/CheckBox";

import {
  filterSaleAtom,
  filterTypeAtom,
  useFilterContext,
} from "../states/filter";

export const Filter = () => {
  const store = useFilterContext();
  const [filterType, setFilterType] = useAtom(filterTypeAtom, {
    store,
  });
  const [filterSale, setFilterSale] = useAtom(filterSaleAtom, { store });

  return (
    <span className="mt-3 flex h-6 flex-1 items-center justify-between max-md:px-0.5">
      <span className="space-x-4 text-base font-bold text-gray-800 md:text-xl">
        <button
          onClick={() => setFilterType("market")}
          className={twMerge(
            "relative",
            filterType === "market" && "text-black"
          )}
        >
          마켓
          {filterType === "market" && (
            <span className="absolute bottom-0 left-0 inline-block w-full translate-y-0.5 border-b-2 border-black bg-black" />
          )}
        </button>
        <button
          onClick={() => setFilterType("work")}
          className={twMerge("relative", filterType === "work" && "text-black")}
        >
          의뢰
          {filterType === "work" && (
            <span className="absolute bottom-0 left-0 inline-block w-full translate-y-0.5 border-b-2 border-black bg-black" />
          )}
        </button>
      </span>
      <span className="inline-flex items-center font-medium text-gray-800">
        <CheckBox checked={filterSale} onChange={(_) => setFilterSale(!!_)}>
          판매중 작품만 보기
        </CheckBox>
      </span>
    </span>
  );
};
