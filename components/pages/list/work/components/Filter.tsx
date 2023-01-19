import { useAtom } from "jotai/react";
import { twMerge } from "tailwind-merge";

import { AlignSelectFilter } from "@components/elements/filter/AlignSelectFilter";

import {
  filterAlignAtom,
  filterEmploymentAtom,
  filterOptions,
  useFilterContext,
} from "../states/filter";

export const Filter = () => {
  const store = useFilterContext();
  const [filterAlign, setFilterAlign] = useAtom(filterAlignAtom, { store });
  const [filterEmployment, setFilterEmployment] = useAtom(
    filterEmploymentAtom,
    { store }
  );

  return (
    <span className="flex h-6 flex-1 items-center justify-between max-md:px-0.5">
      <span className="space-x-4 text-base font-bold text-gray-800 md:text-xl">
        <button
          onClick={() => setFilterEmployment(true)}
          className={twMerge("relative", filterEmployment && "text-black")}
        >
          의뢰해요
          {filterEmployment && (
            <span className="absolute bottom-0 left-0 inline-block w-full translate-y-0.5 border-b-2 border-black bg-black" />
          )}
        </button>
        <button
          onClick={() => setFilterEmployment(false)}
          className={twMerge("relative", !filterEmployment && "text-black")}
        >
          작업해요
          {!filterEmployment && (
            <span className="absolute bottom-0 left-0 inline-block w-full translate-y-0.5 border-b-2 border-black bg-black" />
          )}
        </button>
      </span>
      <AlignSelectFilter
        value={filterAlign}
        setValue={setFilterAlign}
        options={filterOptions}
      />
    </span>
  );
};
