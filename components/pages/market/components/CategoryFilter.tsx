import { useAtom } from "jotai/react";
import React from "react";
import { filterCategoriesAtom, useFilterContext } from "../states/filter";
import { MultiSelect } from "./MultiSelect";

export const CategoryFilter = () => {
  const store = useFilterContext();
  const [filterCategory, setFilterCategory] = useAtom(filterCategoriesAtom, {
    store,
  });
  return MultiSelect({
    value: filterCategory,
    onChange: setFilterCategory,
    data: ["painting", "orient", "sculpture", "print", "craft", "other"],
  });
};
