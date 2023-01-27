import { RESET } from "jotai/vanilla/utils";

import { atomWithHash } from "@lib/utils/atomWithHash";

export const isPreviewAtom = atomWithHash<boolean | typeof RESET>(
  "preview",
  RESET
);

export const postIdAtom = atomWithHash<number | typeof RESET>("postId", RESET);
export const roomIdAtom = atomWithHash<string | typeof RESET>("id", RESET);
