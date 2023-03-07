import { createContext, useContext } from "react";
import { useAtomValue } from "jotai/react";
import { atom, createStore } from "jotai/vanilla";

import { Category } from "@lib/resources/category";
import { atomWithHash } from "@lib/utils/atomWithHash";
import removeEmptyField from "@lib/utils/removeEmptyField";

export type FilterAlign = "recommend" | "recent";

export const filterOptions: { id: FilterAlign; name: string }[] = [
  { id: "recommend", name: "신작추천순" },
  { id: "recent", name: "최신순" },
];

export interface Filter {
  type: "market" | "work";
  sale: boolean;
}

// atom

export const filterTypeAtom = atomWithHash<Filter["type"]>("type", "market", {
  setHash: "nextRouterReplace",
});
export const filterSaleAtom = atomWithHash<Filter["sale"]>("sale", false, {
  setHash: "nextRouterReplace",
});

export const filterAtom = atom<Filter>((get) => {
  const filter = {
    type: get(filterTypeAtom),
    sale: get(filterSaleAtom),
  };
  return removeEmptyField(filter);
});

// store, context

export const useFilter = () => useAtomValue(filterAtom, { store: filterStore });

export const filterStore = createStore();

const FilterContext = createContext(filterStore);
export const useFilterContext = () => useContext(FilterContext);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <FilterContext.Provider value={filterStore}>
      {children}
    </FilterContext.Provider>
  );
};
