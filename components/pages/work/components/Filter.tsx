import {
  useFilterContext,
  filterAlignAtom,
  filterOptions,
  FilterAlign,
} from "@components/pages/work/states/filter";
import { Listbox } from "@headlessui/react";
import { AlignIcon } from "@lib/icons";
import { useAtom } from "jotai/react";

export const Filter = () => {
  const store = useFilterContext();
  const [filterAlign, setFilterAlign] = useAtom(filterAlignAtom, { store });
  return (
    <>
      <Listbox
        value={filterOptions.find((_) => _.id === filterAlign)}
        onChange={(_) => setFilterAlign(_.id as FilterAlign)}
      >
        {({ open }) => (
          <>
            {open && (
              <div className="fixed top-0 left-0 z-50 w-full h-full bg-black opacity-50 md:hidden" />
            )}
            <div className="relative font-medium text-gray-800">
              <Listbox.Button className="relative block">
                {({ value }) => (
                  <span className="flex items-center">
                    <AlignIcon />
                    <span className="ml-1">{value.name}</span>
                  </span>
                )}
              </Listbox.Button>
              <Listbox.Options className="z-50">
                <div className="z-50 fixed max-w-lg text-lg md:text-base max-md:bottom-0 max-md:w-full md:absolute mt-2 right-0 max-md:right-1/2 max-md:translate-x-1/2 px-4 py-4 md:py-2 ring-gray-100 ring-1 min-w-[8rem] rounded-t-3xl md:rounded-xl bg-white max-md:divide-y md:space-y-2 shadow-md cursor-pointer">
                  {filterOptions.map((option) => (
                    <Listbox.Option
                      className="hover:text-black max-md:py-2"
                      key={option.id}
                      value={option}
                    >
                      {option.name}
                    </Listbox.Option>
                  ))}
                </div>
              </Listbox.Options>
            </div>
          </>
        )}
      </Listbox>
    </>
  );
};
