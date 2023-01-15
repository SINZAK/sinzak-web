import { useAtom } from "jotai/react";
import { filterCategoriesAtom, useFilterContext } from "../states/filter";
import { MultiSelect } from "@components/elements/filter/MultiSelect";

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
