import { AtomValueWithReset } from "@types";
import { RESET } from "jotai/vanilla/utils";

import { atomWithHash } from "@lib/utils/atomWithHash";

export type AtomWithHashFilterSearchValue = string | undefined;

export const filterSearchAtom = atomWithHash<AtomWithHashFilterSearchValue>(
  "search",
  undefined
);

export type AtomWithHashMobileSearchOpenValue = AtomValueWithReset<boolean>;
export const mobileSearchOpenAtom =
  atomWithHash<AtomWithHashMobileSearchOpenValue>("msearch", RESET, {
    setHash: "nextRouterReplace",
  });
