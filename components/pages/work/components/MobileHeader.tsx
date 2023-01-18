import { useAtom } from "jotai/react";

import { MobileHeader as CommonMobileHeader } from "@components/elements/list/MobileHeader";

import { filterSearchAtom, useFilterContext } from "../states/filter";

export const MobileHeader = () => {
  const store = useFilterContext();
  const useFilterSearchAtomResult = useAtom(filterSearchAtom, {
    store,
  });
  return (
    <CommonMobileHeader
      text="의뢰"
      useFilterSearchAtomResult={useFilterSearchAtomResult}
    />
  );
};
