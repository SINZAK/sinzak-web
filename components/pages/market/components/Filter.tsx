import { CheckBox } from "@components/atoms/CheckBox";
import { AlignSelectFilter } from "@components/elements/filter/AlignSelectFilter";
import {
  useFilterContext,
  filterAlignAtom,
  filterSaleAtom,
  filterOptions,
} from "@components/pages/market/states/filter";
import { useAtom } from "jotai/react";

export const Filter = () => {
  const store = useFilterContext();
  const [filterAlign, setFilterAlign] = useAtom(filterAlignAtom, { store });
  const [filterSale, setFilterSale] = useAtom(filterSaleAtom, { store });
  return (
    <>
      <span className="inline-flex items-center font-medium text-gray-800">
        <CheckBox
          checked={filterSale}
          onCheckedChange={(_) => setFilterSale(!!_)}
        >
          판매중 작품만 보기
        </CheckBox>
      </span>
      <AlignSelectFilter
        value={filterAlign}
        setValue={setFilterAlign}
        options={filterOptions}
      />
    </>
  );
};
