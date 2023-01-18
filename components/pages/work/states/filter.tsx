import { useAtomValue } from "jotai/react";
import { atom, createStore } from "jotai/vanilla";
import { createContext, useContext } from "react";

import { Category } from "@lib/resources/category";
import { atomWithHash } from "@lib/utils/atomWithHash";
import removeEmptyField from "@lib/utils/removeEmptyField";

export type FilterAlign = "recommend" | "recent";

export const filterOptions: { id: FilterAlign; name: string }[] = [
  { id: "recommend", name: "신작추천순" },
  { id: "recent", name: "최신순" },
];

export interface Filter {
  search: string | undefined;
  align: FilterAlign;
  categories: Category[];
  employment: boolean;
}

export const filterSearchAtom = atomWithHash<Filter["search"]>(
  "search",
  undefined
);
export const filterAlignAtom = atomWithHash<Filter["align"]>(
  "align",
  "recommend",
  {
    setHash: "nextRouterReplace",
  }
);
export const filterCategoriesAtom = atomWithHash<Filter["categories"]>(
  "categories",
  [],
  {
    setHash: "nextRouterReplace",
  }
);
export const filterEmploymentAtom = atomWithHash<Filter["employment"]>(
  "employment",
  true,
  {
    setHash: "nextRouterReplace",
  }
);

export const filterAtom = atom<Filter>((get) => {
  const filter = {
    search: get(filterSearchAtom),
    align: get(filterAlignAtom),
    categories: get(filterCategoriesAtom),
    employment: get(filterEmploymentAtom),
  };
  return removeEmptyField(filter);
});

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
