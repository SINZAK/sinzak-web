import { useAtomValue } from "jotai/react";
import { atom, createStore } from "jotai/vanilla";
import { createContext, useContext } from "react";

import { Category } from "@lib/resources/category";
import { atomWithHash } from "@lib/utils/atomWithHash";
import removeEmptyField from "@lib/utils/removeEmptyField";

import {
  AtomWithHashFilterSearchValue,
  filterSearchAtom,
} from "../../states/search";

export type FilterAlign = "recommend" | "popular" | "recent" | "low" | "high";

export const filterOptions: { id: FilterAlign; name: string }[] = [
  { id: "recommend", name: "신작추천순" },
  { id: "popular", name: "인기순" },
  { id: "recent", name: "최신순" },
  { id: "low", name: "낮은가격순" },
  { id: "high", name: "높은가격순" },
];

export interface Filter {
  search: AtomWithHashFilterSearchValue;
  align: FilterAlign;
  categories: Category[];
  sale: boolean;
}

// atom

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
export const filterSaleAtom = atomWithHash<Filter["sale"]>("sale", false, {
  setHash: "nextRouterReplace",
});

export const filterAtom = atom<Filter>((get) => {
  const filter = {
    search: get(filterSearchAtom),
    align: get(filterAlignAtom),
    categories: get(filterCategoriesAtom),
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
