import { useAtom } from "jotai/react";

import { MobileHeader as CommonMobileHeader } from "../../components/MobileHeader";
import { filterSearchAtom } from "../../states/search";
import { useFilterContext } from "../states/filter";

export const MobileHeader = () => {
  const store = useFilterContext();
  const [search, setSearch] = useAtom(filterSearchAtom, {
    store,
  });
  return (
    <CommonMobileHeader text="의뢰" search={search} setSearch={setSearch} />
  );
};
