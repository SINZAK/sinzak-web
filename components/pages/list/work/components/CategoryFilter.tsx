import { useAtom } from "jotai/react";

import { MultiSelect } from "@components/elements/filter/MultiSelect";

import { filterCategoriesAtom, useFilterContext } from "../states/filter";

export const CategoryFilter = () => {
  const store = useFilterContext();
  const [filterCategory, setFilterCategory] = useAtom(filterCategoriesAtom, {
    store,
  });
  return MultiSelect({
    value: filterCategory,
    onChange: setFilterCategory,
    data: [
      "portrait",
      "illustration",
      "logo",
      "poster",
      "design",
      "editorial",
      "label",
    ],
  });
};
