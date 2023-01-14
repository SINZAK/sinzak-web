import { Category } from "@lib/resources/category";
import { useAtomValue } from "jotai/react";
import { atom, createStore } from "jotai/vanilla";
import { useContext, createContext } from "react";

export type FilterAlign = "recommend" | "popular" | "recent" | "low" | "high";

export const filterOptions: { id: FilterAlign; name: string }[] = [
  { id: "recommend", name: "신작추천순" },
  { id: "popular", name: "인기순" },
  { id: "recent", name: "최신순" },
  { id: "low", name: "낮은가격순" },
  { id: "high", name: "높은가격순" },
];

export interface Filter {
  align: FilterAlign;
  categories: string[];
  sale: boolean;
}

export const filterAlignAtom = atom<FilterAlign>("recommend");
export const filterCategoriesAtom = atom<Category[]>([]);
export const filterSaleAtom = atom<boolean>(false);

export const filterAtom = atom<Filter>((get) => {
  const filter = {
    align: get(filterAlignAtom),
    categories: get(filterCategoriesAtom),
    sale: get(filterSaleAtom),
  };
  return filter;
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
