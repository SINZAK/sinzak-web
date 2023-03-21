import { ComponentProps } from "react";
import { useAtom } from "jotai/react";

import { Button } from "@components/atoms/Button";
import { MultiSelect } from "@components/elements/filter/MultiSelect";

import { filterCategoriesAtom, useFilterContext } from "../states/filter";

export const CategoryFilter = (
  size?: ComponentProps<typeof Button>["size"]
) => {
  const store = useFilterContext();
  const [filterCategory, setFilterCategory] = useAtom(filterCategoriesAtom, {
    store,
  });
  return MultiSelect({
    size,
    value: filterCategory,
    onChange: setFilterCategory,
    data: ["painting", "orient", "sculpture", "print", "craft", "other"],
  });
};
