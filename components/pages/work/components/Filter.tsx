import { AlignSelectFilter } from "@components/elements/filter/AlignSelectFilter";
import {
  useFilterContext,
  filterAlignAtom,
  filterOptions,
  filterEmploymentAtom,
} from "@components/pages/work/states/filter";
import { useAtom } from "jotai/react";
import { twMerge } from "tailwind-merge";

export const Filter = () => {
  const store = useFilterContext();
  const [filterAlign, setFilterAlign] = useAtom(filterAlignAtom, { store });
  const [filterEmployment, setFilterEmployment] = useAtom(
    filterEmploymentAtom,
    { store }
  );

  return (
    <span className="flex items-center justify-between flex-1 h-6 max-md:px-0.5">
      <span className="space-x-4 text-base font-bold text-gray-800 md:text-xl">
        <button
          onClick={() => setFilterEmployment(true)}
          className={twMerge("relative", filterEmployment && "text-black")}
        >
          의뢰해요
          {filterEmployment && (
            <span className="absolute bottom-0 left-0 inline-block w-full translate-y-0.5 bg-black border-b-2 border-black" />
          )}
        </button>
        <button
          onClick={() => setFilterEmployment(false)}
          className={twMerge("relative", !filterEmployment && "text-black")}
        >
          작업해요
          {!filterEmployment && (
            <span className="absolute bottom-0 left-0 inline-block w-full translate-y-0.5 bg-black border-b-2 border-black" />
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
